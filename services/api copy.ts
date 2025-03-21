import { User } from "@/types/user";
import axios from "axios";

// Criando uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
});

// Função para obter todos os produtos
export const fetchProducts = async () => {
  try {
    // Fazendo a requisição GET para o endpoint '/api/products'
    const response = await api.get("/api/products");
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao buscar produtos:", error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};

export const fetchCreateUser = async (userData: User) => {
  try {
    const response = await api.post("/api/user", userData);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
}

export const fetchSearch = async (query: string) => {
  try {
    console.log(`Buscando produtos com o termo: ${query}`); // Loga o termo de pesquisa

    const response = await api.get(`/api/products/${query}`);
    
    console.log("Resposta da API:", response.data); // Loga a resposta da API

    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error("Erro ao buscar produtos:", error); // Loga o erro no console
    throw error; // Lança o erro para ser tratado onde a função for chamada
  }
};