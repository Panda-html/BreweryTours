window.addEventListener("load", function () {
  $(".carousel").addClass("loadSlider");
});

jQuery(function () {
  /*home*/

  // let primaryScreenCarousel = document.querySelector('.slider-container') !== null;
  // var mainCarousel;
  // if (primaryScreenCarousel) {
  //     mainCarousel = front.newSlider('.slider-container', {
  //         cellAlign: 'left',
  //         contain: false,
  //         pageDots: true,
  //         // autoPlay: true,
  //         // autoPlay: 5000,
  //         verticalCells: true,
  //         prevNextButtons: true
  //     });
  // }
  // let productSlider = document.querySelector('.product-carousel') !== null;
  var galleryThumbs = new Swiper('.gallery-thumbs', {
    spaceBetween: 10,
    slidesPerView: 5,
    touchRatio: 0,
    loop: true,
    direction: 'vertical',
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var galleryTop = new Swiper('.gallery-top', {
    spaceBetween: 10,
    zoom: true,
    loop: true,
    loopedSlides: 5, //looped slides should be the same
    navigation: {
      nextEl: '.product-next',
      prevEl: '.product-prev',
    },
    thumbs: {
      swiper: galleryThumbs,
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    breakpoints: {
      // when window width is >= 320px
      767: {
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
      },
    }
  });


  
  var swiper = new Swiper('.product-recommendations', {
    slidesPerView: 3,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.recommendations-next',
      prevEl: '.recommendations-prev',
    },
    clickable: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      575: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      767: {
        slidesPerView: 3,
        spaceBetween: 20
      },
    }
  });
});