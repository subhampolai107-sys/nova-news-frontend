const newsForm = document.getElementById('newsForm');
const submitBtn = newsForm.querySelector('button[type="submit"]');
let editingArticleId = null; // agar null hai matlab naya article add ho raha hai

const API_BASE = 'https://nova-news-backend.onrender.com/api/articles';

// FORM SUBMIT — Add ya Update dono handle karega
newsForm.addEventListener('submit', async function (e) {
  e.preventDefault();

  const title = document.getElementById('newsTitle').value;
  const imageUrl = document.getElementById('newsImage').value;
  const category = document.getElementById('newsCategory').value;
  const description = document.getElementById('newsDescription').value;
  const token = localStorage.getItem('token');

  if (!token) {
    alert("Please login first!");
    window.location.href = 'login.html';
    return;
  }

  const isEditing = editingArticleId !== null;
  const url = isEditing
    ? `${API_BASE}/${editingArticleId}`
    : API_BASE;
  const method = isEditing ? 'PUT' : 'POST';

  try {
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({ title, description, imageUrl, category })
    });

    const data = await response.json();

    if (response.ok) {
      alert(isEditing ? "News updated successfully!" : "News published successfully!");
      newsForm.reset();
      editingArticleId = null;
      submitBtn.textContent = "Publish News";
      loadArticlesList(); // list refresh karo
    } else {
      alert(data.error || "Failed to save news.");
    }
  } catch (err) {
    alert("Server se connect nahi ho paya. Backend chalu hai kya check karo.");
    console.error(err);
  }
});

// SAARE ARTICLES LOAD KARO AUR LIST ME DIKHAO
async function loadArticlesList() {
  const container = document.getElementById('articlesList');
  if (!container) return;

  try {
    const response = await fetch(API_BASE);
    const articles = await response.json();

    container.innerHTML = '';

    articles.forEach(article => {
      const item = document.createElement('div');
      item.className = 'admin-article-item';
      item.innerHTML = `
        <strong>${article.title}</strong> (${article.category || 'general'})
        <button class="edit-btn" data-id="${article._id}">Edit</button>
        <button class="delete-btn" data-id="${article._id}">Delete</button>
      `;
      container.appendChild(item);
    });

    // EDIT BUTTON CLICKS
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const article = articles.find(a => a._id === btn.dataset.id);
        document.getElementById('newsTitle').value = article.title;
        document.getElementById('newsImage').value = article.imageUrl || '';
        document.getElementById('newsCategory').value = article.category || '';
        document.getElementById('newsDescription').value = article.description;

        editingArticleId = article._id;
        submitBtn.textContent = "Update News";
        window.scrollTo(0, 0); // form dikhane ke liye upar scroll karo
      });
    });

    // DELETE BUTTON CLICKS
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const confirmDelete = confirm("Kya tum sach me is article ko delete karna chahte ho?");
        if (!confirmDelete) return;

        const token = localStorage.getItem('token');
        try {
          const response = await fetch(`${API_BASE}/${btn.dataset.id}`, {
            method: 'DELETE',
            headers: { 'Authorization': 'Bearer ' + token }
          });
          const data = await response.json();

          if (response.ok) {
            alert("Article deleted successfully!");
            loadArticlesList();
          } else {
            alert(data.error || "Failed to delete article.");
          }
        } catch (err) {
          alert("Server se connect nahi ho paya.");
          console.error(err);
        }
      });
    });
  } catch (err) {
    console.error("Articles load karne me error:", err);
  }
}

loadArticlesList(); // page load hote hi list dikhao