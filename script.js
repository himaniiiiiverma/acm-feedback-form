const form = document.getElementById("feedbackForm");
const thankyou = document.getElementById("thankyouMessage");
const progress = document.getElementById("progress");

// Scroll-based step tracker
const sections = document.querySelectorAll("h3");
window.addEventListener("scroll", () => {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      progress.innerText = `Step ${index + 1} of ${sections.length}`;
    }
  });
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    course: document.getElementById("course").value,
    ratingOverall: form.ratingOverall.value,
    enjoyed: Array.from(document.querySelectorAll('input[name="enjoyed[]"]:checked')).map(el => el.value),
    clarifiedDoubts: form.clarifiedDoubts.value,
    engagingRounds: form.engagingRounds.value,
    domainInterest: Array.from(document.querySelectorAll('input[name="domainInterest[]"]:checked')).map(el => el.value),
    questions: document.getElementById("questions").value,
    suggestions: document.getElementById("suggestions").value
  };

  fetch("https://script.google.com/macros/s/AKfycby9Cc1jXTejqh2jiqg5ft3Uh5pwYlPBQlwfowPKCqJP3Iyemzoew5bBmA-lU-PlOvC8/exec", {
    method: "POST",
    mode: "no-cors", // Important for Google Sheets Web App
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
  .then(() => {
    // Google Scripts returns empty body on no-cors, so just proceed
    form.style.display = "none";
    thankyou.style.display = "block";
  })
  .catch(error => {
    console.error("Error submitting form:", error);
    alert("There was a problem. Please try again.");
  });
});
