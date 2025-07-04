const form = document.getElementById("feedbackForm");
const thankyou = document.getElementById("thankyouMessage");
const progress = document.getElementById("progress");

// Track step progress on scroll
const sections = document.querySelectorAll("h3");
window.addEventListener("scroll", () => {
  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight / 2) {
      progress.innerText = `Step ${index + 1} of ${sections.length}`;
    }
  });
});

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

  // Send data to Google Sheets
  fetch("https://script.google.com/macros/s/AKfycby9Cc1jXTejqh2jiqg5ft3Uh5pwYlPBQlwfowPKCqJP3Iyemzoew5bBmA-lU-PlOvC8/exec", {
    method: "POST",
    mode: "no-cors", // Google Apps Script only works with no-cors
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  });

  // Show thank-you immediately after form submit (since no-cors prevents response)
  form.style.display = "none";
  thankyou.style.display = "block";
});
