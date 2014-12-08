'use strict';

jQuery(function($) {
  var overlay = $('.overlay');

  var mainNavigation = $('.main-navigation');
  
  $('.navigation-toggle').bind('click touchstart', function(event) {
    event.preventDefault();
    
    if (mainNavigation.is(":visible")) {
      mainNavigation.slideUp('fast', function() {
        overlay.fadeOut('fast'); 
      });
    } else {
      overlay.fadeIn('fast', function() {
        mainNavigation.slideDown('fast');
      });
    }
  });

  overlay.bind('click touchstart', function(event) {
    if (mainNavigation.is(":visible")) {
      mainNavigation.slideUp('fast', function() {
        overlay.fadeOut('fast'); 
      });
    } else {
      overlay.fadeIn('fast', function() {
        mainNavigation.slideDown('fast');
      });
    }
  });


  var buttons = $('a, button');
  buttons.bind('touchstart', function(event) {
    if($(this).attr('disabled') !== 'disabled') {
      $(this).addClass('active');
    }
  });

  buttons.bind('touchend', function(event) {
    $(this).removeClass('active');
  });

  buttons.bind('click', function(event) {
    if($(this).attr('disabled') === 'disabled') {
      event.preventDefault();
    }
  });
})