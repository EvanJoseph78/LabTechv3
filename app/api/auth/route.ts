import { getUser } from '@/services/userService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Corrigido o uso da palavra-chave "await" como variável
    const user = await getUser(body.email, body.password);

    // Retorna a resposta com os dados do usuário (ou outro tipo de resposta)
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: 'Erro ao processar a requisição', error: error.message }, { status: 500 });
  }
}
