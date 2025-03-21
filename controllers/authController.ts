import axios from "axios";
import pool from "@/services/db";
import { User } from "@/types/user";
import bcrypt from "bcryptjs";

const PYTHON_API_URL = "http://127.0.0.1:5000/predict"; // URL da API Python

export const registerUser = async (user: User) => {
  try {
    // Faz a predição do perfil do usuário na API Python
    const userClass = await predictUserClass(user);
    console.log("Classe do usuário prevista:", userClass.class);

    // Hash da senha antes de salvar no banco
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Query SQL para inserir os dados do usuário na tabela 'cliente'
    const [result] = await pool.execute(
      "INSERT INTO cliente (nome, cpf, cep, email, senha, age, balance, estimated_salary, class) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        user.name,
        123456, // CPF fictício (substitua pelo real)
        123456, // CEP fictício (substitua pelo real)
        user.email,
        user.password, // Salva a senha encriptada
        user.age,
        user.balance,
        user.estimated_salary,
        userClass.class,
      ]
    );

    return { success: true, data: result };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return { success: false, error: "Erro ao cadastrar usuário" };
  }
};

export const predictUserClass = async (user: User) => {
  try {
    // Faz a predição do perfil do usuário na API Python
    const { data } = await axios.post(PYTHON_API_URL, {
      age: user.age,
      balance: user.balance,
      estimated_salary: user.estimated_salary,
    });

    return data; // Retorna a resposta da API
  } catch (error) {
    console.error("Erro ao prever classe do usuário:", error);
    throw error;
  }
};
