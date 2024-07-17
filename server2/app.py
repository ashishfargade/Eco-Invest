import os
import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

alphaVantageKey = os.getenv("ALPHA_VANTAGE_KEY")

company_data = {}
news_data = {}

# ROOT URL
@app.route('/')
def home():
    return "Welcome to the Flask server!"


# GET REQ
@app.route('/api', methods=['GET'])
def api_home():
    
    user_companies = request.args.get('companies', 'INTC,NVDA').split(',')

    for company in user_companies:
        # Fetch Time Series Daily
        timeSeriesUrl = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={company}&outputsize=full&apikey={alphaVantageKey}"
        r1 = requests.get(timeSeriesUrl)
        company_data[company] = r1.json()

        # Fetch News and Sentiments
        newsUrl = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={company}&time_from=20210101T0000&apikey={alphaVantageKey}"
        r2 = requests.get(newsUrl)
        news_data[company] = r2.json()

    return jsonify({"company_data": company_data, "news_data": news_data})


# POST REQ
@app.route('/api/data', methods=['POST'])
def api_data():
    data = request.get_json()
    response = {
        "received_data": data,
        "message": "Data received successfully!"
    }
    return jsonify(response)


# ML prediction endpoint
@app.route('/api/predict', methods=['POST'])
def api_predict():
    data = request.get_json()
    user_companies = data.get('companies', ['IBM', 'APPL', 'INTC', 'NVDA', 'AMD'])
    # You should implement the ML prediction logic here
    # For demonstration purposes, we will just return the companies received
    response = {
        "predicted_companies": user_companies,
        "message": "Prediction successful!"
    }
    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)