 const form = document.getElementById("feedbackForm");
  const thankyou = document.getElementById("thankyouMessage");
  const progress = document.getElementById("progress");

  // 🧠 Scroll-based progress tracking
  let sections = document.querySelectorAll("h3");
  let currentStep = 1;

  window.addEventListener("scroll", () => {
    sections.forEach((section, index) => {
      let rect = section.getBoundingClientRect();
      if (rect.top < window.innerHeight / 2) {
        currentStep = index + 1;
        progress.innerText = `Step ${currentStep} of ${sections.length}`;
      }
    });
  });

  // 📨 Form submission logic
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

    // 🔗 Send data to Google Sheets via Web App URL
    fetch("https://script.google.com/macros/s/AKfycby9Cc1jXTejqh2jiqg5ft3Uh5pwYlPBQlwfowPKCqJP3Iyemzoew5bBmA-lU-PlOvC8/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        form.style.display = "none";
        thankyou.style.display = "block";
      } else {
        alert("There was an error submitting the form. Please try again.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("There was an error connecting to the server.");
    });
  });