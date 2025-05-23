class JeanHeader extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["opacity"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.loadHeader();
    }
  }

  connectedCallback() {
    this.loadHeader();
  }

  async loadHeader() {
    const opacity = this.getAttribute("opacity") || "false";

    try {
      // comm.css 불러오기
      const commRes = await fetch("../../css/common.css");
      const commCss = await commRes.text();

      // header.css 불러오기
      const headerRes = await fetch("../../css/header.css");
      const headerCss = await headerRes.text();

      // style 태그 생성 및 두 CSS를 결합
      const style = document.createElement("style");
      style.textContent = `${commCss}\n${headerCss}`;

      // header 태그 생성 및 내용 삽입
      const header = document.createElement("header");
      header.id = "header";
      header.innerHTML = `
        <div class="content-center">
          <h1 class="logo"><a href="/pages/main/main.html">청바지</a></h1>
          <div class="mobile-button">
              <div class="bar"></div>
              <div class="bar"></div>
              <div class="bar"></div>
          </div>
          <nav id="main-nav">
            <ul>
              <li><a href="/pages/contest/contest.html">공모전</a></li>
              <li><a href="/pages/policy/policy-list.html">청년정책</a></li>
              <li><a href="/pages/license/license.html">자격증</a></li>
              <li><a href="/pages/community/community-list.html">커뮤니티</a></li>
            </ul>
          </nav>
          <nav id="auth-menu">
            <ul>
              <li class="nav-guest"><a href="/pages/login/login.html">로그인</a></li>
              <li class="nav-guest"><a href="/pages/sign-up/sign-up.html">회원가입</a></li>
              <li class="nav-user"><a href="/pages/my-page/my-page.html">마이페이지</a></li>
              <li class="nav-user logout"><a href="#">로그아웃</a></li>
            </ul>
          </nav>
          <nav id="mobile-menu">
            <ul>
              <li class="nav-guest"><a href="/pages/login/login.html">로그인</a></li>
              <li class="nav-guest"><a href="/pages/sign-up/sign-up.html">회원가입</a></li>
              <li class="nav-user"><a href="/pages/my-page/my-page.html">마이페이지</a></li>
              <li><a href="/pages/contest/contest.html">공모전</a></li>
              <li><a href="/pages/policy/policy-list.html">청년정책</a></li>
              <li><a href="/pages/license/license.html">자격증</a></li>
              <li><a href="/pages/community/community-list.html">커뮤니티</a></li>
              <li class="nav-user logout"><a href="#">로그아웃</a></li>
            </ul>
          </nav>
        </div>
      `;

      // ✅ 기존 shadow DOM 비우기
      this.shadow.innerHTML = "";

      // Shadow DOM에 style과 header 삽입
      this.shadow.appendChild(style);
      this.shadow.appendChild(header);

      // scroll 이벤트 등록 (render 완료 후)
      this.setupScrollListener(opacity);
      // 햄버거 애니메이션 이벤트
      this.hamburgerHandler();
      // 로그인 유무
      this.loginHandler();
      // 로그아웃
      this.logoutHandler();
    } catch (error) {
      console.error("JeanHeader 로딩 실패:", error);
    }
  }

  // scroll 에 따라 fix 이벤트
  setupScrollListener(opacity) {
    const nav = this.shadow.querySelector("#header");

    if (!nav) return;
    if (opacity === "false") {
      nav.classList.add("header-white");
      return;
    }
    document.addEventListener("scroll", () => {
      const sPos = document.documentElement.scrollTop;
      if (sPos > 200) nav.classList.add("header-white");
      else nav.classList.remove("header-white");
    });
  }

  // 햄버거 애니메이션 이벤트
  hamburgerHandler() {
    const mobileBtn = this.shadow.querySelector(".mobile-button");
    const mobileMenu = this.shadow.querySelector("#mobile-menu");
    mobileBtn.addEventListener("click", () => {
      mobileBtn.classList.toggle("cross");
      mobileMenu.classList.toggle("active");
    });
  }

  loginHandler() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userLis = this.shadow.querySelectorAll(".nav-user");
    const guestLis = this.shadow.querySelectorAll(".nav-guest");

    userLis.forEach(el => el.classList.toggle("hidden", !isLoggedIn));
    guestLis.forEach(el => el.classList.toggle("hidden", isLoggedIn));
  }

  logoutHandler() {
    const logoutLis = this.shadow.querySelectorAll(".logout");
    logoutLis.forEach(el => {
      el.addEventListener("click", e => {
        e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("loginProvider");
        localStorage.removeItem("userType");
        this.loginHandler();
        window.location.href = "/pages/main/main.html";
      });
    });
  }
}

customElements.define("jean-header", JeanHeader);
