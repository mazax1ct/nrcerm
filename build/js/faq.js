$(document).on('click', '.tabs-nav__button', function () {
  var el = $(this);
  el.closest('.tabs-nav').find('.tabs-nav__button').removeClass('is-active');
  el.addClass('is-active');

  el.closest('.tabs').find('.tabs__tab.is-active').animate({
    opacity: 0
  }, 400, function() {
    el.closest('.tabs').find('.tabs__tab.is-active').removeClass('is-active');
    el.closest('.tabs').find('.tabs__tab[data-target='+el.attr('data-target')+']').addClass('is-active');
    el.closest('.tabs').find('.tabs__tab[data-target='+el.attr('data-target')+']').animate({
      opacity: 1
    }, 400);
  });

  return false;
});

$(document).on('click', '.faq-item__toggler', function () {
  $(this).closest('.faq-item').toggleClass('is-active');
  $(this).next('.faq-item__body').slideToggle();
  return false;
});
