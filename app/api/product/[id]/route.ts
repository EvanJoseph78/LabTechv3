import { getProductById } from '@/models/productModel';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params; // Obtém o parâmetro "id" da URL
  
  if (!id) {
    return NextResponse.json({ error: 'id é obrigatório' }, { status: 400 });
  }

  try {
    // Realiza a busca no banco de dados com o parâmetro "id"
    const product = await getProductById(Number(id));
    
    // Se o produto não for encontrado, retorna um erro 404
    if (!product) {
      return NextResponse.json({ message: 'Nenhum produto encontrado' }, { status: 404 });
    }

    // Se o produto for encontrado, retorna ele em formato JSON
    return NextResponse.json(product);
  } catch (error) {
    console.error(error); // Melhor usar console.error para erros
    return NextResponse.json({ error: 'Erro ao buscar produto' }, { status: 500 });
  }
};
