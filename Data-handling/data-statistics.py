import pandas as pd
    

data_csv = pd.read_csv('weatherHistory_copy.csv')


print(data_csv.head())
mean_value = data_csv['Temperature (C)'].mean()
median_value = data_csv['Temperature (C)'].median()
mode_value = data_csv['Temperature (C)'].mode()

print(f'Mean : {mean_value}, Median : {median_value}, Mode : {mode_value}')

filtered_data = data_csv[data_csv['Temperature (C)'] > 25]
print(filtered_data)