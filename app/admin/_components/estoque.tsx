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
import { Produto } from "@/types/produto";
import { Button } from "@/components/ui/button";

const Estoque = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    fetch("/api/estoque")
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => console.error("Erro ao buscar estoque:", error));
  }, []);

  return (
    <Card>
      <CardContent>
        <h2 className="text-xl font-bold mb-4 w-full flex justify-center">
          Estoque de Produtos
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Quantidade</TableHead>
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
                  <TableCell>{produto.idproduto}</TableCell>
                  <TableCell>{produto.nome}</TableCell>
                  <TableCell>{produto.quantidade}</TableCell>
                  <TableCell>
                    <Button variant="outline">Editar</Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Nenhum produto encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Estoque;
