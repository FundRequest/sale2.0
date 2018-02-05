var curirspinner;

$(document).ready( function() {
    // console.log('Ready');

	var navigation = document.querySelector(".headroom");
	var headroom = new Headroom(navigation, {
	  tolerance: 10,
	  classes : {
	  	pinned: "slideDown",
      	unpinned: "slideUp"
      }
	});
    headroom.init();
    
    $('.js_horizontal').lightSlider({
        autoWidth:true,
        loop:false,
        controls: false,
        item:5,
        slideMargin: 25,
        easing: 'cubic-bezier(0.25, 0, 0.25, 1)',
        responsive : [
            {
                breakpoint:991,
                settings: {
                    item:4,
                    slideMargin: 10,
                    slideMove:1
                  }
            },
            {
                breakpoint:767,
                settings: {
                    item:2,
                    slideMargin: 0,
                    slideMove:1
                }
            }
        ]
    });

    $('.vertical-slider').lightSlider({
        loop:false,
        keyPress:true,
        item: 1,
        adaptiveHeight: true,
        mode: 'fade',
        onSliderLoad: function(_el) 
        {
        	var slidecontainer = $(_el).closest(".lSSlideOuter");
        	slidecontainer.find(".lSPager li").each(function(idx) {
        		if( slidecontainer.find(".lslide:eq("+idx+")").attr("data-year") )
        		{
        			$(this).find("a").text(slidecontainer.find(".lslide:eq("+idx+")").attr("data-year"));
        		}
        		else
        		{
        			$(this).attr("data-title", slidecontainer.find(".lslide:eq("+idx+")").attr("data-title"));
        		}
        	});
        	
        	if(slidecontainer.find(".monthslider").length > 0)
        		slidecontainer.append("<div class='monthselector'></div>");


        	var slidecontainer = $(_el).closest(".lSSlideOuter");
        	/*var currentmonthitem = slidecontainer.find(".monthslider:eq(" + (_el.getCurrentSlideCount() -1) + ")")
    		var submonths = [];
    		$(currentmonthitem).find(".month").each(function() {
    			submonths.push($(this).attr("data-month"));
    		});
    		$(".monthselector").html("");
    		curirspinner = $(".monthselector").irSpinner({
				list: submonths,
				vertical: ($(window).width() < 991  ? false : true)
			});*/
        },
        onAfterSlide: function(_el)
        {
        	/*var slidecontainer = $(_el).closest(".lSSlideOuter");
        	var currentmonthitem = slidecontainer.find(".monthslider:eq(" + (_el.getCurrentSlideCount() -1) + ")")
    		var submonths = [];
    		$(currentmonthitem).find(".month").each(function() {
    			submonths.push($(this).attr("data-month"));
    		});
    		if(submonths.length > 0)
    		{
	    		$(".monthselector").html("");
	    		curirspinner = $(".monthselector").irSpinner({
					list: submonths,
					vertical: ($(window).width() < 991  ? false : true)
				});
    		}*/
        }
    });

    $(".scrolltonext").on("click", function() {
		$('html, body').animate({
       		scrollTop: $(this).closest('section').next().offset().top
    	}, 800);
    	return false;
    });

    $(function() {
        $('.memberinfo').matchHeight({
            byRow: false,
        });

        $('section.steps .lslide ').matchHeight({
            byRow: false,
        });

    });

    $('.navlinks a[href*="#"]').on('click', function (e) {
        nav = $('.navlinks');
        e.preventDefault();
        $('a').each(function () {
            $(this).removeClass('active');
        })
        // nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
        $(this).addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500, 'linear');
    });

    // vertical align image -> header
    var rowh = $('.js_row').height();
    $('.centerdiv').css('min-height', rowh+'px'); 


    //var test = $('.lslide').attr("data-title");
    $(".lslide").change(function () {
       var test = $(this).data("data-title");
        console.log(test);
    });
    
    window.onscroll = function (e) {
        if ($(window).width() < 768) {
            if ($( 'div.collapse ' ).hasClass("in")) {
                $('div.collapse').removeClass("in"); 
            }
        }
    }

});

function fund_updatemonth(idx)
{
	$(".monthslider .month").hide();
	$(".monthslider").find(".month:eq(" +idx+ ")").show();
	$( window ).trigger('refreshheight');
}