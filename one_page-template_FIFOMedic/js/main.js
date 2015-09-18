$(document).ready(function() {
    //sticky menu
    $(document).ready(function() {
        var stickyNavTop = $('.navbar').offset().top;

        var stickyNav = function() {
            var scrollTop = $(window).scrollTop();

            if (scrollTop > stickyNavTop) {
                $('.navbar').addClass('sticky');
            } else {
                $('.navbar').removeClass('sticky');
            }
        };

        stickyNav();

        $(window).scroll(function() {
            stickyNav();
        });
    });;
    (function($) {
        $('.swipebox-video').swipebox({
            useCSS: true, // false will force the use of jQuery for animations
            useSVG: true, // false to force the use of png for buttons
            initialIndexOnArray: 0, // which image index to init when a array is passed
            hideCloseButtonOnMobile: false, // true will hide the close button on mobile devices
            hideBarsDelay: 3000, // delay before hiding bars on desktop
            videoMaxWidth: 1140, // videos max width
            beforeOpen: function() {}, // called before opening
            afterOpen: null, // called after opening
            afterClose: function() {}, // called after closing
            loopAtEnd: false // true will return to the first image after the last image is reached
        });
    })(jQuery);

    //nav bar Click to scroll Target section animation js
    $(function() {
        $('.navbar-right a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    });

    //pricing table switching js int
    jQuery(document).ready(function($) {
        //hide the subtle gradient layer (.cd-pricing-list > li::after) when pricing table has been scrolled to the end (mobile version only)
        checkScrolling($('.cd-pricing-body'));
        $(window).on('resize', function() {
            window.requestAnimationFrame(function() {
                checkScrolling($('.cd-pricing-body'))
            });
        });
        $('.cd-pricing-body').on('scroll', function() {
            var selected = $(this);
            window.requestAnimationFrame(function() {
                checkScrolling(selected)
            });
        });

        function checkScrolling(tables) {
            tables.each(function() {
                var table = $(this),
                    totalTableWidth = parseInt(table.children('.cd-pricing-features').width()),
                    tableViewport = parseInt(table.width());
                if (table.scrollLeft() >= totalTableWidth - tableViewport - 1) {
                    table.parent('li').addClass('is-ended');
                } else {
                    table.parent('li').removeClass('is-ended');
                }
            });
        }

        //switch from monthly to annual pricing tables
        bouncy_filter($('.cd-pricing-container'));

        function bouncy_filter(container) {
            container.each(function() {
                var pricing_table = $(this);
                var filter_list_container = pricing_table.children('.cd-pricing-switcher'),
                    filter_radios = filter_list_container.find('input[type="radio"]'),
                    pricing_table_wrapper = pricing_table.find('.cd-pricing-wrapper');

                //store pricing table items
                var table_elements = {};
                filter_radios.each(function() {
                    var filter_type = $(this).val();
                    table_elements[filter_type] = pricing_table_wrapper.find('li[data-type="' + filter_type + '"]');
                });

                //detect input change event
                filter_radios.on('change', function(event) {
                    event.preventDefault();
                    //detect which radio input item was checked
                    var selected_filter = $(event.target).val();

                    //give higher z-index to the pricing table items selected by the radio input
                    show_selected_items(table_elements[selected_filter]);

                    //rotate each cd-pricing-wrapper 
                    //at the end of the animation hide the not-selected pricing tables and rotate back the .cd-pricing-wrapper

                    if (!Modernizr.cssanimations) {
                        hide_not_selected_items(table_elements, selected_filter);
                        pricing_table_wrapper.removeClass('is-switched');
                    } else {
                        pricing_table_wrapper.addClass('is-switched').eq(0).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
                            hide_not_selected_items(table_elements, selected_filter);
                            pricing_table_wrapper.removeClass('is-switched');
                            //change rotation direction if .cd-pricing-list has the .cd-bounce-invert class
                            if (pricing_table.find('.cd-pricing-list').hasClass('cd-bounce-invert')) pricing_table_wrapper.toggleClass('reverse-animation');
                        });
                    }
                });
            });
        }

        function show_selected_items(selected_elements) {
            selected_elements.addClass('is-selected');
        }

        function hide_not_selected_items(table_containers, filter) {
            $.each(table_containers, function(key, value) {
                if (key != filter) {
                    $(this).removeClass('is-visible is-selected').addClass('is-hidden');

                } else {
                    $(this).addClass('is-visible').removeClass('is-hidden is-selected');
                }
            });
        }
    });

    //CountTo jS
    $(document).ready(function() {
        jQuery('.some-fun-fact-list').each(function() {
            jQuery(this).fappear(function() {
                jQuery('.fun').countTo();
            });
        });
    });


    //Owl Carousels
    $(document).ready(function() {

        $("#owl-carousel").owlCarousel({

            autoPlay: 3000, //Set AutoPlay to 3 seconds

            autoPlay: 3000, //Set AutoPlay to 3 seconds
            items: 3,
            itemsDesktop: [1199, 3],
            itemsDesktopSmall: [991, 3],
            itemsTablet: [767, 2],
            itemMobileLandscape: [599, 1],
            itemsMobile: [479, 1],
            stopOnHover: true,
            navigation: false,
            responsive: true,
            responsiveRefreshRate: 200,
            responsiveBaseWidth: window
        });

    });

    //Input fileld Js int
    $(function() {
        // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
        if (!String.prototype.trim) {
            (function() {
                // Make sure we trim BOM and NBSP
                var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
                String.prototype.trim = function() {
                    return this.replace(rtrim, '');
                };
            })();
        }

        [].slice.call(document.querySelectorAll('input.input__field')).forEach(function(inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }

            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });
        [].slice.call(document.querySelectorAll('textarea.input__field')).forEach(function(inputEl) {
            // in case the input is already filled..
            if (inputEl.value.trim() !== '') {
                classie.add(inputEl.parentNode, 'input--filled');
            }

            // events:
            inputEl.addEventListener('focus', onInputFocus);
            inputEl.addEventListener('blur', onInputBlur);
        });

        function onInputFocus(ev) {
            classie.add(ev.target.parentNode, 'input--filled');
        }

        function onInputBlur(ev) {
            if (ev.target.value.trim() === '') {
                classie.remove(ev.target.parentNode, 'input--filled');
            }
        }
    });


    //Google Map Js int
    $(document).ready(function() {
        function initialize() {
            var mapOptions = {
                zoom: 12,
                // maptypecontrol: false,
                // disableDefaultUI: true,
                navigationControl: false,
                scaleControl: false,
                draggable: false,
                scrollwheel: false,
                zoomControl: false,
                disableDoubleClickZoom: true,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                center: new google.maps.LatLng(23.8386201, 90.3674962),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "stylers": [{
                        "visibility": "simplified"
                    }]
                }, {
                    "stylers": [{
                        "color": "#131314"
                    }]
                }, {
                    "featureType": "water",
                    "stylers": [{
                        "color": "#131313"
                    }, {
                        "lightness": 7
                    }]
                }, {
                    "elementType": "labels.text.fill",
                    "stylers": [{
                        "visibility": "on"
                    }, {
                        "lightness": 25
                    }]
                }]
            }
            var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            var image = 'img/map-marker.png';
            var marker1 = new Marker({
                map: map,
                zIndex: 10,
                title: 'FIFO',
                position: new google.maps.LatLng(23.8386201, 90.3674962),
                icon: image
            });
        }
        google.maps.event.addDomListener(window, 'load', initialize);

    });

  
});