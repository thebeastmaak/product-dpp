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
      <div class="card">
        <h2>${data.name || "Unnamed Product"}</h2>
        <ul>
          <li><strong>🆔 Product ID:</strong> ${data.product_id || "Not provided"}</li>
          <li><strong>🏭 Manufacturer:</strong> ${data.manufacturer || "Not provided"}</li>
          <li><strong>📝 Description:</strong> ${data.description || "Not provided"}</li>
          <li><strong>🧪 Materials:</strong> ${(Array.isArray(data.materials) ? data.materials.join(", ") : data.materials) || "Not provided"}</li>
        </ul>
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = `<p>❌ Failed to load product. Try again later.</p>`;
  }
}

fetchProduct();
