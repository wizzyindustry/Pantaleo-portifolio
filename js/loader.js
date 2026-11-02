//LOADING PAGE ANIMATION
window.addEventListener("load", () => {

    const name = document.querySelector(".name");
    const intro = document.querySelector(".intro-loader");

    setTimeout(() => {
        name.style.opacity = "1";
        name.style.transform = "translateY(0)";
    }, 300);

    setTimeout(() => {
        intro.style.top = "-150%";
    }, 2000);

});
