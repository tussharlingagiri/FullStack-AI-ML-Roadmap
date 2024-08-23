import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential # a linear stack of layers where you can build neural network model layer by layer
from tensorflow.keras.layers import Dense,Flatten # connected layer where each neuron is connected to every neuron in the next layer
from tensorflow.keras.utils import to_categorical # converts class labels to one-hot encoded vectors

(x_train, y_train) , (x_test, y_test) = mnist.load_data() # load the mnist dataset

x_train,x_test = x_train/255.0 , x_test/255.0 # normalize the data by dividing by 255
y_train = to_categorical(y_train,10) # convert the class labels to one-hot encoded vectors
y_test = to_categorical(y_test,10) # convert the class labels to one-hot encoded vectors

model = Sequential([
    Flatten(input_shape=(28,28)), # converts the 2D 28x28 image to a 1D array of 784 pixels
    Dense(128, activation='relu'), # fully connected layer with 128 neurons and relu activation function introduces non linearity 
    Dense(10, activation='softmax')  #. The softmax activation function converts the output of each neuron into a probability distribution, with the sum of all probabilities equal to 1.

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy']) # minimize the loss function during the training of neural networks.  It measures the difference between the predicted probability distribution and the true distribution.The accuracy metric is used to evaluate the model's performance on the training and testing data.

model.fit(x_train, y_train, epochs=5, validation_data=(x_test,y_test)) # epochs is the number of times the model will be trained on the entire dataset. The validation_data parameter is used to evaluate the model on the test data after each epoch.

test_loss, test_acc = model.evaluate(x_test, y_test)
print(f'Accuracy: {test_acc*100:.4f}')

model.save('models/digit_classifier.keras')