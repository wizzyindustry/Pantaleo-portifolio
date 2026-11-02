(function () {
    "use strict";

    /* ================= SIDEBAR (mobile) ================= */
    const sidebar = document.getElementById("sidebar");
    const backdrop = document.getElementById("sidebarBackdrop");
    const menuBtn = document.getElementById("menuBtn");

    if (menuBtn && sidebar && backdrop) {
        const openSidebar = () => {
            sidebar.classList.add("open");
            backdrop.classList.add("show");
        };
        const closeSidebar = () => {
            sidebar.classList.remove("open");
            backdrop.classList.remove("show");
        };
        menuBtn.addEventListener("click", openSidebar);
        backdrop.addEventListener("click", closeSidebar);
    }

    /* ================= SIDEBAR ACTIVE STATE ================= */
    const currentPath = window.location.pathname;
    document.querySelectorAll(".sidebar-nav a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && currentPath.endsWith(href.replace(/^\//, ""))) {
            link.classList.add("active");
        }
    });

    /* ================= ANIMATED STAT COUNTERS ================= */
    const counters = document.querySelectorAll(".stat-value[data-count]");
    const animateCounter = (el) => {
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(target * eased).toLocaleString();
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    if (counters.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });
        counters.forEach(c => observer.observe(c));
    }

    /* ================= CHART BAR GROW ================= */
    const bars = document.querySelectorAll(".chart-bar");
    if (bars.length) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.height = entry.target.dataset.target || entry.target.style.height;
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        bars.forEach(bar => {
            const target = bar.style.height;
            bar.style.height = "0";
            bar.dataset.target = target;
            barObserver.observe(bar);
        });
    }

    /* ================= TOAST NOTIFICATIONS ================= */
    const toast = document.getElementById("toast");
    const toastText = document.getElementById("toastText");
    let toastTimer = null;

    window.showToast = function (message, success = true) {
        if (!toast) return;
        toastText.textContent = message;
        toast.querySelector("i").className = success ? "uil uil-check-circle" : "uil uil-times-circle";
        toast.querySelector("i").style.color = success ? "var(--admin-green)" : "var(--admin-red)";
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
    };

    /* ================= SETTINGS FORM ================= */
    const settingsForm = document.getElementById("settingsForm");
    if (settingsForm) {
        settingsForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const newPass = document.getElementById("newPass");
            const confirmPass = document.getElementById("confirmPass");
            if (newPass.value && newPass.value !== confirmPass.value) {
                showToast("Passwords do not match", false);
                return;
            }
            const profile = {
                name: document.getElementById("fullName").value,
                role: document.getElementById("role").value,
                email: document.getElementById("email").value,
                bio: document.getElementById("bio").value,
                notifEmail: !!document.getElementById("notifEmail").checked,
                publicProfile: !!document.getElementById("publicProfile").checked,
                maintenanceMode: !!document.getElementById("maintenanceMode").checked
            };
            localStorage.setItem("adminProfile", JSON.stringify(profile));
            showToast("Settings saved successfully");
            newPass.value = confirmPass.value = "";
        });
    }

    /* ================= TOGGLES ================= */
    document.querySelectorAll(".toggle input").forEach(input => {
        input.addEventListener("change", () => {
            showToast(`${input.closest(".toggle-item").querySelector("h4, b").textContent} updated`);
        });
    });

    /* ================= LOGOUT ================= */
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            if (!confirm("Are you sure you want to log out?")) e.preventDefault();
        });
    }

    /* ================= LOAD SAVED PROFILE ================= */
    const saved = JSON.parse(localStorage.getItem("adminProfile") || "null");
    if (saved && settingsForm) {
        const set = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val;
        };
        set("fullName", saved.name);
        set("role", saved.role);
        set("email", saved.email);
        set("bio", saved.bio);
    }

    // live greeting date in topbar
    const topTitle = document.querySelector(".topbar-title p");
    if (topTitle && topTitle.textContent.startsWith("Welcome")) {
        const now = new Date();
        const hour = now.getHours();
        const greet = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
        topTitle.textContent = `${greet}, Emanuel`;
    }
})();