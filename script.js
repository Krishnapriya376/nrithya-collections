// Toggle mobile navigation menu
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });

    // Close the menu automatically when clicking any navigation link on mobile
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('show');
        });
    });
}
