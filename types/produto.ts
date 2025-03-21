export type Produto = {
  idproduto: number;
  nome: string;
  valor: string; // ou number, se preferir tratar como número
  peso: string; // ou number, se for realizar cálculos com o peso
  descricao: string;
  tamanho: string;
  quantidade: number;
  urlimg: string;
  categoriaProduto: string;
};
