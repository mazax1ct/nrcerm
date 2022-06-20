var width = screen.width,
    height = screen.height;
$('.footer_mail span').click(function() {
    $('.footer_mail').toggleClass('mous');
    $('#formfield_url').val(window.location.href);
    $('#formfield_oc').val(navigator.userAgent);
    $('#formfield_razreshenie_ekrana').val(width + 'x' + height);
});


/////////////////////////////////
var wrapper = $(".file"),
    inp = wrapper.find("input"),
    btn = wrapper.find("span"),
    lbl = wrapper.find("mark");
btn.focus(function() {
    inp.focus()
});
// Crutches for the :focus style:
inp.focus(function() {
    wrapper.addClass("focus");
}).blur(function() {
    wrapper.removeClass("focus");
});
// Yep, it works!
btn.add(lbl).click(function() {
    inp.click();
});
// Crutches for the :focus style:
btn.focus(function() {
    wrapper.addClass("focus");
}).blur(function() {
    wrapper.removeClass("focus");
});
var file_api = (window.File && window.FileReader && window.FileList && window.Blob) ? true : false;
inp.change(function() {
    var file_name;
    if (file_api && inp[0].files[0]) file_name = inp[0].files[0].name;
    else file_name = inp.val().replace("C:\\fakepath\\", '');
    if (!file_name.length) return;
    if (lbl.is(":visible")) {
        lbl.text(file_name);
        btn.text("Выбрать");
    } else btn.text(file_name);
}).change();






