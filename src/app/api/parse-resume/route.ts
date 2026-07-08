import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    if (file.name.endsWith('.docx')) {
      const result = await mammoth.extractRawText({ buffer });
      return NextResponse.json({ text: result.value });
    } else {
      return NextResponse.json({ error: 'Unsupported file format for server extraction' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('Error parsing file:', error);
    return NextResponse.json({ error: error.message || 'Failed to parse file' }, { status: 500 });
  }
}
