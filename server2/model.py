import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.preprocessing import StandardScaler

def preprocess_esg_data(esg_data):
    # Select only numeric columns for the preprocessing
    numeric_cols = ['environment_score', 'social_score', 'governance_score', 'total_score']
    
    # Fill NaN values with the mean for numeric columns
    esg_data[numeric_cols] = esg_data[numeric_cols].fillna(esg_data[numeric_cols].mean())
    
    return esg_data

def preprocess_sentiment_data(news_data):
    # Preprocessing News sentiment data
    sentiment_scores = {}
    for company, data in news_data.items():
        if 'feed' in data:
            sentiments = [article['overall_sentiment_score'] for article in data['feed']]
            sentiment_scores[company] = np.mean(sentiments) if sentiments else 0
        else:
            sentiment_scores[company] = 0
    return pd.DataFrame(list(sentiment_scores.items()), columns=['Company', 'SentimentScore'])

def preprocess_time_series_data(company_data):
    # Preprocessing Time Series data
    price_data = {}
    for company, data in company_data.items():
        prices = [float(value['4. close']) for date, value in data['Time Series (Daily)'].items()]
        price_data[company] = np.mean(prices) if prices else 0
    return pd.DataFrame(list(price_data.items()), columns=['Company', 'AveragePrice'])

def feature_engineering(esg_data, sentiment_data, price_data):
    # Rename the 'ticker' column in esg_data to 'Company' and convert to uppercase
    esg_data = esg_data.rename(columns={'ticker': 'Company'})
    esg_data['Company'] = esg_data['Company'].str.upper()
    
    # Convert the 'Company' columns in sentiment_data and price_data to uppercase
    sentiment_data['Company'] = sentiment_data['Company'].str.upper()
    price_data['Company'] = price_data['Company'].str.upper()
    
    # Merging datasets
    merged_data = esg_data.merge(sentiment_data, on='Company').merge(price_data, on='Company')
    return merged_data

def train_model(data):
    # Drop non-numeric columns
    X = data.drop(columns=['Company', 'RecommendationScore', 'name', 'currency', 'exchange', 'industry', 'logo', 'weburl', 'environment_grade', 'environment_level', 'social_grade', 'social_level', 'governance_grade', 'governance_level', 'last_processing_date', 'total_grade', 'total_level'])
    y = data['RecommendationScore']
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    scaler = StandardScaler()
    X_train = scaler.fit_transform(X_train)
    X_test = scaler.transform(X_test)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    return model, scaler

def predict_investments(model, scaler, data):
    # Drop non-numeric columns
    X = data.drop(columns=['Company', 'RecommendationScore', 'name', 'currency', 'exchange', 'industry', 'logo', 'weburl', 'environment_grade', 'environment_level', 'social_grade', 'social_level', 'governance_grade', 'governance_level', 'last_processing_date', 'total_grade', 'total_level'])
    X = scaler.transform(X)
    predictions = model.predict(X)
    
    data['RecommendationScore'] = predictions
    return data.sort_values(by='RecommendationScore', ascending=False)
