import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

# Function to prepare the data
def prepare_data(company_data, news_data):
    df_list = []
    for symbol, data in company_data.items():
        df = pd.DataFrame.from_dict(data['Time Series (Daily)'], orient='index')
        df = df[['4. close', '5. volume']].astype(float)
        df['symbol'] = symbol
        df_list.append(df)
    
    stock_data = pd.concat(df_list)
    stock_data.index = pd.to_datetime(stock_data.index)
    stock_data.sort_index(inplace=True)
    
    # Feature Engineering: Adding moving averages and daily returns
    stock_data['ma_5'] = stock_data.groupby('symbol')['4. close'].transform(lambda x: x.rolling(window=5).mean())
    stock_data['ma_10'] = stock_data.groupby('symbol')['4. close'].transform(lambda x: x.rolling(window=10).mean())
    stock_data['return'] = stock_data.groupby('symbol')['4. close'].transform(lambda x: x.pct_change())
    
    # Adding sentiment scores from news data
    for symbol, data in news_data.items():
        sentiment_scores = [news['sentiment_score'] for news in data['news']]
        stock_data.loc[stock_data['symbol'] == symbol, 'sentiment_score'] = np.mean(sentiment_scores)
    
    stock_data.dropna(inplace=True)
    
    return stock_data

# Function to train the model
def train_model(stock_data):
    X = stock_data[['4. close', '5. volume', 'ma_5', 'ma_10', 'return', 'sentiment_score']]
    y = stock_data['4. close'].shift(-1).dropna()
    X = X.iloc[:-1]
    
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    
    return model, mse

# Function to make recommendations
def make_recommendations(model, stock_data):
    X = stock_data[['4. close', '5. volume', 'ma_5', 'ma_10', 'return', 'sentiment_score']]
    predictions = model.predict(X)
    
    stock_data['prediction'] = predictions
    recommendations = stock_data.groupby('symbol')['prediction'].last().sort_values(ascending=False).head(10)
    
    return recommendations.index.tolist()

# Example usage
if __name__ == "__main__":
    # Load your data from the JSON file
    import json
    with open('/mnt/data/twocombinedresp.json', 'r') as f:
        data = json.load(f)
    
    company_data = data['company_data']
    news_data = data['news_data']
    
    stock_data = prepare_data(company_data, news_data)
    model, mse = train_model(stock_data)
    recommendations = make_recommendations(model, stock_data)
    
    print("Mean Squared Error:", mse)
    print("Top Recommendations:", recommendations)