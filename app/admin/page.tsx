"use client";

import { Tabs, TabsList, TabsContent, TabsTrigger } from "@radix-ui/react-tabs";
import Estoque from "./_components/estoque";
import Movimentacao from "./_components/movimentacao";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col p-6 bg-gray-100 min-h-screen">
      <Tabs defaultValue="estoque" className="w-full">
        <div className="flex justify-center mb-4">
          <TabsList className="flex rounded-lg bg-white p-2 shadow-lg">
            <TabsTrigger
              value="estoque"
              className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Estoque
            </TabsTrigger>
            <TabsTrigger
              value="movimentacao"
              className="px-4 py-2 text-lg font-semibold text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none"
            >
              Movimentação
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="estoque">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Estoque />
          </div>
        </TabsContent>
        <TabsContent value="movimentacao">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <Movimentacao />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
