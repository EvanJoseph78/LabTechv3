import { ProductCard } from "./_components/product-card";


const products = [
  {
    id: 1,
    name: 'Produto 1',
    description: 'Descrição do Produto 1',
    price: 29.99,
    image: '/images/produto1.jpg',
  },
  {
    id: 2,
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    price: 49.99,
    image: '/images/produto2.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  {
    id: 3,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    price: 19.99,
    image: '/images/produto3.jpg',
  },
  // Adicione mais produtos conforme necessário
];

export default function ProductList() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Lista de Produtos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
