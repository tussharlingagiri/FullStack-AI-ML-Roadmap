from flask import Flask, render_template, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import io
import base64

app = Flask(__name__)
model = load_model('models/digit_classfier.keras')

@app.route('/')
def index():
    return render_template('Home.html')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if 'img_data' not in data:
        return jsonify({'error': 'No img_data key in request'}), 400

    img_data = data['img_data']

    # Debugging: Print the received img_data
    print("Received img_data:", img_data)  

    if ',' in img_data:
        img_data = img_data.split(',')[1]  # Remove the data URL scheme part of the string
    else:
        return jsonify({'error': 'Invalid img_data format'}), 400

    try:
        img = Image.open(io.BytesIO(base64.b64decode(img_data))).convert('L')
    except Exception as e:
        print(f"Error decoding image: {e}")
        return jsonify({'error': 'Error decoding image'}), 400

    img = img.resize((28, 28))
    img = np.array(img)

    # Normalize the image data
    img = img / 255.0

    img = img.reshape(1, 28, 28, 1) # Reshape the image array to match the input shape of the model

    # Check if the image array is all zeros
    if np.all((img == 0)):
        print("Error: The input image array is all zeros.")  
        return jsonify({'error': 'The input image array is all zeros.'}), 400  

    prediction = model.predict(img)
    digit = np.argmax(prediction[0])

    # Debugging: Print the prediction results
    print("Prediction Results:", prediction)
    print("Predicted Digit:", digit)

    return jsonify({'digit': int(digit)})
   
   

if __name__ == '__main__':
    app.run(debug=True)