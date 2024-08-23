import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
import pickle

from sklearn.datasets import load_iris
data =  load_iris()
X = data.data
Y = data.target

imputer = SimpleImputer(strategy='mean')
X = imputer.fit_transform(X)

scaler = StandardScaler()
X = scaler.fit_transform(X)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, Y_train)

Y_pred = model.predict(X_test)
accuracy = accuracy_score(Y_test, Y_pred)
print(f'Accuracy:, {accuracy*100:.2f}')


with open('Trained_model.pkl', 'wb') as file:
    pickle.dump(model, file)
    
with open ('preprocessor.pkl','wb') as file:
    pickle.dump({'imputer': imputer, 'scaler': scaler},file)
    
print('Model and Preprocessor saved successfully')





