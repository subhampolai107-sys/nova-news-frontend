async function loadNews() {
  try {
    const response = await fetch("https://nova-news-backend.onrender.com");
    const articles = await response.json();

    const container = document.getElementById('storiesContainer');
    if (!container) return;

    const pageName = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const isGeneralNewsPage = pageName === 'news';
    const isHomePage = pageName === 'index' || pageName === '';

    let filteredArticles;

    if (isHomePage) {
      // Homepage: sirf latest 4 articles dikhao
      filteredArticles = articles.slice(0, 4);
    } else if (isGeneralNewsPage) {
      // news.html: sab articles dikhao
      filteredArticles = articles;
    } else {
      // Category pages: sirf matching category dikhao
      filteredArticles = articles.filter(article => article.category === pageName);
    }

    if (!filteredArticles || filteredArticles.length === 0) {
      return; // koi article nahi mila, static cards dikhte rahenge
    }

    container.innerHTML = '';

    filteredArticles.forEach(article => {
      const card = document.createElement("div");
      card.onclick = () => {
    window.location.href = `article.html?id=${article._id}`;
};
      card.className = "card"; 

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
// ===============================
// TRENDING NEWS
// ===============================

async function loadTrending() {
  const trendingContainer = document.getElementById("trendingContainer");
  if (!trendingContainer) return;

  try {
    const response = await fetch("https://nova-news-backend.onrender.com/trending");
    const articles = await response.json();

    trendingContainer.innerHTML = '';

    articles.forEach(article => {
      const card = document.createElement("div");
      card.onclick = () => {
        window.location.href = `article.html?id=${article._id}`;
      };
      card.className = "card";

      card.innerHTML = `
        <img src="${article.imageUrl || 'images/news1.jpg'}" alt="${article.title}">
        <div class="card-content">
          <div class="tag">${article.category ? article.category.toUpperCase() : 'NEWS'}</div>
          <h3>${article.title}</h3>
          <p>${article.description}</p>
        </div>
      `;

      trendingContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Trending load karne me error:", err);
  }
}

loadTrending();