const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", navHighlighter);

function navHighlighter() {

  let scrollY = window.pageYOffset;

  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    console.log(sectionId);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelector(".service-detail__menu a[href*=" + sectionId + "]").classList.add("current");
    } else {
      document.querySelector(".service-detail__menu a[href*=" + sectionId + "]").classList.remove("current");
    }
  });
}
