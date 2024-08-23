from sklearn.datasets import fetch_california_housing
from sklearn.linear_model import LinearRegression  
from sklearn.preprocessing import MinMaxScaler
import numpy as np

def train_model():
    housing = fetch_california_housing()
    X = housing.data
    Y = housing.target
    
    scaler = MinMaxScaler()
    X_scaled = scaler.fit_transform(X)
    model = LinearRegression()
    model.fit(X_scaled, Y)
    
    return model, scaler

def predict_price(model, scaler, data):
    features = scaler.transform([data])
    print(f"Scaled features: {features}")  # Debugging statement
    prediction = model.predict(features)
    print(f"Raw prediction: {prediction}")  # Debugging statement
    prediction = max(0, prediction[0])
    print(f"Processed prediction: {prediction}")  # Debugging statement
    return prediction