jQuery( document ).ready( function( $ ){

    //  ================================================================================
    //  Lazyload
    //  ================================================================================

    $('.lazy').lazy({
        delay: 3000,
        // imageBase: 'images/',
        visibleOnly: true,
        afterLoad: function(el){
            $(el).addClass('is-loaded');
        }
    });

    //  ================================================================================
    //  Filters
    //  ================================================================================

    var $FilterBtns = $('.btn-filter').click(function() {
        if (this.id == 'all') {
            $('#parent > div').fadeIn(450);
        } else {
            var $element = $('.' + this.id).fadeIn(450);
            $('#parent > div').not($element).hide();
        }
        $FilterBtns.removeClass('active-filter');
        $(this).addClass('active-filter');
    })

    //  ================================================================================
    //  Sticky menu
    //  ================================================================================

    const scrollBarEob = {
        $el: null,
        scrollHideMarginPx: 50,
        scrollShowPx: 200,
        lastScrollTop: 0,
        init(){

            $el = $('.header-main-eob-min');

            //  This is a bad implementation. Does not do anything.
            scrollBarEob.scrollHideMarginPx = $el.attr('data-scroll-hide-margin') || 50;    //  TODO - remove this line.

            $(window).scroll(scrollBarEob.onScroll);

        },
        onScroll(){

            const currentScrollTop = $(this).scrollTop();

            //  Actually does not do anything. We need an additional class because of f***** up home page logic.
            if(currentScrollTop > scrollBarEob.scrollShowPx){
                $el.addClass('is-visible');
            } else {
                $el.removeClass('is-visible');
            }

            if(currentScrollTop >= scrollBarEob.scrollHideMarginPx && currentScrollTop > scrollBarEob.lastScrollTop){
                $el.addClass('is-hidden-by-scroll');
            } else {
                $el.removeClass('is-hidden-by-scroll');
            }

            scrollBarEob.lastScrollTop = currentScrollTop;

        }
    };

    scrollBarEob.init();

    //  ================================================================================
    //  Slider Slick
    //  ================================================================================

    $('.users-slick').slick({
        dots: true,
        infinite: false,
        speed: 300,
        arrows: false,
        slidesToShow: 6,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1198,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });


    //  ================================================================================
    //  Reading strip.
    //  ================================================================================

    const readStripEob = {
        $stripEl: null,
        $contentEl: null,
        init(){

            readStripEob.$stripEl = $('.read-strip-eob');
            readStripEob.$contentEl = $('.count-stripe');

            //  Do not bind event listener if any of elements does not exist.
            if(readStripEob.$stripEl.length && readStripEob.$contentEl.length){
                $(window).scroll(readStripEob.onScroll);
            }

        },
        onScroll(){
            let x = readStripEob.$contentEl.position().top + readStripEob.$contentEl.outerHeight()
            let percentage = $(window).scrollTop() * 100 / x;

            if(percentage > 100) percentage = 100;  //  Be sure.

            readStripEob.$stripEl.css({width : percentage + '%'});
        }
    };

    readStripEob.init();

    //  ================================================================================
    //  Add class to images (eob-editorial-img)
    //  ================================================================================

    $( '.wp-block-image > img[alt="editotrial"]' ).addClass( 'eob-editorial-img' );

} );

