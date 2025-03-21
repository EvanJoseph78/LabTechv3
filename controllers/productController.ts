
import { NextResponse } from 'next/server';
import { getAllProducts, searchProduto } from '../models/productModel';

export const getProducts = async () => {
  try {
    const products = await getAllProducts();
    return NextResponse.json(products);
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
};

export const searchProducts = async (query: string) => {
  try {
    const products = await searchProduto(query);
    return products;
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
