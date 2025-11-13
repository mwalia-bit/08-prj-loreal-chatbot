// -------------------------------
// L’Oréal Chatbot Frontend
// -------------------------------

const WORKER_URL = "https://frosty-cloud-747e.mwalia.workers.dev";

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
- Beauty routines & product recommendations

If the user asks anything unrelated, politely decline and redirect.
Respond warm, concise, and luxurious.
`,
  },
];

const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const latestQ = document.getElementById("latestUserQuestion");

let typingBubble = null;

// -------------------------------
// CREATE & REMOVE TYPING BUBBLE
// -------------------------------

function showTypingBubble() {
  typingBubble = document.createElement("div");
  typingBubble.classList.add("typing-indicator");
  typingBubble.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  chatWindow.appendChild(typingBubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function removeTypingBubble() {
  if (typingBubble) {
    typingBubble.remove();
    typingBubble = null;
  }
}

// -------------------------------
// ADD CHAT MESSAGE
// -------------------------------

function addMessage(role, text) {
  const bubble = document.createElement("div");
  bubble.classList.add("msg", role === "user" ? "user" : "ai");
  bubble.textContent = text;
  chatWindow.appendChild(bubble);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

// -------------------------------
// FORM SUBMIT
// -------------------------------

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const message = userInput.value.trim();
  if (!message) return;

  // Show user message
  addMessage("user", message);

  history.push({ role: "user", content: message });
  userInput.value = "";

  // ----- Show typing animation -----
  showTypingBubble();

  // ----- Fetch -----
  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: history }),
    });

    const data = await res.json();

    removeTypingBubble(); // Stop animation

    const aiReply = data.reply;
    addMessage("ai", aiReply);

    history.push({ role: "assistant", content: aiReply });
  } catch (err) {
    removeTypingBubble();
    addMessage("ai", "Sorry — something went wrong. Please try again.");
  }
});
