// sidebar.js
const sidebarHTML = `
  <style>
    /* ปรับแต่งสไตล์ Submenu ให้สวยงามพรีเมียม (เฉพาะใน JS นี้) */
    .submenu-inner {
      padding-left: 10px !important; /* ลดระยะห่างจากเส้นคั่นซ้าย */
      padding-right: 10px !important;
      display: flex;
      flex-direction: column;
      gap: 6px !important; /* ระยะห่างระหว่างเมนูย่อย */
    }

    .submenu-link {
      padding: 12px 18px !important;
      border-radius: 12px !important; /* ความมนพรีเมียม */
      transition: all 0.2s ease !important;
      width: 100% !important;
      display: flex !important;
      align-items: center !important;
      gap: 14px !important;
      color: #64748b !important; /* สีเทาเข้มสวยๆ */
      text-decoration: none !important;
    }

    /* สไตล์ตอน Active (เลือกอยู่) - ขยายเต็มและสีชัดเจน */
    .submenu-link.active {
      background-color: #eff6ff !important; /* พื้นหลังฟ้าอ่อนนุ่มๆ */
      color: #1e52a8 !important; /* ข้อความสีน้ำเงินเข้ม */
    }
    
    .submenu-link.active i {
      color: #1e52a8 !important;
    }

    .submenu-link:hover:not(.active) {
      background-color: #f8fafc !important;
      color: #1e52a8 !important;
    }

    .submenu-link i {
      font-size: 16px !important;
      width: 20px !important;
      text-align: center !important;
    }
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

  const currentPage =
    window.location.pathname.split("/").pop() || "network.html";
  const toggleBtn = document.getElementById("knowledgeToggleBtn");
  const submenu = document.getElementById("knowledgeSubmenu");

  // ล้างสถานะเดิม
  document
    .querySelectorAll(".submenu-link")
    .forEach((l) => l.classList.remove("active"));
  document
    .querySelectorAll(".menu-btn")
    .forEach((b) => b.classList.remove("active"));

  // เช็คว่าเป็นหน้าในเครือ "แหล่งความรู้" หรือไม่
  const isKnowledge =
    currentPage.includes("network.html") ||
    currentPage.includes("video.html") ||
    currentPage.includes("law.html");

  if (isKnowledge) {
    toggleBtn.classList.add("active");
    submenu.classList.remove("collapsed");
    submenu.style.display = "grid";
    submenu.style.gridTemplateRows = "1fr";
    submenu.style.opacity = "1";

    if (currentPage.includes("network.html"))
      document.getElementById("side-learning").classList.add("active");
    if (currentPage.includes("video.html"))
      document.getElementById("side-video").classList.add("active");
    if (currentPage.includes("law.html"))
      document.getElementById("side-law").classList.add("active");
  } else {
    toggleBtn.classList.add("collapsed");
    submenu.classList.add("collapsed");
    submenu.style.gridTemplateRows = "0fr";
    submenu.style.opacity = "0";

    if (currentPage.includes("sustainability.html"))
      document.getElementById("side-sustainability").classList.add("active");
    if (currentPage.includes("faq.html"))
      document.getElementById("side-faq").classList.add("active");
    if (currentPage.includes("about.html"))
      document.getElementById("side-about").classList.add("active");
    if (currentPage.includes("reference.html"))
      document.getElementById("side-reference").classList.add("active");
  }
}

function toggleKnowledgeMenu() {
  const btn = document.getElementById("knowledgeToggleBtn");
  const menu = document.getElementById("knowledgeSubmenu");
  const isCollapsed = menu.classList.toggle("collapsed");
  btn.classList.toggle("collapsed");
  menu.style.gridTemplateRows = isCollapsed ? "0fr" : "1fr";
  menu.style.opacity = isCollapsed ? "0" : "1";
}

document.addEventListener("DOMContentLoaded", loadSidebar);
