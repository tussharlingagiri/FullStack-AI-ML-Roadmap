from flask import Flask, request, jsonify, render_template
from model import train_model, predict_price
import numpy as np

app = Flask(__name__)

# Train the model and scaler
model, scaler = train_model()

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = [float(request.form['MedInc']),
            float(request.form['HouseAge']),
            float(request.form['AveRooms']),
            float(request.form['AveBedrms']),
            float(request.form['Population']),
            float(request.form['AveOccup']),
            float(request.form['Latitude']),
            float(request.form['Longitude'])]
    
    print(f"Input data: {data}")  # Debugging statement
    
    # Convert to numpy array and reshape for scaler
    final_data = np.array(data).reshape(1, -1)
    print(f"Final data (numpy array): {final_data}")  # Debugging statement
    
    # Scale the data
    scaled_data = scaler.transform(final_data)
    print(f"Scaled data: {scaled_data}")  # Debugging statement
    
    # Check for unrealistic scaled values
    if np.any(scaled_data < 0) or np.any(scaled_data > 1):
        print("Warning: Scaled data contains values outside the expected range [0, 1].")
    
    # Make prediction
    prediction = model.predict(scaled_data)[0]
    print(f"Raw Prediction: {prediction}")  # Debugging statement
    
    # Ensure non-negative prediction
    prediction = max(0, prediction)
    print(f"Processed Prediction: {prediction}")  # Debugging statement
    
    return render_template('home.html', prediction_text=f'Predicted Price : {prediction:.2f}')

@app.route('/api/predict_api', methods=['POST'])
def api_predict():
    data = request.get_json(force=True)
    print(f"API Input data: {data}")  # Debugging statement
    
    # Convert to numpy array and reshape for scaler
    final_data = np.array(data['features']).reshape(1, -1)
    print(f"API Final data (numpy array): {final_data}")  # Debugging statement
    
    # Scale the data
    scaled_data = scaler.transform(final_data)
    print(f"API Scaled data: {scaled_data}")  # Debugging statement
    
    # Check for unrealistic scaled values
    if np.any(scaled_data < 0) or np.any(scaled_data > 1):
        print("Warning: Scaled data contains values outside the expected range [0, 1].")
    
    # Make prediction
    prediction = model.predict(scaled_data)[0]
    print(f"API Raw Prediction: {prediction}")  # Debugging statement
    
    # Ensure non-negative prediction
    prediction = max(0, prediction)
    print(f"API Processed Prediction: {prediction}")  # Debugging statement
    
    return jsonify({'prediction': prediction})

if __name__ == '__main__':
    app.run(debug=True)