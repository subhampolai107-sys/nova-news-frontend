// ===============================
// DASHBOARD FORM
// ===============================

const dashboardNewsForm = document.getElementById("dashboardNewsForm");

if (dashboardNewsForm) {

    dashboardNewsForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        // GET FORM VALUES
        const title = document.getElementById("dashboardTitle").value;
        const image = document.getElementById("dashboardImage").value;
        const description = document.getElementById("dashboardDescription").value;

        try {

            const response = await fetch("http://localhost:5000/api/news", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    title,
                    image,
                    description
                })

            });

            const result = await response.json();

            alert(result.message);

            // CLEAR FORM
            dashboardNewsForm.reset();

        } catch (error) {

            console.error(error);

            alert("Unable to connect to backend server.");

        }

    });

}


// ===============================
// AI NEWS GENERATOR
// ===============================

const generateBtn = document.getElementById("generateNews");

if (generateBtn) {

    generateBtn.addEventListener("click", function () {

        const topic = document.getElementById("aiTopic").value;

        if (topic.trim() === "") {

            alert("Please enter a news topic.");

            return;

        }

        const aiTitle =
            topic + " Technology Expands Worldwide";

        const aiDescription =
            "Artificial intelligence reports show that " +
            topic +
            " continues growing rapidly across global industries and digital platforms.";

        document.getElementById("dashboardTitle").value = aiTitle;

        document.getElementById("dashboardDescription").value = aiDescription;

    });

}