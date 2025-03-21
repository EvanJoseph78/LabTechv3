import { NextResponse } from "next/server";
import pool from "@/services/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "chave-secreta"; // 🔒 Defina isso no .env

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Busca usuário no banco
    const [rows]: any = await pool.execute("SELECT * FROM cliente WHERE email = ?", [email]);

    if (rows.length === 0) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 401 });
    }

    const user = rows[0];

    // Verifica a senha
    const isMatch = await bcrypt.compare(password, user.senha);
    if (!isMatch) {
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: user.idcliente, email: user.email }, SECRET_KEY, {
      expiresIn: "1h",
    });

    // Retorna resposta com cookie seguro
    const response = NextResponse.json({ success: true, token });
    response.headers.set(
      "Set-Cookie",
      `token=${token}; HttpOnly; Path=/; Max-Age=3600; Secure; SameSite=Strict`
    );

    return response;
  } catch (error) {
    console.error("Erro no login:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
