// navbar.js
const navbarHTML = `
  <style>
    /* CSS พื้นฐานสำหรับ Navbar (Desktop) */
    .navbar {
      height: 70px;
      background: #fff;
      padding: 0 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #e2e8f0;
      position: sticky;
      top: 0;
      z-index: 1000; /* ดันให้อยู่บนสุดเสมอ */
      box-shadow: 0 2px 10px rgba(0,0,0,0.02);
      box-sizing: border-box;
      font-family: "Sarabun", "Inter", sans-serif;
    }
    
    .nav-left img { 
      height: 35px; 
      object-fit: contain; 
    }
    
    .nav-menu { 
      display: flex; 
      gap: 24px; 
      margin: 0;
      padding: 0;
    }
    
    .nav-link { 
      color: #64748b; 
      text-decoration: none; 
      font-size: 15px; 
      font-weight: 600; 
      display: flex; 
      align-items: center; 
      gap: 8px; 
      transition: 0.2s; 
    }
    
    .nav-link:hover, .nav-link.active { 
      color: #1e52a8; 
    }

    .hamburger-btn {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      flex-direction: column;
      gap: 5px;
      z-index: 1001;
    }

    .hamburger-btn span {
      display: block;
      width: 24px;
      height: 2px;
      background-color: #333;
      border-radius: 2px;
      transition: all 0.25s ease;
    }

    .hamburger-btn.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger-btn.open span:nth-child(2) { opacity: 0; }
    .hamburger-btn.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

    /* ===== MOBILE ONLY (ปรับ UI ให้พอดีและสวยงามยิ่งขึ้น) ===== */
    @media (max-width: 768px) {
      .navbar {
        position: relative;
        padding: 10px 20px !important;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
      }

      .nav-left img { height: 32px !important; }
      
      .hamburger-btn { display: flex; }

      .nav-menu {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #ffffff;
        flex-direction: column;
        padding: 12px 0; /* เปลี่ยน padding รอบเมนู */
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08); /* เงาฟุ้งๆ */
        border-top: 1px solid #e2e8f0;
      }

      .nav-menu.open { display: flex; }

      /* ลบ class "pill-link" ที่เคยเพิ่มไว้ และใช้ .nav-link แทน */
      .nav-menu .nav-link {
        padding: 14px 20px; /* ระยะห่างภายในเมนูหลัก */
        font-size: 15px;
        color: #475569;
        border-radius: 10px;
        margin: 0 16px 4px; /* ระยะห่างระหว่างเมนูหลัก */
        transition: background-color 0.2s ease, color 0.2s ease;
      }
      
      .nav-menu .nav-link:hover {
        background-color: #f8fafc;
        color: #1e52a8;
      }

      .nav-menu .nav-link.active { 
        background-color: #eff6ff; /* พื้นหลังสีฟ้าอ่อนมาก */
        color: #1e52a8; 
        font-weight: 700; 
      }

      .nav-menu .nav-link i { 
        width: 24px; 
        text-align: center; 
        font-size: 16px; 
        color: inherit; 
      }

      /* ปรับปรุง CSS สำหรับเมนูย่อย (Submenu) บนมือถือ */
      .submenu-wrapper {
        padding: 0 16px 4px 16px; /* ระยะห่างของsubmenu container */
        background-color: #ffffff;
        display: none; /* ซ่อนไว้ก่อน */
      }

      /* แสดงsubmenu เมื่อเมนูหลักถูกเลือก */
      .submenu-wrapper.collapsed {
        display: flex;
        flex-direction: column;
        gap: 2px; /* ระยะห่างระหว่างเมนูย่อย */
      }

      .submenu-inner {
          padding: 0; /* ลบ padding เดิมออก */
          border-left: 2px solid #e2e8f0; /* เพิ่มเส้นคั่นซ้าย */
          margin-left: 12px; /* ระยะห่างจากขอบซ้าย */
      }

      .submenu-link {
        padding: 12px 16px 12px 12px; /* ระยะห่างภายในเมนูย่อย */
        font-size: 14px; /* ขนาดตัวอักษรเล็กลง */
        color: #64748b;
        text-decoration: none;
        display: flex;
        align-items: center;
        gap: 12px;
        border-radius: 8px; /* เปลี่ยนจากเส้นคั่นเป็นขอบมน */
        margin: 0; /* ลบ margin เดิมออก */
      }

      .submenu-link:hover {
        background-color: #f1f5f9; /* สีเทาอ่อนตอนแตะ */
        color: #1e52a8;
      }

      /* สไตล์เมื่อเมนูย่อยถูกเลือก (Active) */
      .submenu-link.active {
        background-color: #dbeafe; /* พื้นหลังสีฟ้าอ่อน */
        color: #1e52a8;
        font-weight: 700;
      }

      .submenu-link i {
        width: 20px;
        text-align: center;
        font-size: 14px;
        color: inherit;
      }
    }
  </style>

  <header class="navbar">
    <div class="nav-left">
      <img
        src="images/logo-impact.svg"
        alt="IMPACT"
        onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/IMPACT_Muang_Thong_Thani_Logo.png/800px-IMPACT_Muang_Thong_Thani_Logo.png'"
      />
    </div>

    <!-- Hamburger (แสดงเฉพาะมือถือ) -->
    <button class="hamburger-btn" id="hamburgerBtn" aria-label="เปิดเมนู">
      <span></span><span></span><span></span>
    </button>

    <div class="nav-menu" id="navMenu">
      <a href="index.html" class="nav-link" id="nav-index">
        <i class="fas fa-home"></i> หน้าหลัก
      </a>
      <a href="calculator.html" class="nav-link" id="nav-calculator">
        <i class="fas fa-leaf"></i>
        <span><span style="color: #28a745">S</span>ustainable Event Design</span>
      </a>
      <a href="event.html" class="nav-link" id="nav-event">
        <i class="fas fa-images"></i>
        <span><span style="color: #f26f21">E</span>vent Succession Showcase</span>
      </a>
      <!-- ลบ class "collapsed" ออกจาก menu-btn และ submenu-wrapper บนมือถือ -->
      <a href="network.html" class="nav-link" id="nav-network">
        <i class="fas fa-network-wired"></i>
        <span><span style="color: #2354a2">N</span>etwork for Knowledge</span>
      </a>
    </div>
  </header>
`;

