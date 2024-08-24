import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten, Dropout, Conv2D, MaxPooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.utils import to_categorical

# Load and preprocess the data
(x_train, y_train), (x_test, y_test) = mnist.load_data()
x_train = x_train.reshape(-1, 28, 28, 1).astype('float32') / 255.0
x_test = x_test.reshape(-1, 28, 28, 1).astype('float32') / 255.0
y_train, y_test = to_categorical(y_train, 10), to_categorical(y_test, 10)

# Data augmentation
datagen = ImageDataGenerator(   # Data augmentation is a technique used to artificially increase the size of the dataset by applying random transformations to the input data
    rotation_range=10,
    zoom_range=0.1,
    width_shift_range=0.1,
    height_shift_range=0.1
)
datagen.fit(x_train)

# Define the model
model = Sequential([
    Conv2D(32, kernel_size=(3, 3), activation='relu', input_shape=(28, 28, 1)), # Conv2D layer is used to extract features from the input image. The kernel_size parameter specifies the size of the filter matrix, and the activation parameter specifies the activation function to be used.
    MaxPooling2D(pool_size=(2, 2)), # MaxPooling2D layer is used to reduce the spatial dimensions of the output volume. The pool_size parameter specifies the size of the pooling window.
    Dropout(0.25), # Dropout layer is used to prevent overfitting by randomly setting a fraction of the input units to zero during training.
    Conv2D(64, kernel_size=(3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Dropout(0.25),
    Flatten(),
    Dense(128, activation='relu'),
    Dropout(0.5),
    Dense(10, activation='softmax')
])


model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), loss='categorical_crossentropy', metrics=['accuracy']) 
model.fit(datagen.flow(x_train, y_train, batch_size=128), epochs=20, validation_data=(x_test, y_test)) # The fit method is used to train the model on the training data. The validation_data parameter is used to evaluate the model on the test data after each epoch.
model.save('models/digit_classfier.keras')
