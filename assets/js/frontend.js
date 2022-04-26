$(document).ready(function() {

    /**
     * Thêm nút trở về top vào wrapper
     */
    $("#wrapper").append('<a href="#wrapper" id="return" alt="Trở về top"><i class="fas fa-arrow-up"></i></a>');

    /**
     * xử lý sự kiện scroll mouse
     */
    var defaultImage = $(".header__logo img").attr("src");
    var preScroll = 0;
    var banner = $(".banner");
    var header = $(".header__pc");
    var headerOffset = $(header).offset();
    var originHeaderClass = $(header).attr("class");
    var service = $(".service");
    var goal = $(".goal");
    var timeline = $(".timeline");
    var featureSetting = {
        delayAnimation: 0,
        iterationAnimation: 0,
        animation: [],
    }

    // header
    if ($(header).offset().top >= ($(banner).outerHeight() - $(header).outerHeight())) {
        $(header).attr("class", "header__pc");
        $(header).css({
            "box-shadow": "0 1px 2px rgb(0 0 0 / 9%)",
            "border-bottom": "1px solid #dbdbdb",
            "background": "var(--white-color)",
        });
        $(header).find(".header__logo img").attr("src", $(header).find(".header__logo img").attr("subsrc"));
        $(header).find(".header__form input").css("border", "1px solid #dbdbdb");
    } else {
        $(header).attr("class", originHeaderClass);
        $(header).css({
            "box-shadow": "",
            "border-bottom": "",
            "background": "transparent",
        });
        $(header).find(".header__logo img").attr("src", defaultImage);
        $(header).find(".header__form input").css("border", "");
    }

    $(window).scroll(function() {
        let bannerHeight = $(banner).outerHeight();
        // thay đổi phông nền và vị trí của header
        if ($(this).scrollTop() >= (bannerHeight - $(header).outerHeight())) {
            $(header).attr("class", "header__pc");
            $(header).css({
                "box-shadow": "0 1px 2px rgb(0 0 0 / 9%)",
                "border-bottom": "1px solid #dbdbdb",
                "background": "var(--white-color)",
            });
            $(header).find(".header__logo img").attr("src", $(header).find(".header__logo img").attr("subsrc"));
            $(header).find(".header__form input").css("border", "1px solid #dbdbdb");
        } else {
            $(header).attr("class", originHeaderClass);
            $(header).css({
                "box-shadow": "",
                "border-bottom": "",
                "background": "transparent",
            });
            $(header).find(".header__logo img").attr("src", defaultImage);
            $(header).find(".header__form input").css("border", "");
        }

        // Language
        if ($(this).scrollTop() >= ($(header).outerHeight())) {
            if ($(this).scrollTop() > preScroll) {
                // kéo chuột xuống -> ẩn header
                $(header).css({
                    "transform": "translateY(-100%)",
                    "transition": "transform 0.4s ease-out",
                });
                if ($("input[id='language-checkbox']").prop("checked") == true)
                    $("input[id='language-checkbox']").prop("checked", false);
            } else {
                // kéo chuột lên -> hiện header
                if ($(this).scrollTop() > bannerHeight) {
                    $(header).css({
                        "transform": "translateY(0%)",
                        "transition": "transform 0.4s ease-out",
                    });
                } else {
                    $(header).css({
                        "transform": "translateY(-100%)",
                        "transition": "transform 0.4s ease-out",
                    });
                    if ($("input[id='language-checkbox']").prop("checked") == true)
                        $("input[id='language-checkbox']").prop("checked", false);
                }
            }
        } else {
            $(header).css({
                "transform": "translateY(0%)",
                "transition": "transform 0.4s ease-out",
            });
        }

        // thêm hiệu ứng dành cho mục tiêu
        if ($(goal).length) {
            if ($(this).scrollTop() >= (Math.abs($(goal).position().top - ($(window).height() / 2)))) {
                $(".goal__vision").css({
                    "animation": "slideInLeft 1s ease-out both",
                });
                $(".goal__mission").css({
                    "animation": "slideInRight 1s ease-out both",
                });
            }
        }

        // thêm hiệu ứng cho timeline
        if ($(timeline).length) {
            if ($(this).scrollTop() >= (Math.abs($(timeline).position().top - ($(window).height() / 2)))) {
                let delay = 0;
                if ($(window).width() >= 1024) {
                    $(timeline).find(".timeline__item").each(function(index, item) {
                        $(item).css({
                            "--delay-time": `${delay}ms`,
                            "--animation-name": "fade-in"
                        });
                        $(item).find(".timeline__info").css({
                            "--delay-time": `${delay}ms`
                        });
                        if (index % 2 == 0) {
                            $(item).css({
                                "--after-animation-name": "scale-in-ver-top",
                            });
                            $(item).find(".timeline__info").css({
                                "animation-name": "slide-in-bottom",
                            });
                        } else {
                            $(item).css({
                                "--after-animation-name": "scale-in-ver-bottom",
                            });
                            $(item).find(".timeline__info").css({
                                "animation-name": "slide-in-top",
                            });
                        }
                        delay += 1000;
                    });
                }
            }
        }

        // hiện nút quay về đầu
        if ($(this).scrollTop() >= ($(window).height() * 1.5)) {
            if ($(this).scrollTop() < preScroll) {
                $("#wrapper #return").css({ "bottom": "60px" });
            } else {
                $("#wrapper #return").css({ "bottom": "" });
            }
        } else {
            $("#wrapper #return").css({ "bottom": "" });
        }

        // gán giá trị của scroll mouse trước đó;
        preScroll = $(this).scrollTop();
    });

    // tab
    tabs();

    //collapse
    collapse();

    // custom-button
    rippleButton();

});