/////////////////////////////////
$('.exit').click(function() {
    $('.footer_mail').toggleClass('mous');
});
$('.popup-with-form').click(function() {
    $('#formfield_url_zapisi').val(window.location.href);
});
$('#vakansii #formfield_vashe_imya').keyup(function() {
    $('#formfield_nazvanie_vakansii').val($('h1').text());
});
/*Pace.on('done', function() {
    console.log('custom_plgns.js');
});*/

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  if( typeof( options.path ) == 'undefined' ) {
  		options.path = '/'
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

// версия для слабовидящих
/*$('.limited_capabilities').on('click', function(event) {
	event.preventDefault();
	var isBlind = ((getCookie('isBlind') || 0) * 1 + 1) % 2;
    changeBlind(isBlind)
    changeFontSize();
});*/

function changeFontSize(size) {
    if (!(getCookie('isBlind') > 0)) {
        //$('html').removeClass('fontsize__large');
        //return;
    }
    if (typeof(size) == 'undefined') {
        size = getCookie('fontSize');
    }
    if (!size || size == 'default') {
        size = 'default';
        $('.poor-font-size_default').addClass('selected').siblings().removeClass('selected');
        $('html').removeClass('fontsize__large');
        $('html').removeClass('fontsize__xlarge');
    } else if (size == 'large') {
        size = 'large';
        $('.poor-font-size_large').addClass('selected').siblings().removeClass('selected');
        $('html').addClass('fontsize__large');
        $('html').removeClass('fontsize__xlarge');
    } else if (size == 'xlarge') {
        size = 'xlarge';
        $('.poor-font-size_xlarge').addClass('selected').siblings().removeClass('selected');
        $('html').addClass('fontsize__xlarge');
        $('html').removeClass('fontsize__large');
    }
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie('fontSize', size, {
        'expires': date
    });
}

function setColors(color) {
	if (typeof color === 'undefined') {
		color = 'white-black';
	}
    jQuery("*").not(".ignore-all *").each(function(idx) {
        if (jQuery(this).hasClass("ignore-all")) {
            return;
        }
        $(this).removeClass("white-black black-white blue-yellow").addClass(color)
    });
    setCookie("colorScheme", color);
}

function setImageClass(klass) {
    var selectors = "img, .finevision-img";
    jQuery(selectors).removeClass("hidden gray").addClass(klass);
    if (klass == 'hidden') {
        jQuery(selectors).css("display", "").attr('style', function(i, s) {
            return s + ' display: none !important'
        });
    } else {
        jQuery(selectors).show();
    }
    klass = typeof klass == "undefined" ? "" : klass;
    jsCookies.set("ImageClass", klass, 7);
}

function setLineHeight(diff) {
    var lineHeight;
    cookieHeight = parseInt(getCookie("lineHeight"));
    if (isNaN(cookieHeight)) {
        cookieHeight = 7;
    }
    var totalScale = cookieHeight + diff;
    if ((totalScale > 14) || (totalScale < -7)) {
        return 0
    }
    jQuery("*").not(".blindSelector-wrapper *").each(function(idx) {
        if (jQuery(this).hasClass("ignore-all")) {
            return;
        }
        lineHeight = jQuery(this).css('font-size');
        lineHeight = parseFloat(lineHeight) * Math.pow(1.1, totalScale);
        lineHeight = lineHeight + 'px';
        jQuery(this).animate({
            'line-height': lineHeight
        }, 250);
    });
    setCookie("lineHeight", totalScale);
}

function fontRescale(fontScale) {
    var fontSize;
    var lineHeightScale = getCookie("lineHeight");
    jQuery("*").not(".blindSelector-wrapper *").each(function(idx) {
        if (jQuery(this).hasClass("ignore-all")) {
            return;
        }
        fontSize = jQuery(this).css('font-size');
        fontSize = parseInt(fontSize) + 2 * fontScale;
        lineHeight = fontSize * Math.pow(1.1, lineHeightScale);
        // jQuery(this).animate({
        //     'line-height': lineHeight + 'px'
        // }, 0);
        fontSize = fontSize + 'px';
        jQuery(this).animate({
            fontSize: fontSize
        }, 250);
    });
    var totalScale = parseInt(getCookie("fontScale"));
    setCookie("fontScale", totalScale + fontScale);
}

function changeBlind(isBlind) {
    var $body = $('body');
    if (typeof(isBlind) == 'undefined') {
        isBlind = getCookie('isBlind');
    }
    if (isNaN(isBlind)) {
        isBlind = 0;
    }
    var date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    setCookie('isBlind', isBlind, {
        'expires': date
    });

    if (isBlind > 0) {
        $(document).ready(function() {
            $('html').addClass('poorVision')
            $('.limited_capabilities').html('Обычная версия сайта');
            $('.header_left a span').addClass('new_text');
            $('.poorVision-controls').removeClass('hidden');
            $('.blindSelector-wrapper').insertAfter('nav');
            setColors(getCookie('colorScheme'));
            setLineHeight(0);
            fontRescale(0);
        });
    } else {
        $('html').removeClass('poorVision');
        $body.removeClass('serif sans-serif');
        $('.limited_capabilities').html('Версия для слабовидящих');
        $('.header_left a span').removeClass('new_text');
        $('.poorVision-controls').addClass('hidden');
        jQuery("*").css('line-height', '');
        jQuery("*").css('font-size', '');
        jQuery("*").not('.blindSelector-wrapper *').removeClass('white-black black-white blue-yellow');
    }
}


// версия для слабовидящих


//Pace.on('done', function() {
    //console.log('main.js');
    $('select').wrap('<div class="selectwrap"></div>');
    $('#test-form').validate({
        showErrors: function(errorMap, errorList) {
            $("#summary").html("Your form contains " + this.numberOfInvalids() + " errors, see details below.");
            this.defaultShowErrors();
            $('label#personal-error').click(function() {
                $('#common-152-federal-law').trigger('click');
                $('label#personal-error').remove();
            });
        }
    });
    $('#subscribe_guest').validate({
    	rules: {
	    field: {
	      required: true,
	      email: true
	    }
	  }
    });
    let formValidate = {
        validate: function() {
            $('.validate_form').validate({
                showErrors: function(errorMap, errorList) {
                    this.defaultShowErrors();
                    $('label#personal-error').click(function() {
                        $('label#personal-error').remove();
                        $('#common-152-federal-law').trigger('click');
                        $('#common-153-federal-law').trigger('click');
                    });
                    return false;
                },
            });
            $("#umi_the_best").ajaxForm(function() {
                $("#umi_the_best").html("Ваше сообщение успешно добавлено, но согласно политике сайта, будет доступно для посетителей после модерации администратором.");
                $("#umi_the_best").trigger("reset");
            });
        }
    };
    formValidate.validate();
    $.extend($.validator.messages, {
        required: "Это поле необходимо заполнить.",
        remote: "Пожалуйста, введите правильное значение.",
        email: "Пожалуйста, введите корректный адрес электронной почты.",
        url: "Пожалуйста, введите корректный URL.",
        date: "Пожалуйста, введите корректную дату.",
        dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
        number: "Пожалуйста, введите число.",
        digits: "Пожалуйста, вводите только цифры.",
        creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
        equalTo: "Пожалуйста, введите такое же значение ещё раз.",
        extension: "Пожалуйста, выберите файл с правильным расширением.",
        maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
        minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
        rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
        range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
        max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
        min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
    });

    // новый слайдер
    var swiperNew = new Swiper('.slider_wr_core_new', {
        renderBullet: function(index, className) {
            return '<span data-index="' + index + '" class="slider_wr_core_pagination_bullet ' + className + '"></span>';
        },
        pagination: {
            el: '.slider_wr_core_pagination',
            clickable: true
        },
        autoplay: {
            delay: 5000,
        },
        speed: 750,
        effect: 'fade',
        fadeEffect: {
  		    crossFade: true
  		  },
    });
    // новый слайдре

    /*if (screen.width > 768 && $(window).width() > 768) {
        $('.flex_blocks').masonry({
            itemSelector: '.flex_blocks_item',
            columnWidth: 290,
            gutter: 10
        });
    }*/
    $('.aside_secondary_menu').children('li').children('div').click(function() {
        $(this).parent().toggleClass('expanded');
    });
    /*$('.tabz').responsiveTabs({
        startCollapsed: 'accordion'
    });*/
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        preloader: false,
        overflowY: 'scroll',
        focus: '#name',
        // When elemened is focused, some mobile browsers in some cases zoom in
        // It looks not nice, so we disable it:
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
                if ($(window).width() < 1024) {
                    this.st.alignTop = true;
                }
            }
        }
    });
    $('.faq_post_q').magnificPopup({
        type: 'ajax',
        alignTop: true,
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function() {
                Pace.go();
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
            }
        }
    });
    $('.popup_img').magnificPopup({
        type: 'image',
        callbacks: {
            open: function() {
                function getScrollBarWidth() {
                    var inner = document.createElement('p');
                    inner.style.width = "100%";
                    inner.style.height = "200px";
                    var outer = document.createElement('div');
                    outer.style.position = "absolute";
                    outer.style.top = "0px";
                    outer.style.left = "0px";
                    outer.style.visibility = "hidden";
                    outer.style.width = "200px";
                    outer.style.height = "150px";
                    outer.style.overflow = "hidden";
                    outer.appendChild(inner);
                    document.body.appendChild(outer);
                    var w1 = inner.offsetWidth;
                    outer.style.overflow = 'scroll';
                    var w2 = inner.offsetWidth;
                    if (w1 == w2) w2 = outer.clientWidth;
                    document.body.removeChild(outer);
                    return (w1 - w2);
                };
                $('body').css('padding-right', getScrollBarWidth() + "px");
            },
            close: function() {
                $('body').css('padding-right', 0);
            }
        },
        gallery: {
            enabled: true
        },
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
    $('.anchor').on('click', function(event) {
        var link = $(this).attr('href');
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: $(link).offset().top
        }, 2000, 'easeInOutExpo');
        return false;
    });
    var nav = $('.r-tabs-nav'),
        header_left = $('.header_left'),
        header_text = header_left.find('span'),
        slider_button = $('.arrowedbutton'),
        header_right = $('.header_right'),
        toggle_menu = header_right.find('.toggle_menu'),
        popup_menu = $('.navigation_popup'),
        horisontal_navigation = popup_menu.find('.navigation_popup_menu'),
        popup_close = popup_menu.find('.close'),
        be_pacient_online = $('.be_pacient_online'),
        doctor_page_content = $('.secondary_content section'),
        tabz = $('.tabz');
    /*nav.wrapInner('<div class="nav_inner" ></div>');*/
    var size = null;
    var style = null;

    function TextReplace(tag, size, text, style) {
        // if (screen.width > size || $(window).width() > size) {
        //     tag.text(tag.data('mobile2'));
        // }
        if (screen.width <= size || $(window).width() <= size) {
            tag.text(text);
            if (style != null) {
                $.each(style, function(i, obj) {
                    tag.css(obj);
                });
            }
        }
    }

    function ExpandMenu(menu) {
        var li = menu.children('li').children('div');
        li.on('click', function(event) {
            event.preventDefault();
            $(this).parent().toggleClass('expanded');
        });
    }

    function ToggleMenu(toggle_btn, menu, close) {
        toggle_btn.on('click', function() {
            menu.fadeIn(500);
        });
        close.on('click', function() {
            menu.fadeOut(500);
        });
    }

    function MoveContent(content, content_in, size) {
        if (location.pathname !== '/') {
            if (screen.width <= size || $(window).width() <= size) {
                content.detach().appendTo(content_in);
            }
        }
    }
    var direction = '';

    function ScrollObj(obj, direction) {
        var child_obj = obj.children(),
            obj_height = obj.height(),
            obj_width = obj.width(),
            child_obj_height = child_obj.height(),
            child_obj_width = child_obj.width();
        obj.css({
            cursor: 'move'
        });
        obj.mousedown(function(e) {
            if (direction == 'x' && child_obj_width > obj_width) {
                var startX = this.scrollLeft + e.pageX;
            } else if (direction == 'y' && child_obj_height > obj_height) {
                var startY = this.scrollTop + e.pageY;
            } else if (child_obj_width > obj_width && child_obj_height > obj_height) {
                var startX = this.scrollLeft + e.pageX;
                var startY = this.scrollTop + e.pageY;
            }
            obj.mousemove(function(e) {
                if (direction == 'x' && child_obj_width > obj_width) {
                    this.scrollLeft = startX - e.pageX;
                } else if (direction == 'y' && child_obj_height > obj_height) {
                    this.scrollTop = startY - e.pageY;
                } else if (child_obj_width > obj_width && child_obj_height > obj_height) {
                    this.scrollLeft = startX - e.pageX;
                    this.scrollTop = startY - e.pageY;
                }
                return false;
            });
            if (obj.getSelection) {
                obj.getSelection().removeAllRanges();
            }
        });
        $(window).mouseup(function(e) {
            obj.off('mousemove');
        });
    }

    function Tabs(tag) {
        var tab_header = tag.find('.tabz-header'),
            tab_content = tag.find('.tab_content'),
            tab_li = tab_header.find('li'),
            tab_a = tab_li.find('a');
        ScrollObj(tab_header, 'x');
        if (screen.width <= 600 || $(window).width() <= 600) {
            tab_header.mouseenter(function(e) {
                $(this).find('.swipe_icon').fadeOut(300);
            });
            tab_header.mouseleave(function(e) {
                $(this).find('.swipe_icon').fadeIn(300);
            });
        }
        if (location.href.match('otdelenie')) {
            if (screen.width <= 600 || $(window).width() <= 600) {
                tab_header.find('ul').css({
                    'width': 585
                });
            }
        }
        tab_a.on('click', function(e) {
            e.preventDefault();
            var id = $(this).attr('href');
            tab_a.removeClass('active');
            $(this).addClass('active');
            tab_content.removeClass('active');
            $(id).addClass('active');
        });
    }
    var style_text = [{
        'font-size': '19px'
    }];
    // TextReplace(header_text, 716, $('.header_left a span').data('mobile'), style_text);
    TextReplace(slider_button, 767, '');
    ExpandMenu(horisontal_navigation);
    ToggleMenu(toggle_menu, popup_menu, popup_close);
    // MoveContent(be_pacient_online, doctor_page_content, 991);
    Tabs(tabz);
    changeBlind();
    $(window).resize(function() {
        // TextReplace(header_text, 716, $('.header_left a span').data('mobile'), style_text);
        // MoveContent(be_pacient_online, doctor_page_content, 991);
    });;
    (function($) {
        $.fn.senderror = function(options) {
            const defSettings = {
                'contextLength': 100
            };
            const settings = $.extend(true, defSettings, options);
            var getUnselectedText = function(e) {
                    var t, n, o, a = "",
                        r = "";
                    return "undefined" !== typeof window.getSelection ? (t = window.getSelection(), t.rangeCount ? n = t.getRangeAt(0) : (n = document.createRange(), n.collapse(!0)), o = document.createRange(), o.selectNodeContents(e), o.setEnd(n.startContainer, n.startOffset), a = o.toString(), o.selectNodeContents(e), o.setStart(n.endContainer, n.endOffset), r = o.toString()) : (t = document.selection) && "Control" !== t.type && (n = t.createRange(), o = document.body.createTextRange(), o.moveToElementText(e), o.setEndPoint("EndToStart", n), a = o.text, o.moveToElementText(e), o.setEndPoint("StartToEnd", n), r = o.text), {
                        before: a,
                        after: r
                    }
                },
                clearString = function(s) {
                    return s.replace(/\s+/g, ' ').replace(/[^a-zа-яё0-9\.\,\ \_\-\(\)\[\]\{\}\`\~\@\#\$\%\^\:\*]/gi, '');
                },
                escapeHtml = function(string) {
                    var entityMap = {
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': '&quot;',
                        "'": '&#39;',
                        "/": '&#x2F;'
                    };
                    return String(string).replace(/[&<>"'\/]/g, function(s) {
                        return entityMap[s];
                    });
                },
                getSelectionText = function() {
                    var text = '';
                    if (window.getSelection) {
                        text = window.getSelection().toString();
                    } else if (document.selection && document.selection.type != 'Control') {
                        text = document.selection.createRange().text;
                    }
                    return text;
                },
                body = $('body').first(),
                content = body.find('#mt_c'),
                loading = content.find('div.loading').first(),
                title = content.find('div.title').first(),
                message = content.find('p.msg').first(),
                url = content.find('span.url').first(),
                textdata = content.find('.important_p').first(),
                comment = $('#formfield_comment'),
                close = content.find('.mt_cl'),
                form = content.find('.form');
            send = $('.mt_snd'),
                atStart = '',
                atEnd = '',
                selectedText = '',
                sendMail = function() {
                    $.ajax({
                        url: '/webforms/send/',
                        type: 'POST',
                        dataType: 'html',
                        data: form.serialize(),
                    }).done(function() {}).always(function() {
                        $.magnificPopup.close();
                    });
                };
            send.on('click', function() {
                sendMail();
            });
            body.keydown(function(e) {
                if (e.ctrlKey && e.keyCode === 13) {
                    if ($.isFunction(settings.onCtrlEnter)) settings.onCtrlEnter(); // callback
                    var unselected = getUnselectedText(document.body);
                    atStart = clearString(unselected.before.slice(-settings.contextLength));
                    atEnd = clearString(unselected.after.slice(0, settings.contextLength));
                    selectedText = escapeHtml(getSelectionText()).replace(/(\r\n|\n|\r)/gm, ' ');
                    if (selectedText.length < 1) return false;
                    if (selectedText.length > settings.textLimit) {
                        log('Too many text');
                        return false;
                    }
                    comment.val(''); // clear comment input
                    // url.text(window.location.href);
                    $('#formfield_after').val(atStart);
                    $('#formfield_before').val(atEnd);
                    $('#formfield_error').val(selectedText);
                    $('#formfield_key').val(window.location.href);
                    textdata.html('&hellip;' + atStart + '<strong>' + selectedText + '</strong>' + atEnd + '&hellip;');
                    $.magnificPopup.open({
                        items: {
                            src: '#mt_c'
                        },
                        type: 'inline',
                    });
                }
            });
        }
        $('.flex_blocks_item_t').on('click', function(event) {
        	event.preventDefault();
        	let link = $(this).data('lent_link');
        	window.location = link;
        });

    })(jQuery);
    jQuery(document).ready(function($) {
        jQuery(document).senderror({});
    });
    $('.abc_block_item').on('click', function(event) {
        // event.preventDefault();
        let objName = $(this).data('tag');
        if (typeof objName == 'undefined') {
        	return true;
        }
        let that = $(this);
        let url = window.location.href;
        let path = $(this).data('path');
        let newUrl = updateQueryStringParameter(url, path, encodeURIComponent(objName));
        $.ajax({
            url: newUrl,
            dataType: 'html',
            // data: {
            //     p: page,
            //     transform: template
            // },
        }).done(function(data) {
            $('body>div.full_width').html(data);
            window.history.pushState({}, null, newUrl);
        }).fail(function() {
            console.log("error");
        });
    });

    function updateQueryStringParameter(uri, key, value) {
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
        	let replace = '$1' + key + "=" + value + '$2';
            if (value == 'all') {
            	replace  = '$1' + '$2';
            }
            return uri.replace(re, replace);
        } else {
            return uri + separator + key + "=" + value;
        }
    }
    $(".spoilerbody").hide();
    $(".read_more").attr("title", "Читать далее").click(function() {
        var body = $(this).next(".spoilerbody");
        body.toggle();
        $(this).toggleClass('open');
        if (body.is(":hidden")) {
            $(this).attr("title", "Читать далее");
        } else {
            $(this).attr("title", "Свернуть спойлер");
        }
    });
    $('.readmore-message').readmore({
        speed: 800,
        moreLink: '<a href="#">Читать далее</a>',
        lessLink: '<a href="#">Свернуть</a>',
        afterToggle: function(trigger, element, expanded) {

		  }
    });

    var myMap;
    try {
        ymaps.ready(init);
    } catch (err) {}

    function init() {
        myMap = new ymaps.Map('contactsmap', {
            center: [59.939095, 30.315868],
            zoom: 11,
            controls: ['zoomControl', 'typeSelector'],
        }, {
            suppressMapOpenBlock: true
        });
        // myMap.behaviors.disable('drag');
        objectManager = new ymaps.ObjectManager({
            clusterize: true,
            clusterDisableClickZoom: true,
            clusterIcons: [
                            {
                              href: '/templates/nrcerm/dist/img/map_marker_cluster.png',
                              size: [100, 100],
                              offset: [-50, -100]
                            }],
                              clusterIconContentLayout: ymaps.templateLayoutFactory.createClass('<div style="color: #FFFFFF; 	padding-top: 28px;font-weight: bold;">{{ properties.geoObjects.length }}</div>'),
        });
        objectManager.objects.options.set({
            iconLayout: 'default#image',
            iconImageHref: '/templates/nrcerm/dist/img/map_marker.png',
            iconImageOffset: [-50, -100],
            iconImageSize: [100, 100]
        });
         myMap.behaviors.disable('scrollZoom');

        myMap.geoObjects.add(objectManager);
        let data = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "id": 1,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.9545693, 30.3458736]
                },
                "properties": {
                    "balloonContentHeader": "Клиника № 1 ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "balloonContentBody": "<p><b>Адрес: </b>ул. Академика Лебедева 4/2, станция метро «Площадь Ленина»</p>",
                    "balloonContentFooter": "",
                    "clusterCaption": "Клиника № 1 ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "hintContent": "Клиника №1"
                }
            }, {
                "type": "Feature",
                "id": 2,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.998163, 30.1943569]
                },
                "properties": {
                    "balloonContentHeader": "Клиника № 2 ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "balloonContentBody": "<p><b>Адрес: </b>ул. Оптиков, д. 54</p><p>От станции метро «Старая деревня»: автобусы 154-го, 125-го маршрута, 379-я и 94-я маршрутки; от ст. метро «Комендантский проспект»: автобус 172-го маршрута</p>",
                    "balloonContentFooter": "",
                    "clusterCaption": "Клиника № 2 ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "hintContent": "Клиника №2"
                }
            }, {
                "type": "Feature",
                "id": 3,
                "geometry": {
                    "type": "Point",
                    "coordinates": [59.998163, 30.1943569]
                },
                "properties": {
                    "balloonContentHeader": "Поликлиника ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "balloonContentBody": "Текст про клинику",
                    "balloonContentFooter": "",
                    "clusterCaption": "Поликлиника ФГБУ ВЦЭРМ им. А.М.Никифорова МЧС России",
                    "hintContent": "Поликлиника"
                }
            }, ]
        };

        $.ajax({
	        url: "/udata://content/maps/",
	        // async:false,
	    }).done(function(data) {
	    	console.log(data);
	        objectManager.add(data);
	        myMap.setBounds(objectManager.getBounds());
	    });
        // objectManager.add(data);
        // setActiveBalloon($('.tabz-header a.active').attr('data-id'));
        objectManager.objects.events.add('click', function(e) {
            var objectId = e.get('objectId');
            setActiveTabz(objectId);
        });
        var activeObjectMonitor = new ymaps.Monitor(objectManager.clusters.state);
        activeObjectMonitor.add('activeObject', function() {
            var objectId = activeObjectMonitor.get('activeObject').id;
            setActiveTabz(objectId);
        });
        // $('.heading div').click(function() {
        //     open($('div.active_btn').attr('data-id'));
        // });
        function setActiveTabz(objectId) {
            document.getElementById('contacts-tab-' + objectId).click();
        }
        $('.tabz-header li a').on('click', function(event) {
            let objectId = $(this).attr('data-id');
            setActiveBalloon(objectId);
        });

        function setActiveBalloon(objectId) {
            let object = objectManager.objects.getById(objectId);
            let objectState = objectManager.getObjectState(objectId);
            if (objectState.isClustered) {
                // Если это кластер
                let localJson = getLocalData(objectState.cluster.features, objectId)[0];
                objectManager.clusters.balloon.open(objectState.cluster.id);
                objectManager.clusters.state.set('activeObject', localJson);
            } else {
                // Если обычный объект
                objectManager.objects.balloon.open(objectId);
            }
        }

        function getLocalData(data, objectId) {
            return data.filter(function(data) {
                return data.id == objectId
            });
        }
    }
    $('form input[name="data[new][vashe_imya]"]').keyup(function() {
        $('.g-recaptcha-response').attr('required','required');
    });
//});

$('form input[name="data[new][telefon]').mask('+7 (999) 999-9999');
$('.mfp_bg_close').click(function() {
	$('.mfp-ready').remove();
});

$("#post_vote").on("submit", this.submitVoteForm);
function submitVoteForm (e) {
        e.preventDefault();
        var t = $("#post_vote")
          , a = t.data("vote_id")
          , n = $("input[name=answer]:checked", t).val();
        $.post("/ru" + "/vote/post/" + n, function() {
            $.getJSON("/udata://vote/results/" + a + ".json?lang_id=1", function(e) {
                var t = e.items.item
                  , a = $("#vote_result_template")
                  , n = _.template(a.html())({
                    optionList: t
                });
                $(".interview").replaceWith(n);
                posleallert();
            });
        });


    }

function posleallert() {
    $('.result.clearfix').each(function(index){
        var www = $(this).children('.result_range').attr('class');
         $(this).children('.result_range').attr('class', www + '_' + index);
        var qqq = $(this).children('.result_num').text();
        new ProgressBar.Line('.result_range_' + index, {easing: 'easeInOut', svgStyle: {width: qqq, height: '20px'}}).animate(1.0);
    })
}
