function getReadingTime(text) {
  if (!text) return "1 min read";
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return minutes + " min read";
}

async function loadNews() {
  try {
    const response = await fetch('https://nova-news-backend.onrender.com/api/articles');
    const articles = await response.json();

    const container = document.getElementById('storiesContainer');
    if (!container) return;

    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const isGeneralNewsPage = pageName === 'news' || pageName === 'index';

    const filteredArticles = isGeneralNewsPage
      ? articles
      : articles.filter(article => article.category === pageName);

    if (!filteredArticles || filteredArticles.length === 0) {
      return;
    }

    container.innerHTML = '';

    filteredArticles.forEach(article => {
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
    console.error("News load karne me error:", err);
  }
}

loadNews();