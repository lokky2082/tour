
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
     if ($(this).offset().top < fromTop){
       return this;
     }

   });
   var lastScroll = $('#food').data('pos') + 200;
   console.log(lastScroll);
   // Get the id of the current element
   cur = cur[cur.length-1];
   var id = cur && cur.length ? cur[0].id : '';
   if (lastId !== id) {
       lastId = id;
       console.log(lastId);
       // Set/remove active class
       menuItems
         .parent().removeClass('active')
         .end().filter('[href=#'+id+']').parent().addClass('active');
   }
   if((fromTop > lastScroll)) {
     lastId = 'contact_us'
     menuItems
       .parent().removeClass('active')
       .end().filter('[href=#contact_us]').parent().addClass('active');
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