//tabs
function tabs() {
    // default tab mark on active tab
    let activeTab = $(".tab__item.active");
    let activeLink = $(activeTab).find('.tab__link');

    $(activeLink).on("click", function(event) {
        event.preventDefault();
    });

    // change tab
    let tabs = $(".tab__item");
    if (tabs.length > 0) {
        $(tabs).each(function() {
            let tab = this;
            let link = $(this).find('.tab__link');
            let target = $(link).attr('href');
            $(link).on("click", function(e) {
                e.preventDefault();
                $(".tab__item.active").removeClass("active");
                $(".tab__pane.active").removeClass("active");

                $(tab).addClass("active");
                $(target).addClass("active");
            });
        });
    }
}

//collapse
function collapse(options = {}) {
    let collapses = $(".collapse");
    if (collapses.length > 0) {
        $(collapses).each(function() {
            let collapse = this;
            let isActive = $(this).hasClass("active");
            let toggle = $(collapse).find(".collapse__toggle");
            let content = $(collapse).find(".collapse__content");

            $(toggle).append('<span class="collapse__icon"></span>');

            if (isActive) $(content).show();
            else $(content).hide();

            $(toggle).on("click", function(e) {
                // default
                e.preventDefault();
                if ($(collapse).hasClass("active")) {
                    $(collapse).removeClass("active");
                    $(content).hide(300);
                } else {
                    $(collapse).addClass("active");
                    $(content).show(300);
                }

                //optional
                if (options != undefined) {
                    if (options.collapseAll == true) {
                        $(".collapse").not(collapse).each(function() {
                            if ($(this).hasClass("active")) $(this).removeClass("active");
                            $(this).find(".collapse__content").hide(300);
                        });
                    }
                }
            });
        });
    }
}

//buttoon
function rippleButton() {
    let buttons = $(".custom-button");
    $(buttons).each(function() {
        $(this).click(function(e) {
            // Remove any old one
            $(".ripple").remove();
            // Setup
            var posX = $(this).offset().left,
                posY = $(this).offset().top,
                buttonWidth = $(this).width(),
                buttonHeight = $(this).height();
            // Add the element
            $(this).prepend("<span class='ripple'></span>");
            // Make it round!
            if (buttonWidth >= buttonHeight) {
                buttonHeight = buttonWidth;
            } else {
                buttonWidth = buttonHeight;
            }
            // Get the center of the element
            var x = e.pageX - posX - buttonWidth / 2;
            var y = e.pageY - posY - buttonHeight / 2;
            // Add the ripples CSS and start the animation
            $(".ripple").css({
                width: buttonWidth,
                height: buttonHeight,
                top: y + 'px',
                left: x + 'px'
            }).addClass("rippleEffect");
        });
    });
}

// mobile menu
(function() {
    let showNav = false;
    let showMenu = [];
    let toggleBtn = $("[data-toggle='menu']");
    let navbar = $(".navbar");
    let navbarList = $(navbar).find(".navbar__list");
    let navbarListHeight = $(navbarList).height();
    let navbarItems = $(navbarList).find(".navbar__item");


    initMobileMenu();
    initSubMenu();
    if ($(window).width() <= 739 || $(window).resize() <= 739) {
        initMobileMenu();
        $(toggleBtn).on("click", function(e) {
            showNav = !showNav;
            initMobileMenu();
            $(toggleBtn).find(".toggle__default").toggle();
            $(toggleBtn).find(".toggle__close").toggle();
        });
    }

    function initMobileMenu() {
        if (showNav) {
            $(navbar).css({ "height": navbarListHeight + "px" });
        } else {
            $(navbar).css({ "height": 0 + "px" });
        }

    }

    function initSubMenu() {
        $(navbarItems).each(function(index, item) {
            showMenu[index] = false;
            let subMenu = $(item).find(".navbar__menu");
            if ($(window).width() >= 1024) {
                $(item).on("touchstart mouseenter", function() {
                    if (!$(this).hasClass("show")) $(this).addClass("show");
                });
                $(item).on("mouseleave touchmove", function() {
                    if ($(this).hasClass("show")) $(this).removeClass("show");
                });
            }
            if ($(window).width() <= 739) {
                if (subMenu.length > 0) {
                    if (showMenu[index]) {
                        $(this).addClass("show");
                        $(subMenu).show(300);
                    } else {
                        $(this).removeClass("show");
                        $(subMenu).hide(300);
                    }
                }
                $(item).on("click", function(e) {
                    if (subMenu.length > 0) {
                        if (!showMenu[index]) {
                            $(this).addClass("show");
                            $(subMenu).show(300);
                            showMenu[index] = true;
                        } else {
                            $(this).removeClass("show");
                            $(subMenu).hide(300);
                            showMenu[index] = false;
                        }
                    }
                });
            }
        });
    }
})();