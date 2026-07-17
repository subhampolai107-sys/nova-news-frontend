// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

// ===============================
// SEARCH BUTTON
// ===============================

const searchBtn = document.querySelector(".search-btn");
const searchBox = document.getElementById("searchBox");
const searchInput = document.getElementById("searchInput");

if (searchBtn && searchBox) {
    searchBtn.addEventListener("click", () => {

        if (searchBox.style.display === "block") {
            searchBox.style.display = "none";
        } else {
            searchBox.style.display = "block";
        }

    });
}

// ===============================
// SEARCH REDIRECT
// ===============================

if (searchInput) {

    searchInput.addEventListener("keypress", function (e) {

        if (e.key === "Enter") {

            const value = searchInput.value.toLowerCase().trim();

            const pages = {
                home: "index.html",
                news: "news.html",
                world: "world.html",
                business: "business.html",
                market: "market.html",
                technology: "technology.html",
                sports: "sports.html",
                health: "health.html",
                education: "education.html"
            };

            if (pages[value]) {
                window.location.href = pages[value];
            } else {
                alert("Page not found");
            }

        }

    });

}

// ===============================
// LIVE DATE & TIME
// ===============================

function updateDateTime() {

    const now = new Date();

    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    };

    const currentDate = now.toLocaleDateString("en-US", options);
    const currentTime = now.toLocaleTimeString();

    const liveDate = document.getElementById("liveDate");
    const liveTime = document.getElementById("liveTime");

    if (liveDate) liveDate.innerHTML = currentDate;
    if (liveTime) liveTime.innerHTML = currentTime;

}

setInterval(updateDateTime, 1000);
updateDateTime();

// ===============================
// SHOW UPLOADED NEWS
// ===============================

const uploadedTitle = document.getElementById("uploadedTitle");
const uploadedImage = document.getElementById("uploadedImage");
const uploadedDescription = document.getElementById("uploadedDescription");

if (uploadedTitle && uploadedImage && uploadedDescription) {

    uploadedTitle.innerHTML =
        localStorage.getItem("newsTitle") || "";

    uploadedImage.src =
        localStorage.getItem("newsImage") || "images/news1.jpg";

    uploadedDescription.innerHTML =
        localStorage.getItem("newsDescription") || "";

}

// ===============================
// COMMENT SYSTEM
// ===============================

const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");

if (commentForm && commentList) {

    commentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const name =
            document.getElementById("commentName").value;

        const text =
            document.getElementById("commentText").value;

        const commentBox =
            document.createElement("div");

        commentBox.classList.add("comment-box");

        commentBox.innerHTML = `
            <h3>${name}</h3>
            <p>${text}</p>
        `;

        commentList.prepend(commentBox);

        commentForm.reset();

    });

}

console.log("NOVA NEWS Script Loaded Successfully");