import db from "@/services/db";

interface ClienteClass {
  class: string | null;
}

export async function getClienteClass(clienteId: number): Promise<string | null> {
  try {
    const [rows]: [ClienteClass[]] = await db.execute(
      "SELECT GetClass(?) AS class",
      [clienteId]
    );

    return rows.length > 0 ? rows[0].class : null;
  } catch (error) {
    console.error("Erro ao buscar a classe do cliente:", error);
    throw new Error("Erro ao buscar a classe do cliente.");
  }
}
