import matplotlib.pyplot as plt
from sklearn import svm
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn import metrics
import pickle

dados = pd.read_csv('bank.csv')
dados.head()

X = dados[['Age', 'Balance', 'EstimatedSalary']]
Y = dados[['Class']]

X_train, X_test, Y_train, Y_test = train_test_split(X,Y, shuffle = True, test_size = 0.2 )
scaler = StandardScaler()
scaler.fit(X_train)
X_train =  scaler.transform(X_train)
X_test =scaler.transform(X_test)

clf = svm.SVC(kernel = 'rbf')
clf.fit(X_train, Y_train)
y_pred = clf.predict(X_test)

with open('svm_model.pkl', 'wb') as file:
    pickle.dump(clf, file)
with open('scaler.pkl', 'wb') as file:
    pickle.dump(scaler, file)

print(metrics.classification_report(Y_test,y_pred))