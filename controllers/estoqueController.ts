import { NextResponse } from "next/server";
import { getEstoque } from "../models/estoqueModel";

export const getEstoqueController = async () => {
  try {
    const estoque = await getEstoque();
    return NextResponse.json(estoque);
  } catch (error) {
    console.error("Erro ao buscar estoque:", error);
    return NextResponse.json(
      { error: "Erro ao buscar estoque" },
      { status: 500 }
    );
  }
};
