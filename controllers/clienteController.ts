import { getClienteClass } from "@/models/clienteModel";
import { NextApiRequest, NextApiResponse } from "next";


export async function handleGetClienteClass(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { id } = req.query;

  // Validando se o ID é um número
  const clienteId = Number(id);
  if (isNaN(clienteId)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const classe = await getClienteClass(clienteId);
    if (!classe) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.status(200).json({ class: classe });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}
