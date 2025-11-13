// -----------------------------------------------------
// L'ORÉAL BEAUTY ADVISOR – CLOUDFLARE WORKER
// -----------------------------------------------------

export default {
  async fetch(request, env) {
    try {
      const body = await request.json();
      const messages = body.messages || [];

      // Call OpenAI
      const openaiRes = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: messages,
          }),
        }
      );

      const result = await openaiRes.json();
      const reply = result.choices[0].message.content;

      return new Response(JSON.stringify({ reply }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      return new Response(JSON.stringify({ error: "Worker error" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};
