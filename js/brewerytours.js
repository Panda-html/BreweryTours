let front = {
  hamburger: $('.hamburger'),
  nav: $('.navbar'),
  primaryNav: $('.primary-navigation'),
  cart: $('.header-cart'),
  slider_options_default: {
      wrapAround: true,
      pageDots: false,
      prevNextButtons: true,
      autoPlay: false,
      cellAlign: 'left',
      contain: true
  },

  init: function () {
      this.events();
      this.headerScroll();
      if (window.matchMedia("(min-width: 992px)").matches) {
        new fullpage('#fullpage', {
            licenseKey: 'xxxxxxxx-xxxxxxxx-xxxxxxxx-xxxxxxxx',
            // responsiveHeight: 992,
            anchors: ['app-section-1', 'app-section-2', 'app-section-3', 'app-section-4',
                'app-section-5', 'footer'],
            paddingTop: '80px',
            // normalScrollElements: '.footer',
            slidesNavigation: false,
            slidesToSections: true
        });
      } else {
        null
      }
  },

  newSlider: function (selector, options) {
      options = (options !== undefined) ? Object.assign({}, this.slider_options_default, options) : this.slider_options_default;
      // let carousel = new Flickity(document.querySelector(selector), options);
      return new Flickity(document.querySelector(selector), options);
  },

  headerScroll: function () {
      if ($(window).scrollTop() > 5) {
          $('.header').addClass('fixed');
      } else {
          $('.header').removeClass('fixed');
      }
  },

  toggleNav: function () {
      if (!this.hamburger.hasClass('open')) {
          this.hamburger.addClass('open');
          this.nav.toggleClass('active');
          this.primaryNav.toggleClass('active')
          this.cart.toggleClass('active')
      } else {
          this.hamburger.removeClass('open');
          this.nav.toggleClass('active');
          this.primaryNav.toggleClass('active')
          this.cart.toggleClass('active')
      }
  },
  navMouseOver: function () {
      $(".primary-navigation .menu-item-has-children").hover(function () {
          $("body").addClass('BackDropped');
      }, function () {
          $("body").removeClass('BackDropped');
      });
  },

  toggleHeaderDrop: function () {
      if (!this.header_drop.hasClass('is-active')) {
          this.header_drop.addClass("is-active");
      } else {
          this.header_drop.removeClass("is-active");
      }
  },

  copyText: function () {
      let copyText = document.getElementById("myInput");
      copyText.select();
      document.execCommand("copy");
  },
  openTab: function (element, tabName, parent) {
      let i, tab_content, tab_links;

      tab_content = $(element).closest(parent).find('.tab-content');

      for (i = 0; i < tab_content.length; i++) {
          tab_content[i].style.display = "none";
      }

      tab_links = $(element).closest('.tabs-ul').find('.tab-links');

      for (i = 0; i < tab_links.length; i++) {
          tab_links[i].className = tab_links[i].className.replace(" active", "");
      }

      document.getElementById(tabName).style.display = "block";
      $(element).addClass('active');
  },
  hoverTab: function (el, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    el.currentTarget.className += " active";
  },

  events: function () {
      let self = this;

      self.navMouseOver();
      $(window).on('scroll', function () {
          self.headerScroll();
      });

      $(document).on('click', '.hamburger', function () {
          self.toggleNav();
      });

      $(document).on('click', '.coupon-btn', function () {
          self.copyText();
      });
      $(document).on('click', '.header-nav__link', function (e) {
          e.preventDefault();
          console.log($(window).width());
          if ($(window).width() + 16 < 991) {
              $(this).toggleClass('js-link-active');
          }
      });


      $(document).on('click', '.footer-navigation .menu-item-has-children > a', function (e) {
          e.preventDefault();
          if ($(window).width() + 16 < 991) {
              $(this).toggleClass('active');
          }
      });

      $('.js-scrollLink').on('click', function () {

          let target = this.hash;
          let $target = $(target);
          $('html, body').stop().animate({
              'scrollTop': $target.offset().top - 80
          }, 500, 'swing');
      });

      $(".scroll-downs").click(function () {
          $('html,body').animate({
                  scrollTop: $(".second").offset().top - 120
              },
              'slow');
      });
  }
};

