// Toggle mobile navigation menu
const menuBtn = document.getElementById('menuBtn');
const navbar = document.getElementById('navbar');

if (menuBtn && navbar) {
    menuBtn.addEventListener('click', () => {
        navbar.classList.toggle('show');
    });

    // Close menu when clicking any nav link
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('show');
        });
    });
}

// Sticky header shadow effect on scroll
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Dance Form Filter Tabs Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const danceCards = document.querySelectorAll('.dance-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        danceCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});

// Interactive Modal for Dance Cards Quick View
const modal = document.getElementById('danceModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalCategory = document.getElementById('modalCategory');

danceCards.forEach(card => {
    const quickViewBtn = card.querySelector('.quick-view-btn');
    quickViewBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');
        const cat = card.getAttribute('data-category').toUpperCase();

        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        modalCategory.textContent = `${cat} CLASSICAL COLLECTION`;

        modal.classList.add('show');
    });
});

if (closeModal && modal) {
    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    // Close modal when clicking outside the box
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });
}

// FAQ Accordion Toggle Functionality
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    questionBtn.addEventListener('click', () => {
        // Close other opened FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        // Toggle current FAQ
        item.classList.toggle('active');
    });
});
