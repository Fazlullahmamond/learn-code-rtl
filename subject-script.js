// Subject page functionality
document.addEventListener("DOMContentLoaded", () => {
  initializeSubjectPage()
  setupNavigation()
  setupCodeCopy()
  setupMobileMenu()
})

// Initialize subject page based on URL parameters
function initializeSubjectPage() {
  const urlParams = new URLSearchParams(window.location.search)
  const subject = urlParams.get("subject") || "html"
  const topic = urlParams.get("topic") || "introduction"

  loadSubject(subject)
  loadTopic(subject, topic)
}

// Load subject navigation
function loadSubject(subject) {
  const subjectTitles = {
    html: "د HTML زده کړې فهرست",
    css: "د CSS زده کړې فهرست",
    javascript: "د JavaScript زده کړې فهرست",
    react: "د React زده کړې فهرست",
    nodejs: "د Node.js زده کړې فهرست",
    python: "د Python زده کړې فهرست",
  }

  // Update page title and breadcrumb
  document.title = `د ${subject.toUpperCase()} زده کړه - کوډ زده کړه`
  document.getElementById("currentSubject").textContent = subject.toUpperCase()
  document.getElementById("sidebarTitle").textContent = subjectTitles[subject] || "د زده کړې فهرست"

  // Show relevant navigation section
  document.querySelectorAll(".nav-section").forEach((section) => {
    section.style.display = "none"
  })

  const targetSection = document.querySelector(`[data-subject="${subject}"]`)
  if (targetSection) {
    targetSection.style.display = "block"
  }
}

// Load topic content
function loadTopic(subject, topic) {
  const content = getTopicContent(subject, topic)
  updateLessonContent(content)
  updateActiveNavItem(topic)
}

// Get content for specific topic
function getTopicContent(subject, topic) {
  const contents = {
    html: {
      introduction: {
        title: "HTML ته پېژندنه",
        duration: "۱۰ دقیقې",
        level: "ابتدایي",
        content: `
                    <section class="content-section">
                        <h2>HTML څه شی دی؟</h2>
                        <p>
                            HTML د HyperText Markup Language لنډیز دی او دا د ویب پاڼو جوړولو معیاري ژبه ده.
                            HTML له بېلابېلو عناصرو جوړ شوی چې د ویب پاڼې منځپانګه تشریح کوي.
                        </p>
                        
                        <div class="info-box">
                            <h3>مهم ټکي</h3>
                            <p>HTML د پروګرامینګ ژبه نه ده، بلکې د منځپانګې جوړښت تعریفوي.</p>
                        </div>
                    </section>

                    <section class="content-section">
                        <h2>د HTML بنسټیز جوړښت</h2>
                        <p>هر HTML سند یو بنسټیز جوړښت لري چې لاندې عناصر لري:</p>
                        
                        <div class="code-example">
                            <div class="code-header">
                                <span class="code-title">مثال: د HTML بنسټیز جوړښت</span>
                                <button class="copy-btn" onclick="copyCode(this)">کاپي</button>
                            </div>
                            <pre class="code-block"><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ps" dir="rtl"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;د پاڼې سرلیک&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;سلام نړۍ!&lt;/h1&gt;
    &lt;p&gt;دا زما لومړۍ HTML پاڼه ده.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
                        </div>
                    </section>
                `,
      },
      headings: {
        title: "سرلیکونه په HTML کې",
        duration: "۸ دقیقې",
        level: "ابتدایي",
        content: `
                    <section class="content-section">
                        <h2>سرلیکونه (Headings)</h2>
                        <p>
                            HTML شپږ بیلابیل سرلیکونه لري چې له h1 تر h6 پورې شمیرل شوي دي.
                            h1 تر ټولو لوی او مهم سرلیک دی او h6 تر ټولو کوچنی دی.
                        </p>
                        
                        <div class="code-example">
                            <div class="code-header">
                                <span class="code-title">مثال: د سرلیک ډولونه</span>
                                <button class="copy-btn" onclick="copyCode(this)">کاپي</button>
                            </div>
                            <pre class="code-block"><code>&lt;h1&gt;د ۱ کچې سرلیک&lt;/h1&gt;
&lt;h2&gt;د ۲ کچې سرلیک&lt;/h2&gt;
&lt;h3&gt;د ۳ کچې سرلیک&lt;/h3&gt;
&lt;h4&gt;د ۴ کچې سرلیک&lt;/h4&gt;
&lt;h5&gt;د ۵ کچې سرلیک&lt;/h5&gt;
&lt;h6&gt;د ۶ کچې سرلیک&lt;/h6&gt;</code></pre>
                        </div>
                        
                        <div class="info-box">
                            <h3>مهم ټکي</h3>
                            <p>له سرلیکونو په ترتیب سره کار واخلئ او له h1 د پاڼې د اصلي سرلیک لپاره کار واخلئ.</p>
                        </div>
                    </section>
                `,
      },
    },
    css: {
      introduction: {
        title: "CSS ته پېژندنه",
        duration: "۱۲ دقیقې",
        level: "ابتدایي",
        content: `
                    <section class="content-section">
                        <h2>CSS څه شی دی؟</h2>
                        <p>
                            CSS د Cascading Style Sheets لنډیز دی او د ویب پاڼو لپاره د بڼې او ډیزاین ورکولو لپاره کارول کیږي.
                            CSS تاسو ته دا وړتیا درکوي چې رنګونه، فونټونه، واټنونه او ترتیب کنټرول کړئ.
                        </p>
                        
                        <div class="code-example">
                            <div class="code-header">
                                <span class="code-title">مثال: د CSS بنسټیز</span>
                                <button class="copy-btn" onclick="copyCode(this)">کاپي</button>
                            </div>
                            <pre class="code-block"><code>h1 {
    color: blue;
    font-size: 24px;
    text-align: center;
}

p {
    color: gray;
    line-height: 1.6;
}</code></pre>
                        </div>
                    </section>
                `,
      },
    },
    javascript: {
      introduction: {
        title: "JavaScript ته پېژندنه",
        duration: "۱۵ دقیقې",
        level: "ابتدایي",
        content: `
                    <section class="content-section">
                        <h2>JavaScript څه شی دی؟</h2>
                        <p>
                            JavaScript یوه پیاوړې پروګرامینګ ژبه ده چې د ویب پاڼو سره تعامل زیاتولو لپاره کارول کیږي.
                            د JavaScript په مرسته تاسو کولی شئ خپل ویب پاڼې ته متحرک چلند اضافه کړئ.
                        </p>
                        
                        <div class="code-example">
                            <div class="code-header">
                                <span class="code-title">مثال: د JavaScript بنسټیز</span>
                                <button class="copy-btn" onclick="copyCode(this)">کاپي</button>
                            </div>
                            <pre class="code-block"><code>// د پیغام ښودل
alert('سلام نړۍ!');

// د عنصر منځپانګه بدلونول
document.getElementById('title').innerHTML = 'نوی سرلیک';</code></pre>
                        </div>
                    </section>
                `,
      },
    },
  }

  return contents[subject]?.[topic] || contents.html.introduction
}

