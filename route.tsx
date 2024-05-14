import OpenAI from "openai";

const openai = new OpenAI();

export async function POST(req: Request) {
  const { text } = (await req.json()) as {
    text: string
  }

   const response = await openai.audio.speech.create({
    model: "tts-1",
    voice: "shimmer",
    input: text,
  });

  return new Response(response.body, {
    headers: {
      "Content-Type": response.type,
    },
  })
}
