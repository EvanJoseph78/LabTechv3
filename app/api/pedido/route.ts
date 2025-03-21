import { NextRequest, NextResponse } from "next/server";
import { criarPedido } from "@/controllers/pedidoController"; // Se o controller for em outro arquivo

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Obtém os dados enviados no corpo da requisição

    // Chama a função do controller para criar o pedido

    const response = await criarPedido(body);

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error("Erro ao criar pedido:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
