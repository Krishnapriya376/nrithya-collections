document.addEventListener("DOMContentLoaded", function () {
  const WHATSAPP_NUMBER = "xxxxxxxxxx"; // Replace with your phone number

  // 1. Dynamic Year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // 2. Navigation View Switcher (Single Page App Behavior)
  const navItems = document.querySelectorAll(".nav-item, .nav-trigger");
  const sectionViews = document.querySelectorAll(".section-view");
  const navLinksContainer = document.getElementById("navLinks");

  function switchView(targetId) {
    sectionViews.forEach((section) => {
      if (section.id === targetId) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    document.querySelectorAll(".nav-item").forEach((item) => {
      if (item.getAttribute("data-target") === targetId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    if (navLinksContainer) {
      navLinksContainer.classList.remove("active");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault();
      const target = this.getAttribute("data-target");
      if (target) {
        switchView(target);
      }
    });
  });

  // Mobile Nav Toggle
  const navToggle = document.getElementById("navToggle");
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener("click", () => {
      navLinksContainer.classList.toggle("active");
    });
  }

  // 3. Catalog Filter Tabs
  const filterBtns = document.querySelectorAll(".filter-btn");
  const catalogItems = document.querySelectorAll(".catalog-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      filterBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");

      const filter = this.getAttribute("data-filter");

      catalogItems.forEach((item) => {
        if (filter === "all" || item.getAttribute("data-category") === filter) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
      });
    });
  });

  // 4. Quick Catalog Item Inquiry Buttons
  document.querySelectorAll(".inquire-item").forEach((btn) => {
    btn.addEventListener("click", function () {
      const itemName = this.getAttribute("data-item");
      const text = `Hello Nrithya Collections,\n\nI am interested in inquiring about the following item:\n• *Item:* ${itemName}\n\nPlease share price, sizing, and availability details.`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
  });

  // 5. Custom Measurement Form Handler
  const customFittingForm = document.getElementById("customFittingForm");
  if (customFittingForm) {
    customFittingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const danceForm = document.getElementById("fitDanceForm").value;
      const chest = document.getElementById("chestSize").value;
      const waist = document.getElementById("waistSize").value;
      const hip = document.getElementById("hipSize").value;
      const length = document.getElementById("lengthSize").value;
      const fabric = document.getElementById("fabricPreference").value;

      const text = `Hello Nrithya Collections,\n\nI would like to place a *Custom Fitting Order*:\n` +
        `• *Dance Form:* ${danceForm}\n` +
        `• *Bust/Chest:* ${chest} inches\n` +
        `• *Waist:* ${waist} inches\n` +
        `• *Hip:* ${hip} inches\n` +
        `• *Full Length:* ${length} inches\n` +
        `• *Fabric:* ${fabric}\n\nPlease let me know the cost and completion timeline.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  // 6. Rental Booking Form Handler
  const rentalBookingForm = document.getElementById("rentalBookingForm");
  if (rentalBookingForm) {
    rentalBookingForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const item = document.getElementById("rentalItem").value;
      const startDate = document.getElementById("startDate").value;
      const duration = document.getElementById("duration").value;

      const text = `Hello Nrithya Collections,\n\nI would like to check *Rental Availability*:\n` +
        `• *Item:* ${item}\n` +
        `• *Start Date:* ${startDate}\n` +
        `• *Duration:* ${duration} day(s)\n\nPlease confirm availability and rental terms.`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }

  // 7. General Inquiry Form Handler
  const generalInquiryForm = document.getElementById("generalInquiryForm");
  if (generalInquiryForm) {
    generalInquiryForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("genName").value.trim();
      const message = document.getElementById("genMessage").value.trim();

      const text = `Hello Nrithya Collections,\n\n` +
        `• *Name:* ${name}\n` +
        `• *Message:* ${message}`;

      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
  }
});