// ฟังก์ชันสำหรับฝัง Navbar เข้าไปในหน้าเว็บ
function loadNavbar() {
  // 1. นำโค้ด Navbar ไปแทรกไว้บนสุดของ body
  document.body.insertAdjacentHTML("afterbegin", navbarHTML);

  // 2. เช็คว่าตอนนี้อยู่หน้าไหน เพื่อไฮไลต์ (Active) เมนูนั้น
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (currentPage.includes("index"))
    document.getElementById("nav-index").classList.add("active");
  if (currentPage.includes("calculator") || currentPage.includes("design"))
    document.getElementById("nav-calculator").classList.add("active");
  if (
    currentPage.includes("event") ||
    currentPage.includes("motor-expo") ||
    currentPage.includes("all-events")
  )
    document.getElementById("nav-event").classList.add("active");
  if (
    currentPage.includes("network") ||
    currentPage.includes("video") ||
    currentPage.includes("law") ||
    currentPage.includes("sustainability") ||
    currentPage.includes("faq") ||
    currentPage.includes("about") ||
    currentPage.includes("reference")
  )
    document.getElementById("nav-network").classList.add("active");

  // 3. ผูกคำสั่งเปิด-ปิด Hamburger Menu สำหรับมือถือ
  const btn = document.getElementById("hamburgerBtn");
  const menu = document.getElementById("navMenu");

  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    menu.classList.toggle("open");
  });
}

// สั่งให้โหลด Navbar อัตโนมัติเมื่อหน้าเว็บพร้อม
document.addEventListener("DOMContentLoaded", loadNavbar);
