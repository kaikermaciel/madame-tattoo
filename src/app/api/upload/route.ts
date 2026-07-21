import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

// Configuração do SDK com as variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
    }

    // Converter o arquivo recebido para Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload via stream para o Cloudinary aplicando otimização automática
    const uploadResult: any = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'madame-tattoo-orcamentos', // Pasta organizada no Cloudinary
          transformation: [
            { width: 1200, crop: 'limit' }, // Limita a largura máxima para economizar espaço
            { quality: 'auto', fetch_format: 'auto' } // Compactação inteligente (WebP/JPG leve)
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    // Retorna a URL segura da imagem tratada
    return NextResponse.json({ url: uploadResult.secure_url });

  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    return NextResponse.json({ error: 'Erro ao processar imagem.' }, { status: 500 });
  }
}