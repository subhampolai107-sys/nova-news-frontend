// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");

const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {

  navLinks.classList.toggle("active");

});
// SEARCH BUTTON

const searchBtn =
document.querySelector(".search-btn");

const searchBox =
document.getElementById("searchBox");

const searchInput =
document.getElementById("searchInput");

// OPEN SEARCH BOX

searchBtn.addEventListener("click", () => {

  if(searchBox.style.display === "block"){

    searchBox.style.display = "none";

  }

  else{

    searchBox.style.display = "block";

  }

});

// SEARCH PAGE REDIRECT

searchInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){

    let value =
    searchInput.value.toLowerCase();

    // HOME

    if(value === "home"){

      window.location.href = "index.html";

    }

    // NEWS

    else if(value === "news"){

      window.location.href = "news.html";

    }

    // WORLD

    else if(value === "world"){

      window.location.href = "world.html";

    }

    // BUSINESS

    else if(value === "business"){

      window.location.href = "business.html";

    }

    // MARKET

    else if(value === "market"){

      window.location.href = "market.html";

    }

    // TECHNOLOGY

    else if(value === "technology"){

      window.location.href = "technology.html";

    }

    // SPORTS

    else if(value === "sports"){

      window.location.href = "sports.html";

    }

    // HEALTH

    else if(value === "health"){

      window.location.href = "health.html";

    }

    // EDUCATION

    else if(value === "education"){

      window.location.href = "education.html";

    }

    // PAGE NOT FOUND

    else{

      alert("Page not found");

    }

  }

});
// LIVE DATE & TIME

function updateDateTime(){

  const now = new Date();

  // DATE

  const options = {

    weekday:'long',

    year:'numeric',

    month:'long',

    day:'numeric'

  };

  const currentDate =
  now.toLocaleDateString(
  'en-US',
  options
  );

  // TIME

  const currentTime =
  now.toLocaleTimeString();

  // SHOW DATE

  document.getElementById(
  "liveDate"
  ).innerHTML = currentDate;

  // SHOW TIME

  document.getElementById(
  "liveTime"
  ).innerHTML = currentTime;

}

// UPDATE EVERY SECOND

setInterval(updateDateTime,1000);

updateDateTime();
// SHOW UPLOADED NEWS

document.getElementById(
"uploadedTitle"
).innerHTML =
localStorage.getItem("newsTitle");

document.getElementById(
"uploadedImage"
).src =
localStorage.getItem("newsImage");

document.getElementById(
"uploadedDescription"
).innerHTML =
localStorage.getItem("newsDescription");
// COMMENT SYSTEM

const commentForm =
document.getElementById(
"commentForm"
);

const commentList =
document.getElementById(
"commentList"
);

// CHECK FORM

if(commentForm){

  commentForm.addEventListener(
  "submit",

  function(e){

    e.preventDefault();

    // VALUES

    const name =
    document.getElementById(
    "commentName"
    ).value;

    const text =
    document.getElementById(
    "commentText"
    ).value;

    // CREATE COMMENT

    const commentBox =
    document.createElement("div");

    commentBox.classList.add(
    "comment-box"
    );

    // COMMENT HTML

    commentBox.innerHTML = `

      <h3>${name}</h3>

      <p>${text}</p>

    `;

    // SHOW COMMENT

    commentList.prepend(
    commentBox
    );

    // RESET FORM

    commentForm.reset();

  });

}
