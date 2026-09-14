import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('https://drive.google.com/drive/folders/1BamhCLMTs0RHH0TBTartmTxHqAFRhbE3?usp=sharing');
}