let modal = {
  closeButton: $('.modal__close'),
  closeOverlay: $('.modal'),
  can: 1,
  init: function () {
      this.events();
  },
  openModal: function (id) {
      let modalWindow = $(id);
      modalWindow.fadeIn();
      modalWindow.find('.modal__content').removeClass('animate-away').addClass('animate-in');

      $('body, html').addClass('active');
  },

  closeModal: function (id) {
      let modalWindow = $(id);
      modalWindow.find('.modal__content').removeClass('animate-in').addClass('animate-away');
      modalWindow.fadeOut();
      $('body, html').removeClass('active');
  },

  events: function () {

      $(document).on('click', '.modalTrigger', function (e) {
          e.preventDefault();
          let self = $(this),
              target = self.attr('data-modal');
          modal.openModal(target);

      });

      $(document).on('click', '.modal', function (event) {
          let self = '#' + $(this).attr('id');
          if (event.target.className == 'modal__body') {
              modal.closeModal(self);
          }
      });

      $(document).on('click', '.modal__close', function () {
          let self = '#' + $(this).closest('.modal').attr('id');
          modal.closeModal(self);
      });
  }
};


jQuery(function () {
  front.init();
  modal.init();


  // Hide Header on on scroll down
  let didScroll;
  let lastScrollTop = 0;
  let delta = 5;
  let navbarHeight = $('.header').outerHeight();

  $(window).scroll(function (event) {
      didScroll = true;
  });

  setInterval(function () {
      if (didScroll) {
          hasScrolled();
          didScroll = false;
      }
  }, 250);

  function hasScrolled() {
      let st = $(this).scrollTop();

      // Make sure they scroll more than delta
      if (Math.abs(lastScrollTop - st) <= delta)
          return;

      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight) {
          // Scroll Down
          $('.header').removeClass('--down').addClass('--up');
      } else {
          // Scroll Up
          if (st + $(window).height() < $(document).height()) {
              $('.header').removeClass('--up').addClass('--down');
          }
      }

      lastScrollTop = st;
  }


});

$(function () {
  let detectInview = function () {
      let wh = $(window).height();
      let scrollTop = $(window).scrollTop();

      $('.detect-inview').each(function () {
          let el = $(this);
          if (el.offset().top - wh + 300 <= scrollTop && scrollTop <= el.offset().top + el.height()) {
              el.addClass('to-animate');

          } else {
              el.removeClass('to-animate');
          }
      });

  }
  detectInview();
  $(window).on('scroll', function () {
      detectInview();
  });
});

$(function(){
  $("#header").load("header.html");
  $("#footer").load("footer.html");
});

document.addEventListener("DOMContentLoaded", function (event) {

    let childrenItem = document.querySelectorAll('.menu-item-has-children > a');
    for (let i = 0; i < childrenItem.length; i++) {
        var btn = document.createElement("BUTTON");   // Create a <button> element
        btn.className = "nav-btn";                    // add class
        btn.innerHTML = `<i class="icon-icon-arrow"></i>`;
        childrenItem[i].appendChild(btn);
    }
});

$(document).on('click', '.nav-btn', function (e) {
    e.preventDefault();
    var navTitle = document.createElement("p");
    navTitle.className = "nav-title";        
    navTitle.innerHTML = '<i class="icon-icon-arrow"></i>' + $(this).parent().text();
    $(this).parent().parent().find('.submenu').prepend(navTitle);
    if (!$(this).parent().parent().find('.submenu').hasClass('menuOpen')) {
        $(this).parent().parent().find('.submenu').addClass('menuOpen');
    } else {
        $(this).parent().parent().find('.submenu').removeClass("menuOpen");
    }
});

$(document).on('click', '.nav-title', function (e) {
    e.preventDefault();
    if ($(this).parent().hasClass('menuOpen')) {
        $(this).parent().removeClass("menuOpen");
        $(this).remove();
    }
});

if (window.matchMedia("(min-width: 992px)").matches) {
    $('.menu-item-has-children').hover(
        function() {
            $('.submenu').fadeIn('fast');
        },function() {
            $('.submenu').fadeOut('fast');
        }
    );
  } else {
    null
  }

//   $(document).ready(function() {
// 	$('#pagepiling').pagepiling();
// });