import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler

def carregar_e_prever(dados_para_prever):
    try:
        with open('svm_model.pkl', 'rb') as arquivo_modelo:
            modelo = pickle.load(arquivo_modelo)
        
        with open('scaler.pkl', 'rb') as arquivo_scaler:
            scaler = pickle.load(arquivo_scaler)
    
        dados_entrada = np.array(dados_para_prever).reshape(1, -1)
        dados_normalizados = scaler.transform(dados_entrada)
        
        predicao = modelo.predict(dados_normalizados)
        
        return predicao[0]  # Retorna a classe prevista
    except FileNotFoundError as e:
        print(f"Erro: Arquivo não encontrado. {e}")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")
    return None

