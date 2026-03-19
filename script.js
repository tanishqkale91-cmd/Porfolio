/**
 * portfolio/script.js
 * 
 * This file handles dynamic content rendering and scroll animations.
 * 
 * TO UPLOAD NEW DESIGNS:
 * 1. Put your image files (e.g., car1.jpg) in the same folder or an assets folder.
 * 2. Add a new object to the `myProjects` array below with the "title" and "image" filename!
 */

const myProjects = [
    {
        title: "Honda ZR-V Concept",
        image: "Honda.jpeg" // Replace this URL with your local image like 'honda-zrv.jpg'
    },
    {
        title: "Skoda Kushaq Facelift Classic",
        image: "Kushaq.png" // Replace with yours
    },
    {
        title: "Skoda Slavia",
        image: "Slavia.png" // Replace with yours
    },
    {
        title: "Audi RS E-Tron",
        image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&q=80"
    },
    {
        title: "Offroad SUV Concept",
        image: "LAMBO.png"
    },
    {
        title: "Minimal Sedan",
        image: "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&q=80"
    }
];

document.addEventListener("DOMContentLoaded", () => {
    // 1. Render Projects
    const projectGrid = document.getElementById("project-grid");

    myProjects.forEach(project => {
        // Create card element
        const card = document.createElement("div");
        card.className = "project-card";

        // Build card HTML
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image" />
            <div class="project-info">
                <div class="project-title">${project.title}</div>
            </div>
        `;

        projectGrid.appendChild(card);
    });

    // 2. Scroll Animation Observer
    const sections = document.querySelectorAll('.smooth-fade');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once faded in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
