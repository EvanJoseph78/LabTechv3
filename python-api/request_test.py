import requests

res = requests.post('http://localhost:5000/profile', json={
    "age": 30,
    "balance": 0,
    "estimated_salary": 5000
})

print(res.json())