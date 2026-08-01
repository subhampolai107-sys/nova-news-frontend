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
        const response = await fetch(`http://localhost:5000/api/articles/${articleId}`);

        const article = await response.json();

        // Fill page
        document.getElementById("articleTitle").textContent =
            article.title;

        document.getElementById("articleCategory").textContent =
            article.category.toUpperCase();

        document.getElementById("articleImage").src =
            article.imageUrl || "images/news1.jpg";

        document.getElementById("articleAuthor").textContent =
            article.author || "NOVA NEWS";

        document.getElementById("articleDate").textContent =
            new Date(article.createdAt).toLocaleDateString();

        document.getElementById("articleDescription").textContent =
            article.description;

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