import { getMovimentacao } from "@/models/movimentacaoModel";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const estoque = await getMovimentacao();
    return NextResponse.json(estoque);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estoque" },
      { status: 500 }
    );
  }
};
