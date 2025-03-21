// pages/AuthPage.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { UserIcon } from "lucide-react";
import { fetchCreateUser, fetchGetUser } from "@/services/api";
import { SignupForm } from "./SignupForm";
import { LoginForm } from "./LoginForm";
import { toast } from "sonner";

export function AuthPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    age: "",
    password: "",
    confirmPassword: "",
    balance: "",
    estimated_Salary: "",
  });

  const [activeTab, setActiveTab] = useState("login");

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleLogin = async () => {
    console.log("Tentativa de login:", {
      email: formData.email,
      password: formData.password,
    });

    // Criando o objeto com email e senha
    const user = {
      email: formData.email,
      password: formData.password,
    };

    try {
      // Chama a função fetchGetUser com o objeto user
      const response = await fetchGetUser(user);
      console.log("Resposta do login:", response); // Loga a resposta da requisição

      toast("✅ Logado com sucesso!");

      // Você pode adicionar mais lógica aqui, como redirecionamento ou exibição de mensagens
    } catch (error) {
      toast("❌ Falha ao fazer login! Email ou senha incorreto!");
      console.error("Erro ao tentar fazer login:", error); // Caso ocorra erro
    }
  };

  const handleSignup = async () => {
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: formData.age ? Number(formData.age) : undefined,
      balance: formData.balance ? Number(formData.balance) : undefined,
      estimated_salary: formData.estimated_Salary
        ? Number(formData.estimated_Salary)
        : undefined,
    };

    try {
      const response = await fetchCreateUser(newUser);
      toast("✅ Usuário cadastrado com sucesso!");
      console.log(response);
    } catch (error) {
      toast("❌ Erro ao cadastrar usuário!");
      console.error("Erro ao cadastrar o usuário:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger aria-label="Abrir login">
        <UserIcon
          size={24}
          className="cursor-pointer hover:text-laranja transition"
        />
      </DialogTrigger>
      <DialogContent className="w-[400px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            {activeTab === "login" ? "Bem-vindo de volta!" : "Crie sua conta"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-2 gap-2">
            <TabsTrigger
              value="login"
              className="data-[state=active]:text-white data-[state=active]:bg-black border rounded-md py-1"
            >
              Login
            </TabsTrigger>
            <TabsTrigger
              value="signup"
              className="data-[state=active]:text-white data-[state=active]:bg-black border rounded-md py-1"
            >
              Cadastro
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm
              email={formData.email}
              password={formData.password}
              onChange={handleChange}
              onSubmit={handleLogin}
            />
          </TabsContent>

          <TabsContent value="signup">
            <SignupForm
              formData={formData}
              onChange={handleChange}
              onSubmit={handleSignup}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
