from sklearn.datasets import fetch_california_housing
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import r2_score

housing = fetch_california_housing()
df = pd.DataFrame(housing.data, columns=housing.feature_names)
df['PRICE'] = housing.target
print(df.head())

X = df.drop('PRICE', axis=1)
Y = df['PRICE']

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.3, random_state=40)
model = LinearRegression()
model.fit(X_train, Y_train)

y_pred = model.predict(X_test)

r2 = r2_score(Y_test, y_pred)
print(f'R2 Score : {r2}')

