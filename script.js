// Mobile Menu Toggle - Enhanced version
const mobileMenuBtn = document.getElementById("mobileMenuBtn")
const navLinks = document.querySelector(".nav-links")

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener("click", (e) => {
    e.stopPropagation()
    navLinks.classList.toggle("active")
    mobileMenuBtn.classList.toggle("active")
  })

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    }
  })

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    })
  })

  // Close menu on escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navLinks.classList.remove("active")
      mobileMenuBtn.classList.remove("active")
    }
  })
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Header Background on Scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.background = "rgba(15, 15, 35, 0.98)"
  } else {
    header.style.background = "rgba(15, 15, 35, 0.95)"
  }
})

// Subject Card Click Handler
const subjectCards = document.querySelectorAll(".subject-card")
subjectCards.forEach((card) => {
  card.addEventListener("click", () => {
    const subject = card.getAttribute("data-subject")

    // Add click animation
    card.style.transform = "scale(0.95)"
    setTimeout(() => {
      card.style.transform = ""
    }, 150)

    // Navigate to subject page
    window.location.href = `subject.html?subject=${subject}&topic=introduction`
  })
})

// Search Functionality
const searchInput = document.querySelector(".search-input")
const searchBtn = document.querySelector(".search-btn")

function performSearch() {
  const query = searchInput.value.trim()
  if (query) {
    console.log(`Searching for: ${query}`)
    showNotification(`در حال جستجو برای "${query}"...`)

    // Filter subject cards based on search
    filterSubjects(query)
  }
}

searchBtn.addEventListener("click", performSearch)
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    performSearch()
  }
})

// Filter subjects based on search query
function filterSubjects(query) {
  const cards = document.querySelectorAll(".subject-card")
  const lowerQuery = query.toLowerCase()

  cards.forEach((card) => {
    const title = card.querySelector(".card-title").textContent.toLowerCase()
    const description = card.querySelector(".card-description").textContent.toLowerCase()

    if (title.includes(lowerQuery) || description.includes(lowerQuery)) {
      card.style.display = "block"
      card.style.animation = "fadeInUp 0.5s ease forwards"
    } else {
      card.style.display = "none"
    }
  })
}

// Clear search and show all subjects
searchInput.addEventListener("input", (e) => {
  if (e.target.value === "") {
    const cards = document.querySelectorAll(".subject-card")
    cards.forEach((card) => {
      card.style.display = "block"
    })
  }
})

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".subject-card, .feature-card").forEach((el) => {
  observer.observe(el)
})

// Utility Functions
function getSubjectName(subject) {
  const names = {
    html: "HTML",
    css: "CSS",
    javascript: "JavaScript",
    react: "React",
    nodejs: "Node.js",
    python: "Python",
  }
  return names[subject] || subject
}

function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--bg-card);
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        border-radius: 8px;
        border: 1px solid var(--primary-color);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        animation: slideInRight 0.3s ease forwards;
        font-family: inherit;
        direction: rtl;
    `

  // Add animation styles
  const style = document.createElement("style")
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  document.body.appendChild(notification)

  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease forwards"
    setTimeout(() => {
      document.body.removeChild(notification)
      document.head.removeChild(style)
    }, 300)
  }, 3000)
}

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
  // ESC key to clear search
  if (e.key === "Escape") {
    searchInput.value = ""
    searchInput.blur()
    // Show all subjects
    const cards = document.querySelectorAll(".subject-card")
    cards.forEach((card) => {
      card.style.display = "block"
    })
  }
})

// Add loading states and interactions
document.addEventListener("DOMContentLoaded", () => {
  // Add staggered animation to subject cards
  const cards = document.querySelectorAll(".subject-card")
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`
  })

  // Add hover sound effect (optional)
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    })
  })

  // Initialize search input focus
  searchInput.addEventListener("focus", () => {
    searchInput.parentElement.style.transform = "scale(1.02)"
  })

  searchInput.addEventListener("blur", () => {
    searchInput.parentElement.style.transform = "scale(1)"
  })
})

// Performance optimization: Debounce search
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debounce to search
const debouncedSearch = debounce((query) => {
  if (query.length > 0) {
    filterSubjects(query)
  }
}, 300)

searchInput.addEventListener("input", (e) => {
  debouncedSearch(e.target.value)
})
