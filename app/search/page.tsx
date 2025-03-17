'use client';

import { useSearchParams } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="p-8 ">
      <h1 className="text-2xl">Resultados da Pesquisa:</h1>
      <p className="mt-4">Você pesquisou por: {query || 'Nenhuma busca realizada'}</p>
    </div>
  );
};

export default SearchPage;

