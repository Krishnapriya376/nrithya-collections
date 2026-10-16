document.addEventListener("DOMContentLoaded", function () {
  // 1. Dynamic Footer Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });

    // Close menu when clicking outside or clicking links
    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // 3. WhatsApp Direct Order Generator Form
  const inquiryForm = document.getElementById("inquiryForm");
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const danceForm = document.getElementById("danceForm").value;
      const serviceType = document.getElementById("serviceType").value;
      const message = document.getElementById("message").value.trim();

      // Form text message
      const text = `Hello Nrithya Collections,\n\nI would like to inquire about the following details:\n\n` +
        `• *Name:* ${name}\n` +
        `• *Dance Form/Item:* ${danceForm}\n` +
        `• *Service:* ${serviceType}\n` +
        `• *Details:* ${message}\n\n` +
        `Please send me details regarding availability and pricing. Thank you!`;

      // Encoded URL for WhatsApp Redirect
      const encodedText = encodeURIComponent(text);
      const whatsappURL = `https://wa.me/xxxxxxxxxx?text=${encodedText}`;

      // Open WhatsApp chat in a new tab
      window.open(whatsappURL, "_blank");
    });
  }
});
