// app/produtos/[id]/page.tsx
'use client'

import { Button } from '../../../components/ui/button';
import { useParams } from 'next/navigation';

const products = [
  {
    id: 1,
    name: 'Produto 1',
    description: 'Descrição detalhada do Produto 1',
    price: 29.99,
    image: '/images/produto1.jpg',
    details: 'Detalhes mais profundos do Produto 1, como características especiais, especificações técnicas, etc.',
  },
  {
    id: 2,
    name: 'Produto 2',
    description: 'Descrição detalhada do Produto 2',
    price: 49.99,
    image: '/images/produto2.jpg',
    details: 'Detalhes mais profundos do Produto 2, como características especiais, especificações técnicas, etc.',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição detalhada do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
    details: 'Detalhes mais profundos do Produto 3, como características especiais, especificações técnicas, etc.',
  },
];

export default function ProductDetail() {
  const { id } = useParams();  // Obtém o id da URL
  const product = products.find((product) => product.id === parseInt(id));  // Encontra o produto pelo id

  if (!product) {
    return <p>Produto não encontrado.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="flex-1">
          <img
            src={product.image}
            alt={product.name}
            width={500}
            height={500}
            className="rounded-md shadow-md"
          />
        </div>
        <div className="flex-1 lg:ml-8 mt-4 lg:mt-0">
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <p className="text-lg font-bold text-laranja mb-4">${product.price}</p>
          <p className="text-gray-800 mb-4">{product.details}</p>
          <Button className="w-full bg-laranja text-white hover:bg-orange-600">
            Adicionar ao Carrinho
          </Button>
        </div>
      </div>
    </div>
  );
}

