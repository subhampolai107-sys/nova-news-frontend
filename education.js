async function loadNews() {
  try {
    const response = await fetch('http://localhost:5000/api/articles');
    const articles = await response.json();

    const container = document.getElementById('storiesContainer');
    if (!container) return;

    // Current page ke naam se category nikaalo (jaise business.html -> business)
    const pageName = window.location.pathname.split('/').pop().replace('.html', '');
    const isGeneralNewsPage = pageName === 'news' || pageName === 'index';

    // Agar general news page hai, sab dikhao; nahi toh category match karo
    const filteredArticles = isGeneralNewsPage
      ? articles
      : articles.filter(article => article.category === pageName);

    if (!filteredArticles || filteredArticles.length === 0) {
      return; // koi article nahi mila, purane static cards dikhte rahenge
    }

    container.innerHTML = '';

    filteredArticles.forEach(article => {
      const card = document.createElement('a');
      card.href = 'article.html';
      card.className = 'card searchable';

      card.innerHTML = `
        <img src="${article.imageUrl || 'images/news1.jpg'}" alt="${article.title}">
        <div class="card-content">
          <div class="tag">${article.category ? article.category.toUpperCase() : 'NEWS'}</div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  } catch (err) {
    console.error("News load karne me error:", err);
  }
}

loadNews();