// Update lesson content
function updateLessonContent(content) {
  document.getElementById("lessonTitle").textContent = content.title
  document.querySelector(".lesson-duration").innerHTML = `⏱️ وخت: ${content.duration}`
  document.querySelector(".lesson-level").innerHTML = `📊 کچه: ${content.level}`

  const lessonBody = document.querySelector(".lesson-body")
  lessonBody.innerHTML = content.content
}

// Update active navigation item
function updateActiveNavItem(topic) {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.classList.remove("active")
  })

  const activeItem = document.querySelector(`[data-topic="${topic}"]`)
  if (activeItem) {
    activeItem.classList.add("active")
  }
}

// Setup navigation click handlers
function setupNavigation() {
  document.querySelectorAll(".nav-item").forEach((item) => {
    item.addEventListener("click", function (e) {
      e.preventDefault()

      const topic = this.getAttribute("data-topic")
      const subject = this.closest(".nav-section").getAttribute("data-subject")

      // Update URL
      const url = new URL(window.location)
      url.searchParams.set("subject", subject)
      url.searchParams.set("topic", topic)
      window.history.pushState({}, "", url)

      // Load content
      loadTopic(subject, topic)

      // Add completion animation
      this.style.transform = "scale(0.95)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })
}

// Setup code copy functionality
function setupCodeCopy() {
  window.copyCode = (button) => {
    const codeBlock = button.closest(".code-example").querySelector("code")
    const text = codeBlock.textContent

    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent
      button.textContent = "کاپي شو!"
      button.style.background = "var(--success-color)"

      setTimeout(() => {
        button.textContent = originalText
        button.style.background = "var(--primary-color)"
      }, 2000)
    })
  }
}

// Setup mobile menu - Enhanced version
function setupMobileMenu() {
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
}

// Next lesson functionality
window.nextLesson = () => {
  const currentActive = document.querySelector(".nav-item.active")
  const nextItem =
    currentActive.parentElement.nextElementSibling?.querySelector(".nav-item") ||
    currentActive.closest(".nav-group").nextElementSibling?.querySelector(".nav-item")

  if (nextItem) {
    nextItem.click()

    // Mark current as completed
    currentActive.classList.add("completed")

    // Update progress
    updateProgress()
  }
}

// Update progress bar
function updateProgress() {
  const totalItems = document.querySelectorAll(".nav-item").length
  const completedItems = document.querySelectorAll(".nav-item.completed").length
  const progress = Math.round((completedItems / totalItems) * 100)

  document.querySelector(".progress-fill").style.width = `${progress}%`
  document.querySelector(".progress-text").textContent = `پرمختګ: ${progress}٪`
}

// Handle browser back/forward
window.addEventListener("popstate", () => {
  initializeSubjectPage()
})

// Auto-save progress to localStorage
function saveProgress() {
  const completedTopics = Array.from(document.querySelectorAll(".nav-item.completed")).map((item) =>
    item.getAttribute("data-topic"),
  )

  const subject = new URLSearchParams(window.location.search).get("subject") || "html"
  localStorage.setItem(`progress_${subject}`, JSON.stringify(completedTopics))
}

// Load saved progress
function loadProgress() {
  const subject = new URLSearchParams(window.location.search).get("subject") || "html"
  const saved = localStorage.getItem(`progress_${subject}`)

  if (saved) {
    const completedTopics = JSON.parse(saved)
    completedTopics.forEach((topic) => {
      const item = document.querySelector(`[data-topic="${topic}"]`)
      if (item) {
        item.classList.add("completed")
      }
    })
    updateProgress()
  }
}

// Save progress when topic is completed
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("nav-item")) {
    setTimeout(saveProgress, 100)
  }
})

// Load progress on page load
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(loadProgress, 500)
})
