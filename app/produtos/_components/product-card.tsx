
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-white shadow-md">
      <Image
        src={product.image}
        alt={product.name}
        width={200}
        height={200}
        className="rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-4">{product.description}</p>
      <p className="text-lg font-bold text-laranja mb-4">${product.price}</p>
      <Button className="w-full bg-laranja text-white hover:bg-orange-600">
        Adicionar ao Carrinho
      </Button>
    </div>
  );
};
