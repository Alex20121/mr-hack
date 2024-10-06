document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".buy-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      alert("Thank you for your purchase!");
    });
  });

  // Carousel functionality
  const carouselItems = document.querySelectorAll(".carousel-item");
  let currentIndex = 0;

  function showNextItem() {
    carouselItems[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % carouselItems.length;
    carouselItems[currentIndex].classList.add("active");
  }

  setInterval(showNextItem, 3000);
});
