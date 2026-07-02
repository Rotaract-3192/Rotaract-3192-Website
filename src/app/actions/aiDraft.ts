'use server';

import Groq from 'groq-sdk';

export interface AIDraftResult {
  title: string;
  content: string;
  emailSubject: string;
}

/**
 * Uses Groq (llama-3.3-70b-versatile) to draft a polished announcement
 * from a short admin prompt.
 */
export async function draftAnnouncementWithAI(
  prompt: string,
  priority: string = 'normal',
): Promise<AIDraftResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error('GROQ_API_KEY is not configured.');

  const groq = new Groq({ apiKey });

  const systemPrompt = `You are a professional communications officer for Rotaract District 3192, 
a prestigious district of Rotaract clubs in India. Your job is to write formal yet engaging 
district announcements that are sent to club members and leaders.

Tone: Professional, warm, motivating. Use proper Rotaract/Rotary terminology when relevant.
Format: Always respond with valid JSON ONLY — no markdown, no extra text, just the raw JSON object.

Return exactly this JSON shape:
{
  "title": "SHORT UPPERCASE TITLE (max 8 words)",
  "emailSubject": "Email subject line (max 12 words, sentence case)",
  "content": "Full announcement body (2-4 paragraphs, professional tone, plain text with \\n for line breaks)"
}`;

  const priorityContext =
    priority === 'alert'
      ? 'This is a CRITICAL ALERT — use urgent, clear language.'
      : priority === 'success'
      ? 'This is a SUCCESS UPDATE — use celebratory, positive language.'
      : priority === 'info'
      ? 'This is an informational message — use clear, factual language.'
      : 'This is a standard announcement — use professional, engaging language.';

  const userPrompt = `Draft a district announcement for the following:\n\n"${prompt}"\n\n${priorityContext}`;

  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 800,
    response_format: { type: 'json_object' },
  });

  const raw = completion.choices[0]?.message?.content ?? '{}';

  let parsed: Partial<AIDraftResult>;
  try {
    parsed = JSON.parse(raw);
  } catch {
    throw new Error('AI returned invalid JSON. Please try again.');
  }

  return {
    title: parsed.title ?? '',
    content: parsed.content ?? '',
    emailSubject: parsed.emailSubject ?? parsed.title ?? '',
  };
}
