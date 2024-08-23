import unittest
from app import app, model, scaler
import numpy as np

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_home_status_code(self):
        """Test that the home page loads correctly."""
        result = self.app.get('/')
        self.assertEqual(result.status_code, 200)

    def test_predict_status_code(self):
        """Test that the predict endpoint returns a status code 200."""
        result = self.app.post('/predict', data={
            'MedInc': 4.0,
            'HouseAge': 4.0,
            'AveRooms': 3.0,
            'AveBedrms': 3.0,
            'Population': 300000.0,
            'AveOccup': 295000.0,
            'Latitude': 3.0,
            'Longitude': 3.0
        })
        self.assertEqual(result.status_code, 200)

    def test_predict_content(self):
        """Test that the predict endpoint returns a non-negative prediction."""
        result = self.app.post('/predict', data={
            'MedInc': 4.0,
            'HouseAge': 4.0,
            'AveRooms': 3.0,
            'AveBedrms': 3.0,
            'Population': 300000.0,
            'AveOccup': 295000.0,
            'Latitude': 3.0,
            'Longitude': 3.0
        })
        self.assertIn(b'Predicted Price :', result.data)
        self.assertNotIn(b'Predicted Price : -', result.data)

    def test_model_prediction(self):
        """Test that the model returns a non-negative prediction for given input."""
        data = [4.0, 4.0, 3.0, 3.0, 300000.0, 295000.0, 3.0, 3.0]
        final_data = np.array(data).reshape(1, -1)
        print(f"Test Input data: {data}")  # Debugging statement
        print(f"Test Final data (numpy array): {final_data}")  # Debugging statement
        
        scaled_data = scaler.transform(final_data)
        print(f"Test Scaled data: {scaled_data}")  # Debugging statement
        
        prediction = model.predict(scaled_data)[0]
        print(f"Test Raw Prediction: {prediction}")  # Debugging statement
        
        self.assertGreaterEqual(prediction, 0, "Model prediction should be non-negative")

if __name__ == '__main__':
    unittest.main()