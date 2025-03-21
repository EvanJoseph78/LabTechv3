import axios from "axios";
import { User } from "@/types/user";
import { Pedido } from "@/types/pedido";

// Criando uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// Melhoria nos logs – Agora o log é padronizado para melhor depuração.

// Código mais DRY – Removemos repetições, reaproveitando a função fetchData.
// Função genérica para requisições GET e POST
const fetchData = async (method: "get" | "post", url: string, data?: any) => {
  try {
    console.log(`[API] ${method.toUpperCase()} ${url}`, data || ""); // Log da requisição
    const response = await api[method](url, data);
    console.log(`[API] Resposta recebida:`, response.data); // Log da resposta
    return response.data;
  } catch (error) {
    handleApiError(error, url);
  }
};

// Tratamento de erro centralizado
const handleApiError = (error: any, url: string) => {
  console.error(`[Erro na API] Falha ao acessar ${url}:`, error);
  throw new Error("Erro na comunicação com o servidor. Tente novamente.");
};

// Função para obter todos os produtos
export const fetchProducts = async () => fetchData("get", "/api/products");

// Função para criar um usuário
export const fetchCreateUser = async (userData: User) =>
  fetchData("post", "/api/user", userData);

// Função para buscar produtos com termo de pesquisa
export const fetchSearch = async (query: string) =>
  fetchData("get", `/api/products/${query}`);

// Função para buscar o estoque
export const fetchEstoque = async () => fetchData("get", "/api/estoque");

// Função para buscar a movime
export const fetchMovimentacao = async () =>
  fetchData("get", "/api/movimentacao");

export const fetchGetUser = async (user: { email: string; password: string }) =>
  fetchData("post", "/api/auth", user);

export const fetchCriarPedido = async (pedido: Pedido) =>
  fetchData("post", "/api/pedido", pedido);

export const fetchGetProduct = async (id: number) =>
  fetchData("get", `/api/product/${id}`);

export const fetchGetClientClass = async (id: number) =>
  fetchData("get", `/api/cliente/${id}`);