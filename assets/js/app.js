$(function() { /* jquery вмикається після повного завантаження документу */

    /* Nav Toggle on mobile
    ====================================*/

    let navToggle = $('#navToggle');
    let nav = $('#nav');

    navToggle.on('click', function(event) { /* Приводимо в дію бургер*/
        event.preventDefault();

        $("body").toggleClass('show-nav'); /* Міняємо колір шапки, який прив'язаний до цього класу і забороняємо скрол */
        $(this).toggleClass('active'); /* Приводимо в дію бургер */
        nav.toggleClass('show');/* Показуємо навігацію */
    });

    $(window).on("resize", function() { /* При перевертанні девайсу приховуємо меню і повертаємо по дефолту бургер */
        $("body").removeClass('show-nav');
        navToggle.removeClass('active');
        nav.removeClass('show');
    });

    let intro = $("#intro");
    let header = $("#header");
    let introH = intro.innerHeight(); /* Висота з врахуванням padding. Метод                                       height працює без врахування padding */
    let headerH = header.innerHeight();
    let scrollTop = $(window).scrollTop();

    /* Header class on scroll
    ====================================*/

    headerScroll(); /* Викликаємо цю функцію одразу після завантаження сторінки */

    $(window).on("scroll resize", function() {
        headerScroll();
    });

    function headerScroll() {
        introH = intro.innerHeight();
        headerH = header.innerHeight();

        let scrollTop = $(this).scrollTop();

        if( scrollTop >= (introH - headerH) ) {
            header.addClass("header--dark");
        } else {
            header.removeClass("header--dark");
        }
    } /* Тиким чином при зміненні розміру блоку intro буде відслідковуватись його висота і спрацювання класу буде коректним. Також при обновленні сторінки беду видаватись данний клас */


    /* Smooth Scroll to sections
    ====================================*/

    $("[data-scroll]").on("click", function(event) {
        event.preventDefault();

        let scrollEl = $(this).data("scroll");
        let scrollElPos = $(scrollEl).offset().top;

        $("body").removeClass('show-nav');
        navToggle.removeClass('active'); /* Бургер неактивний */
        nav.removeClass('show'); /* При кліку на елемент навігації приховуємо навігацію */

        $("html, body").animate({ /* Робимо виборку по елементам, щоб                                     підтримувалось у всіх браузерах*/
            scrollTop: scrollElPos - headerH
        }, 500)
    });

    /* ScrollSpy
    ====================================*/
    let windowH = $(window).height();

    scrollSpy(scrollTop);

    $(window).on("scroll", function() {
        let scrollTop = $(this).scrollTop();

        scrollSpy(scrollTop);
    });

    function scrollSpy(scrollTop) {
        $("[data-scrollspy]").each(function() { /* Each робить вибірку для                                               перевірки позицій елемента */
            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;
            sectionOffset = sectionOffset - (windowH * 0.33333);

            if(scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');/* Спочатку забираємо у всіх клас */
                $('#nav [data-scroll="' + sectionId + '"]').addClass("active");
            }

            if(scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');/* Для того, щоб пропадала підсвітка на верху сторінки */
            }

        });
    }

    /* Modal
    ====================================*/
    $('[data-modal]').on('click', function(event) {
        event.preventDefault();

        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() { /* Затримка */
            $(modal).find('.modal__content').css({
                transform: 'scale(1)',
                opacity: '1'
            });
        }, 100);


    });

    $('[data-modal-close]').on('click', function(event) {
        event.preventDefault();
        let modal = $(this).parents('.modal');
        modalClose(modal);
    });

    $('.modal').on('click', function() { /* Закриваємо модальне вікно по кліку                                        на маску */
        let modal = $(this);
        modalClose(modal);
    });

    $('.modal__content').on('click', function(event) { /* Модальне вікно не закривається, якщо ми на нього клікаємо  */
        event.stopPropagation();
    });

    function modalClose(modal) { /* Виносимо дію в окрему функцію, щоб її не дублювати зверху */
        $(modal).find('.modal__content').css({ /* Повертаємо стан модального вікна за замовчуванням */
            transform: 'scale(0.5)',
            opacity: '0'
        });

        setTimeout(function() { /* Затримка при закритті модального вікна */
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);
    }



    /* Slick slider https://kenwheeler.github.io/slick/
    ====================================*/

    /* Intro Slider */
    let introSlider = $("#introSlider");

    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000

    });

    $("#introSliderPrev").on("click", function(event) { /* Для прокрутки по кнопке */
        event.preventDefault();
        introSlider.slick("slickPrev");
    });

    $("#introSliderNext").on("click", function(event) { /* Для прокрутки по кнопке */
        event.preventDefault();
        introSlider.slick("slickNext");
    });


    /* Reviews Slider */
    let reviewsSlider = $("#reviewsSlider");

    reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        fade: false,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 1000
    });


    /* Aos.js https://github.com/michalsnik/aos
    ====================================*/

// You can also pass an optional settings object
// below listed default settings
AOS.init({
  disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
  initClassName: 'aos-init', // class applied after initialization
  animatedClassName: 'aos-animate', // class applied on animation
  useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
  disableMutationObserver: false, // disables automatic mutations' detections (advanced)
  debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
  throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 80, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 700, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

});







});


