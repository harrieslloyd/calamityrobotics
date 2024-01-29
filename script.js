window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 650) {
      opacity = 1 - currentScroll / 650;
    } else {
      opacity = 0;
    }
    document.getElementById('model').style.opacity = opacity;
  });