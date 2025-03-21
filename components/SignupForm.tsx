// components/SignupForm.tsx
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";

interface SignupFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: string;
    balance: string;
    estimated_Salary: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export function SignupForm({ formData, onChange, onSubmit }: SignupFormProps) {
  return (
    <Card>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={formData.password}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="confirmPassword">Confirmar Senha</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="age">Idade</Label>
          <Input
            id="age"
            type="number"
            value={formData.age}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="balance">Salário</Label>
          <Input
            id="balance"
            type="number"
            value={formData.balance}
            onChange={onChange}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="estimated_Salary">Salário Anual</Label>
          <Input
            id="estimated_Salary"
            type="number"
            value={formData.estimated_Salary}
            onChange={onChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit}>Cadastrar</Button>
      </CardFooter>
    </Card>
  );
}
