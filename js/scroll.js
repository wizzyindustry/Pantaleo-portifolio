const scrollup = document.getElementById("scrollup");

//show the button when scrolling down 100px
window.addEventListener("scroll", () => {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollup.style.display = "block";
    } else {
        scrollup.style.display = "none";
    }
});

//scroll to top smothly
scrollup.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});