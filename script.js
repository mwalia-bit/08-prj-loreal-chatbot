// -----------------------------------------------------
// L'ORÉAL CHATBOT – FRONTEND SCRIPT
// -----------------------------------------------------

// Worker endpoint (replace with your deployed Worker URL)
const WORKER_URL = "https://frosty-cloud-747e.mwalia.workers.dev";

// Conversation memory
let history = [
  {
    role: "system",
    content: `
You are the L'Oréal Beauty Advisor. 
You ONLY answer questions about:
- L'Oréal skincare
- L'Oréal haircare
- L'Oréal makeup
- L'Oréal fragrances
- Routines, skin types, concerns
If the user asks anything unrelated, politely refuse and redirect.
Respond professionally, warmly, and concisely.`,
  },
];

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const latestQ = document.getElementById("latestUserQuestion");

// -----------------------------------------------------
// Add message to chat window (bubble UI)
// -----------------------------------------------------
function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.classList.add("msg", role === "user" ? "user" : "ai");
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// -----------------------------------------------------
// Handle Form Submit
// -----------------------------------------------------
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Display user bubble
  addMessage("user", message);

  // Display the temporary "user question" banner
  latestQ.textContent = `"${message}"`;
  latestQ.classList.remove("hidden");

  // Add to history
  history.push({ role: "user", content: message });

  // Clear input
  userInput.value = "";

  // Fetch from Cloudflare Worker
  try {
    const response = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });

    const data = await response.json();
    const aiReply = data.reply;

    // Add to chat
    addMessage("ai", aiReply);

    // Save reply to history
    history.push({ role: "assistant", content: aiReply });
  } catch (err) {
    addMessage("ai", "Sorry, something went wrong. Please try again.");
  }
});
