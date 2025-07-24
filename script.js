const container = document.getElementById("product-container");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

async function fetchProduct() {
  container.innerHTML = "Loading product details...";

  try {
    const res = await fetch(`https://backend-dpp.onrender.com/product/${id}`);
    const data = await res.json();

    if (res.status !== 200) {
      container.innerHTML = `<p>❌ ${data.error}</p>`;
      return;
    }

    container.innerHTML = `
      <div class="athlete-passport">
        <div class="header">DIGITAL ATHLETE PASSPORT</div>
        <div class="passport-body">
          <div class="athlete-photo">
            <img src="${data.image || 'https://via.placeholder.com/300x400?text=Athlete'}" alt="${data.name}" />
          </div>
          <div class="athlete-info">
            <h2>${data.name || "Unnamed Athlete"}</h2>
            <ul>
              <li><strong>Product ID:</strong> ${data.product_id || "N/A"}</li>
              <li><strong>Country:</strong> ${data.country || "N/A"}</li>
              <li><strong>Sport:</strong> ${(Array.isArray(data.sport) ? data.sport.join(", ") : data.sport) || "N/A"}</li>
              <li><strong>Description:</strong> ${data.description || "N/A"}</li>
            </ul>
          </div>
        </div>
        <div class="footer">
          <div class="footer-name">${data.name || "Unnamed Athlete"}</div>
          <div class="footer-details">ATHLETE / TEAM ${data.country || "N/A"}<br>${data.university || "University Not Provided"}</div>
          <button class="chat-button" onclick="toggleChat()">Ask AI</button>
        </div>

        <div id="chatbot-popup">
          <div class="chat-header">Ask AI <span onclick="toggleChat()" style="cursor:pointer;float:right;">❌</span></div>
          <div id="chat-messages" class="chat-messages"></div>
          <div class="chat-input">
            <input type="text" id="chat-input" placeholder="Ask something..." />
            <button id="mic-btn">🎤</button>
            <button id="send-btn">➤</button>
          </div>
        </div>
      </div>
    `;

    attachChatEvents();
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>❌ Failed to load product. Try again later.</p>`;
  }
}

function toggleChat() {
  const popup = document.querySelector("#chatbot-popup");
  if (popup) {
    popup.classList.toggle("visible");
  }


function attachChatEvents() {
  const sendBtn = document.getElementById("send-btn");
  const micBtn = document.getElementById("mic-btn");

  if (sendBtn) sendBtn.onclick = () => {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    const messages = document.getElementById("chat-messages");
    messages.innerHTML += `<div><strong>You:</strong> ${message}</div>`;
    input.value = "";

    // Simulated AI response — replace with backend fetch if needed
    setTimeout(() => {
      messages.innerHTML += `<div><strong>AI:</strong> This is a placeholder response for "${message}".</div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 600);
  };

  if (micBtn) micBtn.onclick = () => {
    alert("Voice input not yet implemented.");
  };
}

fetchProduct();
