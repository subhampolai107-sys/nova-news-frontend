async function loadArticle() {

    // Get article ID from URL
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get("id");

    if (!articleId) {
        document.getElementById("articleTitle").textContent = "Article Not Found";
        return;
    }

    try {

        // Fetch article from backend
        const response = await fetch(`https://nova-news-backend.onrender.com/api/articles/${articleId}`);

        const article = await response.json();

        // Fill page
        document.getElementById("articleTitle").textContent =
            article.title;

        document.getElementById("articleCategory").textContent =
            article.category.toUpperCase();

        document.getElementById("articleImage").src =
            article.imageUrl || "images/news1.jpg";

        const authorName = article.author || "NOVA NEWS";
    const authorElement = document.getElementById("articleAuthor");
    authorElement.textContent = authorName;
    authorElement.style.cursor = "pointer";
    authorElement.style.textDecoration = "underline";
    authorElement.onclick = () => {
       window.location.href = `author.html?name=${encodeURIComponent(authorName)}`;
    };

        document.getElementById("articleDate").textContent =
            new Date(article.createdAt).toLocaleDateString();

        document.getElementById("articleDescription").textContent =
            article.description;

        // Reading Time
        const words = article.description.trim().split(/\s+/).length;
        const readingTime = Math.ceil(words / 200);

        const readingTimeElement = document.getElementById("articleReadingTime");
        if (readingTimeElement) {
            readingTimeElement.textContent = `📖 ${readingTime} min read`;
        }

    } catch (error) {

        console.error(error);

        document.getElementById("articleTitle").textContent =
            "Failed to load article.";

    }

}

loadArticle();

// ===============================
// READING PROGRESS BAR
// ===============================

window.addEventListener("scroll", function () {
  const progressBar = document.getElementById("readingProgressBar");
  if (!progressBar) return;

  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  const scrollPercent = (scrollTop / scrollHeight) * 100;

  progressBar.style.width = scrollPercent + "%";
});