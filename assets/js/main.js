// Component loader
async function loadComponent(elementId, filePath) {
  try {
    const response = await fetch(filePath);
    const html = await response.text();
    document.getElementById(elementId).innerHTML = html;

    // Execute any scripts in the loaded component
    const scripts = document
      .getElementById(elementId)
      .querySelectorAll("script");
    scripts.forEach((script) => {
      const newScript = document.createElement("script");
      newScript.textContent = script.textContent;
      document.head.appendChild(newScript);
    });

    console.log(`Component ${elementId} loaded successfully`);
  } catch (error) {
    console.error(`Error loading ${filePath}:`, error);
  }
}

// Load all components
document.addEventListener("DOMContentLoaded", async () => {
  console.log("Loading components...");

  await Promise.all([
    loadComponent("header", "components/header.html"),
    loadComponent("hero", "components/hero.html"),
    loadComponent("stats", "components/stats.html"),
    loadComponent("about", "components/about.html"),
    loadComponent("products", "components/products.html"),
    loadComponent("testimonials", "components/testimonials.html"),
    loadComponent("contact", "components/contact.html"),
    loadComponent("footer", "components/footer.html"),
  ]);

  console.log("All components loaded");

  // Initialize after components loaded
  const lucide = window.lucide;
  if (lucide) {
    lucide.createIcons();
  }

  // Force render products if function exists
  setTimeout(() => {
    if (typeof window.renderProducts === "function") {
      window.renderProducts();
    }
  }, 300);

  initializeMobileMenu();
  initializeSmoothScroll();
  setCurrentYear();
});

// Mobile menu functionality
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }
}

// Smooth scroll functionality
function initializeSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
}

// Set current year
function setCurrentYear() {
  const yearElement = document.getElementById("current-year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}
