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
    // --- Techfest Particle Background ---
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.4;
                this.vy = (Math.random() - 0.5) * 0.4;
                this.size = Math.random() * 1.5 + 0.5;
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }
            draw() {
                ctx.fillStyle = 'rgba(100, 150, 255, 0.6)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Use fewer particles on mobile to keep performance smooth
        const particleCount = window.innerWidth < 768 ? 30 : 70;
        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            // Draw connecting lines for the constellation effect
            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = dx * dx + dy * dy;
                    if (dist < 12000) {
                        ctx.strokeStyle = `rgba(100, 150, 255, ${0.12 - dist / 100000})`;
                        ctx.lineWidth = 0.6;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(animate);
        }
        animate();
    }
    // --- End Particle Background ---

    // --- Hero Parallax ---
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            heroContent.style.transform = `translateY(${scrollY * 0.35}px)`;
            heroContent.style.opacity = Math.max(0, 1 - scrollY / 600);
        });
    }

    // 1. Render Projects
    const projectGrid = document.getElementById("project-grid");

    myProjects.forEach((project, index) => {
        // Create card element
        const card = document.createElement("div");
        card.className = "project-card";
        
        // Hide project cards initially for the stagger effect
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";

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
                
                // Staggered pop-in for project cards
                if (entry.target.id === 'projects') {
                    const cards = entry.target.querySelectorAll('.project-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.6s ease, transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                            
                            // Remove inline transitions after fade-in to let CSS hover effects take over
                            setTimeout(() => { card.style.transition = ''; }, 600);
                        }, index * 150);
                    });
                }

                // Optional: Stop observing once faded in to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
