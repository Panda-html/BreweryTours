window.addEventListener("load", function () {
  $(".carousel").addClass("loadSlider");
});

jQuery(function () {
  /*home*/
  let primaryScreenCarousel = document.querySelector('.slider-container') !== null;
  var mainCarousel;
  if (primaryScreenCarousel) {
      mainCarousel = front.newSlider('.slider-container', {
          cellAlign: 'left',
          contain: false,
          pageDots: true,
          // autoPlay: true,
          // autoPlay: 5000,
          verticalCells: true,
          prevNextButtons: true
      });
  }
});