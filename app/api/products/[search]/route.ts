// app/api/products/[search]/route.js
import { searchProducts } from '@/controllers/productController';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
    req: NextRequest,
    { params }: { params: { search: string } }  
) => {
  const { search } = params; // Obtém o parâmetro "search" da URL
  
  if (!search) {
    return NextResponse.json({ error: 'Parâmetro de busca é obrigatório' }, { status: 400 });
  }

  try {
    // Realiza a busca no banco de dados com o parâmetro "search"
    const products = await searchProducts(search);
    
    // Se encontrar produtos, retorna em formato JSON
    if (!products) {
      return NextResponse.json({ message: 'Nenhum produto encontrado' }, { status: 404 });
    }

    return NextResponse.json(products);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
};
