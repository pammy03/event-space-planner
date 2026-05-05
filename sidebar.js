// sidebar.js
const sidebarHTML = `
  <style>
    /* ปรับแต่งสไตล์ Submenu ให้สวยงามพรีเมียม */
    .submenu-wrapper {
      display: grid;
      grid-template-rows: 0fr; /* เริ่มต้นที่พับไว้ */
      transition: grid-template-rows 0.3s ease-out, opacity 0.3s ease;
      overflow: hidden;
      opacity: 0;
    }

    /* เมื่อเมนูกางออก */
    .submenu-wrapper.expanded {
      grid-template-rows: 1fr !important;
      opacity: 1 !important;
      padding-bottom: 10px;
    }

    .submenu-inner {
      min-height: 0; /* จำเป็นสำหรับ CSS Grid Animation */
      padding-left: 10px !important;
      padding-right: 10px !important;
      display: flex;
      flex-direction: column;
      gap: 6px !important;
    }

    .submenu-link {
      padding: 12px 18px !important;
      border-radius: 12px !important;
      transition: all 0.2s ease !important;
      width: 100% !important;
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      color: #64748b !important;
      text-decoration: none !important;
    }

    .submenu-link.active {
      background-color: #eff6ff !important;
      color: #1e52a8 !important;
      font-weight: 700;
    }
    
    .submenu-link.active i { color: #1e52a8 !important; }
    .submenu-link:hover:not(.active) { background-color: #f8fafc !important; }
    .submenu-link i { font-size: 16px !important; width: 20px !important; text-align: center !important; }
  </style>

  <aside class="sidebar">
    <div class="sidebar-item">
      <button class="menu-btn" id="knowledgeToggleBtn" onclick="toggleKnowledgeMenu()">
        <div class="menu-left">
          <i class="fas fa-book-open"></i> แหล่งความรู้ทั้งหมด
        </div>
        <i class="fas fa-chevron-down icon-arrow"></i>
      </button>
      <div class="submenu-wrapper" id="knowledgeSubmenu">
        <div class="submenu-inner">
          <a href="network.html" class="submenu-link" id="side-learning">
            <i class="far fa-lightbulb"></i> สื่อการเรียนรู้
          </a>
          <a href="video.html" class="submenu-link" id="side-video">
            <i class="fab fa-youtube"></i> วิดีโอ
          </a>
          <a href="law.html" class="submenu-link" id="side-law">
            <i class="fas fa-gavel"></i> กฎหมายที่เกี่ยวข้อง
          </a>
        </div>
      </div>
    </div>
    <div class="sidebar-item">
      <a href="sustainability.html" class="menu-btn" id="side-sustainability">
        <div class="menu-left">
          <i class="fas fa-leaf" style="color: #4caf50"></i> อิมแพ็คกับความยั่งยืน
        </div>
      </a>
    </div>
    <div class="sidebar-item">
      <a href="faq.html" class="menu-btn" id="side-faq">
        <div class="menu-left">
          <i class="fas fa-question-circle"></i> คำถามที่พบบ่อย
        </div>
      </a>
    </div>
    <div class="sidebar-item">
      <a href="about.html" class="menu-btn" id="side-about">
        <div class="menu-left">
          <i class="fas fa-info-circle"></i> เกี่ยวกับเรา
        </div>
      </a>
    </div>
    <div class="sidebar-item">
      <a href="reference.html" class="menu-btn" id="side-reference">
        <div class="menu-left">
          <i class="fas fa-link"></i> แหล่งอ้างอิง
        </div>
      </a>
    </div>
  </aside>
`;

function loadSidebar() {
  const container = document.getElementById("sidebar-container");
  if (container) {
    container.innerHTML = sidebarHTML;
  }

  // หาชื่อไฟล์ปัจจุบัน
  const path = window.location.pathname;
  const currentPage = path.split("/").pop() || "index.html";

  const toggleBtn = document.getElementById("knowledgeToggleBtn");
  const submenu = document.getElementById("knowledgeSubmenu");

  // ล้าง Active เก่า
  document
    .querySelectorAll(".submenu-link")
    .forEach((l) => l.classList.remove("active"));
  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("active"));

  // เช็คกลุ่ม "แหล่งความรู้"
  const isKnowledge =
    currentPage.includes("network") ||
    currentPage.includes("video") ||
    currentPage.includes("law");

  if (isKnowledge) {
    toggleBtn.classList.add("active");
    toggleBtn.classList.remove("collapsed");
    submenu.classList.add("expanded"); // สั่งกางออกด้วย Class แทน Inline style

    if (currentPage.includes("network"))
      document.getElementById("side-learning").classList.add("active");
    if (currentPage.includes("video"))
      document.getElementById("side-video").classList.add("active");
    if (currentPage.includes("law"))
      document.getElementById("side-law").classList.add("active");
  } else {
    toggleBtn.classList.add("collapsed");
    submenu.classList.remove("expanded"); // สั่งพับเข้า

    if (currentPage.includes("sustainability"))
      document.getElementById("side-sustainability").classList.add("active");
    if (currentPage.includes("faq"))
      document.getElementById("side-faq").classList.add("active");
    if (currentPage.includes("about"))
      document.getElementById("side-about").classList.add("active");
    if (currentPage.includes("reference"))
      document.getElementById("side-reference").classList.add("active");
  }
}

function toggleKnowledgeMenu() {
  const btn = document.getElementById("knowledgeToggleBtn");
  const menu = document.getElementById("knowledgeSubmenu");

  btn.classList.toggle("collapsed");
  menu.classList.toggle("expanded"); // ใช้การ toggle class expanded แทน
}

document.addEventListener("DOMContentLoaded", loadSidebar);
