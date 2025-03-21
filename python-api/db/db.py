import mysql.connector
import pandas as pd
import random
import numpy as np

class DB:
    def __init__(self):
        self.conn = mysql.connector.connect(
            host="localhost", user="root", password="root", database="labtechv4"
        )
        self.cursor = self.conn.cursor()

    def get_customers(self):
        sql = "select CreditScore, Gender, Age, Balance, NumOfProducts, HasCrCard, EstimatedSalary, Class from customers_training"
        self.cursor.execute(sql)
        return self.cursor.fetchall()

    def insert_customers(self):
        data = pd.read_csv("../bank.csv")
        print('ok')
        for index, row in data.iterrows():
            query = """
            INSERT INTO customers_training (RowNumber, CustomerId, Surname, CreditScore, Geography, Gender, Age, Tenure, Balance, NumOfProducts, HasCrCard, IsActiveMember, EstimatedSalary, Exited, Class)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
            values = (
                row["RowNumber"],
                row["CustomerId"],
                row["Surname"],
                row["CreditScore"],
                row["Geography"],
                row["Gender"],
                row["Age"],
                row["Tenure"],
                row["Balance"],
                row["NumOfProducts"],
                row["HasCrCard"],
                row["IsActiveMember"],
                row["EstimatedSalary"],
                row["Exited"],
                row['Class'],
            )
            self.cursor.execute(query, values)
        self.conn.commit()

    def spend(self):
        sql = """
      SELECT 
        customerNumber, 
        SUM(priceEach * quantityOrdered) as total_spent, 
        COUNT(orderNumber) as num_orders 
      FROM orderdetails JOIN orders USING (orderNumber)
        GROUP BY customerNumber
    """
        self.cursor.execute(sql)
        return self.cursor.fetchall()


if __name__ == "__main__":
    db = DB()
    db.insert_customers()