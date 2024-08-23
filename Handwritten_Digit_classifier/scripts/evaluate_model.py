import tensorflow as tf 
from tensorflow.keras.models import load_model
from tensorflow.keras.datasets import mnist
from tensorflow.keras.utils import to_categorical


(x_train, y_train) , (x_test, y_test) = mnist.load_data()

x_train,x_test = x_train/255.0 , x_test/255.0
y_train = to_categorical(y_train,10)

y_test = to_categorical(y_test,10) 


model = load_model('models/digit_classifier.keras')

test_loss, test_acc = model.evaluate(x_test, y_test)
print(f'Accuracy: {test_acc*100:.4f}')