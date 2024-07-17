import os
import requests
from flask import Flask, jsonify, request

app = Flask(__name__)

alphaVantageKey = os.getenv("ALPHA_VANTAGE_KEY")

interestStocks = []
ownedStocks = []

company_data = {}
news_data = {}

# ROOT URL
@app.route('/')
def home():
    return "Welcome to the Flask server!"

# POST req to UPDATE user interest stocks
@app.route('/api/data/userinterests', methods=['POST'])
def get_user_interest():
    global interestStocks
    data = request.json
    if 'stocks' in data:
        interestStocks = data['stocks']
        return jsonify({"message": "User interests updated successfully!", "interestStocks": interestStocks}), 200
    else:
        return jsonify({"error": "No stocks data provided"}), 400

# POST req to UPDATE user current holdings
@app.route('/api/data/userholdings', methods=['POST'])  # Fix: Change 'method' to 'methods'
def update_user_holdings():
    global ownedStocks
    data = request.json
    if 'stocks' in data:
        ownedStocks = data['stocks']
        return jsonify({"message": "User holdings updated successfully!", "OwnedStocks": ownedStocks}), 200
    else:
        return jsonify({"error": "No stocks data provided"}), 400


# GET REQ
@app.route('/api/getmetrics', methods=['GET'])
def api_home():
    if not interestStocks:
        return jsonify({"message": "Please call the interest POST API first."}), 400

    for company in interestStocks:
        # Fetch Time Series Daily
        timeSeriesUrl = f"https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol={company}&outputsize=full&apikey={alphaVantageKey}"
        r1 = requests.get(timeSeriesUrl)
        company_data[company] = r1.json()

        # Fetch News and Sentiments
        newsUrl = f"https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers={company}&time_from=20210101T0000&apikey={alphaVantageKey}"
        r2 = requests.get(newsUrl)
        news_data[company] = r2.json()

    return jsonify({"company_data": company_data, "news_data": news_data})



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