import os
import json
import requests
import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from model import preprocess_esg_data, preprocess_sentiment_data, preprocess_time_series_data, feature_engineering, train_model, predict_investments

app = Flask(__name__)
CORS(app)

alphaVantageKey = os.getenv("ALPHA_VANTAGE_KEY")
esg_data = pd.read_csv('./dataset/esg_data.csv')

interestStocks = []
ownedStocks = {}

stocks_history_data = {}
news_data = {}

# ROOT URL
@app.route('/')
def home():
    return "Welcome to the Flask server!"

# POST req to UPDATE user current holdings
@app.route('/api/data/userholdings', methods=['POST'])
def update_user_holdings():
    global ownedStocks
    ownedStocks = {}  # Reset to null before adding new data
    data = request.json
    if 'stocks' in data:
        ownedStocks = {stock['ticker']: stock['volume'] for stock in data['stocks']}
        return jsonify({"message": "User holdings updated successfully!", "OwnedStocks": ownedStocks}), 200
    else:
        return jsonify({"error": "No stocks data provided"}), 400

# Get Metrics by POST of interested stocks
@app.route('/api/getmetrics', methods=['POST'])
def api_home():
    global interestStocks, stocks_history_data, news_data
    interestStocks = []  # Reset to null before adding new data
    stocks_history_data = {}  # Reset to null before adding new data
    news_data = {}  # Reset to null before adding new data

    data = request.json
    if 'stocks' in data:
        interestStocks = data['stocks']
    else:
        return jsonify({"error": "No stocks data provided"}), 400

    for company in interestStocks:
        # Fetch Time Series Daily
        timeSeriesUrl = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={company}&outputsize=full&apikey={alphaVantageKey}"
        r1 = requests.get(timeSeriesUrl)
        stocks_history_data[company] = r1.json()

        # Fetch News and Sentiments
        newsUrl = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={company}&time_from=20210101T0000&apikey={alphaVantageKey}"
        r2 = requests.get(newsUrl)
        news_data[company] = r2.json()

    # Save company_data to a JSON file
    with open('company_data.json', 'w') as stocks_history_file:
        json.dump(stocks_history_data, stocks_history_file)

    # Save news_data to a JSON file
    with open('news_data.json', 'w') as news_file:
        json.dump(news_data, news_file)

    # return jsonify({"stocks_history_data": stocks_history_data, "news_data": news_data})
    return jsonify({"message": "Time Series and News saved! You can predict now!"}), 200

# Predict investments recommendations
@app.route('/api/predict', methods=['GET'])
def predict_recommendations():
    global esg_data, news_data, stocks_history_data, ownedStocks
    
    esg_data = preprocess_esg_data(esg_data)
    sentiment_data = preprocess_sentiment_data(news_data)
    price_data = preprocess_time_series_data(stocks_history_data)
    
    merged_data = feature_engineering(esg_data, sentiment_data, price_data)
    
    if 'RecommendationScore' not in merged_data.columns:
        merged_data['RecommendationScore'] = np.random.rand(len(merged_data))
    
    model, scaler = train_model(merged_data)
    
    recommendations = predict_investments(model, scaler, merged_data)
    
    # Adjust recommendations based on user holdings
    for index, row in recommendations.iterrows():
        ticker = row['Company']
        if ticker in ownedStocks:
            volume = ownedStocks[ticker]
            recommendations.at[index, 'RecommendationScore'] -= volume * 0.005  # Adjust the factor as needed

    top_recommendations = recommendations.head(10)
    
    return jsonify(top_recommendations.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
