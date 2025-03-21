import { registerUser } from "@/controllers/authController";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Obtém os dados enviados no corpo da requisição
    const result = await registerUser(body);

    if (result) {
      return NextResponse.json(
        { message: "Usuário cadastrado com sucesso!" },
        { status: 201 }
      );
    } else {
      return NextResponse.json({ status: 400 });
    }
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
