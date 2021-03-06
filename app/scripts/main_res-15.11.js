//tabs

function changeTabs(tabNum, item){
  var itemNum = item.data('num');

  if(itemNum === tabNum){
    item.addClass('active');
  }
  else{
    item.removeClass('active');
  }
}
$('.j-tab:first').addClass('active');
$('.j-tab-conteiner:first').addClass('active');
$('.j-tab').click(function(){
    var tab = $(this);
    var tabNum = tab.data('num');
    var tabConteiners = tab.closest('.j-tabs-holder').find('.j-tab-conteiner');
    var tabs = tab.closest('.j-tabs-holder').find('.j-tab');
    tabConteiners.each(function(){
      var item = $(this);
      changeTabs(tabNum, item);
    });
   tabs.each(function(){
      var item = $(this);
      changeTabs(tabNum, item);
   });
   $('.j-slick').slick('setPosition');
});
$('.j-slick').each(function(){
    var slider = $(this);
    var arrows = slider.parent().find('.slider-arr');
    var prevArrow = arrows.find('.prev');
    var nextArrow = arrows.find('.next');
    slider.slick({
      fade:true,
      appendArrows:arrows,
      prevArrow:prevArrow,
      nextArrow:nextArrow
    });
})

$('.j-scroll-to').click(function(e){
    var href = $(this).attr('href'),
        offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

//Stiky header
var lastId,
  topMenu = $('.j-stick-header'),
  topMenuHeight = topMenu.outerHeight()+15,
  // All list items
  menuItems = topMenu.find('a'),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr('href'));
    if (item.length) { return item; }
});

// Bind click handler to menu items
menuItems.click(function(e){
  var href = $(this).attr('href'),
      offsetTop = href === '#' ? 0 : $(href).offset().top-topMenuHeight+1;
  $('html, body').stop().animate({
      scrollTop: offsetTop
  }, 300);
  e.preventDefault();
});

// Bind to scroll
$(window).scroll(function(){
   // Get container scroll position
   var fromTop = $(this).scrollTop()+topMenuHeight;
   // Get id of current scroll item
   var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
   });
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : '';

   if (lastId !== id) {
       lastId = id;
       // Set/remove active class
       menuItems
         .parent().removeClass('active')
         .end().filter('[href=#'+id+']').parent().addClass('active');
   }
});
$('.j-anckor').each(function(){
  var block = $(this);
  var posTop = block.offset().top;
  block.attr('data-pos', posTop);
})
$(window).scroll(function(){
  var scroll = $(this).scrollTop();
  $('.j-stick-header').addClass('fixed');
});

$('.j-open-plan').click(function(){
    $('.j-gen-plan-img_plan').fadeIn();
});


// b-modal-form

$('.j-open-call-modal').click(function(){
    $('.j-form-modal').fadeIn();
    $('.j-form-modal-block').fadeIn();
});

$('.j-form-modal').click(function(){
    $(this).fadeOut();
    $('.j-form-modal-block').fadeOut();
    $('.j-form-modal-success').fadeOut();
    $('.j-required-field').removeClass('__valid __invalid __active');
    $('.j-required-field').val('').parent().find('label.__active').removeClass('__active');
    $('.j-required-field').parent().removeClass('__invalid-form __valid-form');
});
$('.j-form-modal-block').click(function(e){
    e.stopPropagation();
});
$('.j-modal-block-close').click(function(){
    $('.j-form-modal').fadeOut();
    $('.j-form-modal-block').fadeOut();
    $('.j-form-modal-success').fadeOut();
    $('.j-required-field').removeClass('__valid __invalid __active');
    $('.j-required-field').val('');
    $('.j-required-field').parent().find('label.__active').removeClass('__active');
    $('.j-required-field').parent().removeClass('__invalid-form __valid-form');
    $('.j-form-modal-success').fadeOut();
});

