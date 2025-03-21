import { getClienteClass } from "@/models/clienteModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
    { params }: { params: { id: string } } 
) {
  try {

    const { id } = params; // Obtém o parâmetro "search" da URL

    const clientClass  = await getClienteClass(Number(id));
   
    return NextResponse.json(clientClass, { status: 200 });
  } catch (error) {
    console.error("Erro ao obter pedido:", error);
    return NextResponse.json(
      { error: "Erro interno no servidor" },
      { status: 500 }
    );
  }
}
