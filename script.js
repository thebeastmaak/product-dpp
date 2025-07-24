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
    </div>
  </div>
`;

    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>❌ Failed to load product. Try again later.</p>`;
  }
}

// Chatbot functionality
document.body.addEventListener('click', function (e) {
  if (e.target.id === 'chatbot-button') {
    document.getElementById('chatbot-overlay').style.display = 'block';
  }
  if (e.target.id === 'close-chatbot') {
    document.getElementById('chatbot-overlay').style.display = 'none';
  }
});

document.getElementById("send-btn").addEventListener("click", () => {
  const input = document.getElementById("chatbot-input").value;
  if (input.trim()) {
    document.getElementById("chatbot-response").innerText = `You asked: "${input}". (Response logic not connected yet.)`;
  }
});

// Voice input (Web Speech API)
document.getElementById("speak-btn").addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("chatbot-input").value = transcript;
  };
});


fetchProduct();