$('input[type=tel]').keydown(function(e) {
    var a = e.charCode || e.keyCode || 0
      , t = $(this);
    return 8 !== a && 9 !== a && (6 === t.val().length && t.val(t.val() + ')'),
    7 === t.val().length && t.val(t.val() + ' '),
    11 === t.val().length && t.val(t.val() + '-'),
    t.val().length >= 14 && t.val(t.val().substring(0, 15))),
    8 == a || 9 == a || 46 == a || a >= 48 && 57 >= a || a >= 96 && 105 >= a
}),
$('input[type=tel]').on('focus click', function() {
    var e = $(this);
    if (0 === e.val().length)
        e.val('+7(');
    else {
        var a = e.val();
        e.val('').val(a)
    }
}),
$('input[type=tel]').blur(function() {
    var e = $(this);
    '+7(' === e.val() && (e.val(''),
    e.siblings('label, i').removeClass('active'));

});
//
// $('.j-required-field').focus(function(){
//     var input = $(this);
//     input.next('label').addClass('__active');
//     if(input.hasClass('__invalid')) {
//         if(input.val() >= 5) {
//             input.addClass('__active');
//
//         }
//     } else {
//         input.addClass('__active');
//     }
//
// });
// $('.j-required-phone').keyup(function(){
//
//     if($(this).val().length > 15) {
//         $(this).removeClass('__invalid').addClass('__valid');
//     } else {
//         $(this).addClass('__invalid');
//     }
//     console.log($(this).val().length);
// });
// $('.j-required-field').blur(function(){
//     var input = $(this),
//         inputVal = input.val();
//
//     if(inputVal == '') {
//         input.removeClass('__active');
//         input.next('label').removeClass('__active');
//     }
// });


//  form submit


$('.j-submit-form').submit(function(e){
  e.preventDefault();
  var form = $(this);
  var req = form.find('.j-required-field');
  var reqCont = req.parent();
  var data = form.serialize();
  var err = [];
  req.each(function(){

      var fild = $(this);
      if(fild.val() === ''){
          fild.addClass('__invalid');
          reqCont.addClass('__invalid-form');
          err.push('1');
      }

  });
  if($('.j-required-phone').val().length < 15) {
      $(this).addClass('__invalid');
      return false;
  }
  if(err.length === 0){
      $.ajax({
                url: '/mail.php',
                type: 'post',
                data: data,
                    success: function success() {
                        $('.j-form-modal-block').fadeOut();
                        setTimeout(function(){
                            $('.j-form-modal-success').fadeIn();
                        }, 400);
                        setTimeout(function(){
                            $('.j-form-modal-success').fadeOut();
                            $('.j-form-modal').fadeOut();
                        }, 1300);

                        $('.j-required-field').val('').parent().find('label.__active').removeClass('__active');
                        $('.j-required-field').parent().removeClass('__invalid-form');
                    }
                });
        }
     else {
         return false;
     }
  });


// form submit end


// b-modal-form end

// opening plan

$('.j-open-plan').click(function(){
    $('.j-gen-plan-img_big').fadeIn();
});
$('.j-gen-plan-img_big').click(function(){
    $(this).fadeOut();
});
// opening plan end

// flats plans modal
$('.j-close-modals').click(function(){
  $('.j-tabs-content-img-modal').fadeOut();
});

$('body').keydown(function(eventObject){
    if (eventObject.which == 27) {
      $('.j-gen-plan-img_big').fadeOut();
      $('.j-tabs-content-img-modal').fadeOut();
      $('.j-form-modal').fadeOut();
      $('.j-form-modal-block').fadeOut();
    }
});

$('.j-plans-slider-modal-open').click(function(){
        var insideImg = $(this).find('.j-plans-slider_plan');
        var imgData = insideImg.data('square');
        var imgSource = insideImg.attr('src');
        $('.j-tabs-content-img-modal').fadeIn();
        var modalImg = $('.j-tabs-content-img-modal').find('.j-tabs-content-inside-img');
        modalImg.attr({"src" : imgSource});
        var modalHeading = $('.j-tabs-content-img-modal').find('.j-tabs-content-inside-heading');
        modalHeading.text(imgData);
});
$('.j-tabs-content-img-modal').click(function(){
    $(this).fadeOut();
});

$('.j-tabs-content-inside').click(function(e){
    e.stopPropagation();
});

// flats plans modal end
