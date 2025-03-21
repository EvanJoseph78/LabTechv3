// components/LoginForm.tsx
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LoginFormProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
}

export function LoginForm({
  email,
  password,
  onChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entrar</CardTitle>
        <CardDescription>Faça login na sua conta</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" type="email" value={email} onChange={onChange} />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Senha</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={onChange}
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onSubmit}>Entrar</Button>
      </CardFooter>
    </Card>
  );
}
