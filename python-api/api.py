from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import svm_final

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods = ['POST'])
def perdict():
    data = request.json
    age = data.get('age')
    balance = data.get('balance')
    es = data.get('estimated_salary') #estimated salary
    predicted_class = svm_final.carregar_e_prever([age, balance, es])
    print(predicted_class)
    return jsonify({
        "class": predicted_class
    })

if __name__ == '__main__':
    app.run(debug=True)