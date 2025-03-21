"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MovimentacaoType } from "@/types/movimentacaoType";

const Movimentacao = () => {
  const [produtos, setProdutos] = useState<MovimentacaoType[]>([]);

  useEffect(() => {
    fetch("/api/movimentacao")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao buscar movimentação:", error));
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4 w-full flex justify-center">
          Movimentação de Produtos
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data do Pedido</TableHead>
              <TableHead>Classificação</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Custo Unitário</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtos.length > 0 ? (
              produtos.map((produto, index) => (
                <TableRow
                  key={produto.idproduto}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 hover:bg-laranja/50"
                      : "bg-white hover:bg-laranja/50"
                  }
                >
                  <TableCell>
                    {new Date(produto.data_pedido).toLocaleString()}
                  </TableCell>
                  <TableCell>{produto.classificacao}</TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.quantidade}</TableCell>
                  <TableCell>{produto.custo_unitario}</TableCell>
                  <TableCell>{produto.subtotal}</TableCell>
                  <TableCell>
                    <Button variant="outline">Editar</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  Nenhuma movimentação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Movimentacao;
