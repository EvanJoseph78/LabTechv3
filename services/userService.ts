// import bcrypt from "bcryptjs"; // Importando o bcrypt
import pool from "@/services/db"; // Importe seu serviço de banco de dados

export const getUser = async (email: string, password: string) => {
  try {
    // Consulta para buscar o usuário pelo e-mail e senha
    const [rows]: any = await pool.execute("SELECT * FROM cliente WHERE email = ? AND senha = ?", [email, password]);

    if (rows.length === 0) {
      throw new Error("Usuário não encontrado ou senha incorreta");
    }

    const user = rows[0];

    // Retorna o usuário encontrado
    return user;
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    throw new Error("Erro ao buscar o usuário no banco");
  }
};
