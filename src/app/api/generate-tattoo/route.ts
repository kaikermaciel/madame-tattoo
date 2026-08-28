import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Aceita tanto HUGGINGFACE_API_KEY quanto HF_TOKEN no .env.local
    const apiKey = process.env.HUGGINGFACE_API_KEY || process.env.HF_TOKEN;

    if (!apiKey) {
      return NextResponse.json(
        { error: 'Token do Hugging Face (HF_TOKEN) não configurado no .env.local' },
        { status: 500 }
      );
    }

    let description = '';
    let style = 'anime-geek';

    // 1. Extração segura de dados (seja FormData ou JSON)
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      description = (formData.get('description') as string) || '';
      style = (formData.get('style') as string) || 'anime-geek';
    } else {
      const body = await req.json();
      description = body.description || '';
      style = body.style || 'anime-geek';
    }

    if (!description) {
      return NextResponse.json(
        { error: 'A descrição da ideia é obrigatória.' },
        { status: 400 }
      );
    }

    // 2. Construtor de Prompt Autoral para o FLUX
    const fullPrompt = `Clean flash tattoo sheet design of ${description}, style: ${style}, high contrast black lineart, isolated on pure solid white background, stencil ready vector art`;

    // 3. Chamada para a nova Router API do Hugging Face
    const response = await fetch(
      'https://router.huggingface.co/nscale/v1/images/generations',
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          model: 'black-forest-labs/FLUX.1-schnell',
          prompt: fullPrompt,
          response_format: 'b64_json',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erro no Hugging Face Router:', errorText);
      return NextResponse.json(
        { error: `Erro na API HF: ${errorText}` },
        { status: response.status }
      );
    }

    // 4. Lendo a resposta JSON do Router
    const result = await response.json();
    const base64Data = result?.data?.[0]?.b64_json;

    if (!base64Data) {
      return NextResponse.json(
        { error: 'A imagem não foi retornada no formato esperado.' },
        { status: 500 }
      );
    }

    // Monta a URL pronta para a tag <img>
    const imageUrl = `data:image/jpeg;base64,${base64Data}`;

    return NextResponse.json({ imageUrl });
  } catch (error: any) {
    console.error('Erro na rota generate-tattoo:', error);
    return NextResponse.json(
      { error: error.message || 'Erro interno ao processar a requisição' },
      { status: 500 }
    );
  }
}