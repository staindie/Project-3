(function () {
    var app = angular.module('myApp', []);

    app.controller('TabController', function () {

        $('.center').slick({
            centerMode: true,
            centerPadding: '150px',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        });

        function isScrolledIntoView(elem)
        {
            var $elem = $(elem);
            var $window = $(window);
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height() - 300;
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }
        function isScrolledIntoView2(elem)
        {
            var $elem = $(elem);
            var $window = $(window);
            var docViewTop = $window.scrollTop();
            var docViewBottom = docViewTop + $window.height();
            var elemTop = $elem.offset().top;
            var elemBottom = elemTop + $elem.height();
            return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
        }

        $(document).ready(function() {

            var navpos = $('#nav').offset();
            console.log(navpos.top);
            $(window).bind('scroll', function() {
                if ($(window).scrollTop() > navpos.top) {
                    $('#nav').addClass('fixed');
                }
                else {
                    $('#nav').removeClass('fixed');
                }

                if (isScrolledIntoView($('#home'))) {
                    $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                    $('a[href="#home"]').addClass("header__nav_item--active");//add a selected class
                }
                if (isScrolledIntoView($('#services'))) {
                    $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                    $('a[href="#services"]').addClass("header__nav_item--active");//add a selected class
                }
                if (isScrolledIntoView($('#portf'))) {
                    $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                    $('a[href="#portf"]').addClass("header__nav_item--active");//add a selected class
                }
                if (isScrolledIntoView($('#contacts'))) {
                    $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                    $('a[href="#contacts"]').addClass("header__nav_item--active");//add a selected class
                }

                $( ".timeline__item" ).each(function() {
                    if (isScrolledIntoView2(this)) {
                        $(this).removeClass('hidden-elem');
                        $(this).addClass('visible-elem');
                    }
                    else {
                        $(this).addClass('hidden-elem');
                        $(this).removeClass('visible-elem');
                    }
                });
            });

            $("#nav-tabs").find("a").click(function(){
                $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                $(this).addClass("header__nav_item--active");//add a selected class
            });

        });

        this.tab = 1;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };
    });
})();