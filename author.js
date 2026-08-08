function getReadingTime(text) {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes + " min read";
}

async function loadAuthorArticles() {
  const params = new URLSearchParams(window.location.search);
  const authorName = params.get("name");

  if (!authorName) {
    document.getElementById("authorName").textContent = "Author Not Found";
    return;
  }

  document.getElementById("authorName").textContent = authorName;
  document.getElementById("authorNameInline").textContent = authorName;

  try {
    const response = await fetch(`https://nova-news-backend.onrender.com/api/articles/author/${authorName}`);
    const articles = await response.json();

    const container = document.getElementById("authorArticlesContainer");
    const countElement = document.getElementById("authorArticleCount");

    if (!articles || articles.length === 0) {
      countElement.textContent = "No articles found.";
      return;
    }

    countElement.textContent = `${articles.length} article(s) published`;
    container.innerHTML = '';

    articles.forEach(article => {
      const card = document.createElement('a');
      card.href = `article.html?id=${article._id}`;
      card.className = 'card searchable';

      card.innerHTML = `
        <img src="${article.imageUrl || 'images/news1.jpg'}" alt="${article.title}">
        <div class="card-content">
          <div class="tag">${article.category ? article.category.toUpperCase() : 'NEWS'}</div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
          <span class="reading-time">📖 ${getReadingTime(article.description)}</span>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("Author articles load karne me error:", err);
  }
}

loadAuthorArticles();