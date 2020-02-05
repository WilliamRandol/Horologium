$(function () {
	window.customElements.define('wmr-horologium', Horologium);
	
	var timeout = null;
	var adtimer = null;
	$('#menuBar').hover(
		function () {
			if (timeout) {
				clearTimeout(timeout);
				timeout = null;
			}
			$(this).animate({ marginTop: 0 }, 'fast');
		},
		function () {
			var initialMargin = parseInt(-1 * ($('#menuBar').height() + 5));
			var menuBar = $(this);
			timeout = setTimeout(function () {
				timeout = null;
				menuBar.animate({ marginTop: initialMargin }, 'slow');
			}, 1000);
		}
	);
	$('#adBlock').hover(
		function () {
			if (adtimer) {
				clearTimeout(adtimer);
				adtimer = null;
			}
			$(this).animate({ height: 68 }, 'fast');
		},
		function () {
			var menuBar = $(this);
			adtimer = setTimeout(function () {
				adtimer = null;
				menuBar.animate({ height: 8 }, 'slow');
			}, 1000);
		}
	);
	if (location.search.search(/container/i) != -1) {
		$('.igoogle').hide();
	}
	$(window).resize(function () {
		$('#menuBar').css('margin-left', (-1 * (($('#menuBar').width() / 2) + 10)));
		$('#menuBar').css('margin-top', (-1 * ($('#menuBar').height() + 5)));
		$('#adBlock').css('margin-left', (-1 * ($('#adBlock').width() / 2)) + 'px');
	});
	loadSocial = setTimeout(function () {
		$('#menuBar').css('margin-left', (-1 * (($('#menuBar').width() / 2) + 15)));
		$('#menuBar').css('margin-top', (-1 * ($('#menuBar').height() + 5)));
		$('#menuBar').trigger('mouseenter');
		$('#menuBar').show();
	}, 3000);
	hideSocial = setTimeout(function () {
		$('#menuBar').trigger('mouseleave');
	}, 12000);
	loadAds = setTimeout(function () {
		$('#adBlock').css('margin-left', (-1 * ($('#adBlock').width() / 2)));
		$('#adBlock').trigger('mouseenter');
		$('#adBlock').show();
	}, 3000);
	hideAds = setTimeout(function () {
		$('#adBlock').trigger('mouseleave');
	}, 12000);
	upAds = setInterval(function () {
		$('#adBlock').trigger('mouseenter');
		downAds = setTimeout(function () {
			$('#adBlock').trigger('mouseleave');
		}, 30000);
	}, 120000);
	$(function () {
		positionFooter();
		function positionFooter() {
			$('#adHolder').css({ top: ($(window).scrollTop() + $(window).height() - $('#adHolder').height()) + 'px' })
			$('#info').css({ top: ($(window).height() / 2) + 'px' });
			$('#info').css({ left: ($(window).width() / 2) + 'px' });
			$('.closeInfo').css({ top: (($(window).height() / 2) - 130) + 'px' });
			$('.closeInfo').css({ left: (($(window).width() / 2) + 155) + 'px' });
		}

		$(window)
			.scroll(positionFooter)
			.resize(positionFooter)
	});
	$('.info').click(function () {
		$('#infoBack').fadeIn('slow');
	});
	$('.closeInfo').click(function () {
		$('#infoBack').fadeOut('fast');
	});
	$(document).keyup(function (e) {
		if (e.keyCode == 27) { $('#infoBack').fadeOut('fast'); }   // esc
	});
	$('li#privacyTab').click(function () {
		$(this).css({ 'background-color': 'rgba(200, 200, 200, .7)', 'color': '#333' });
		$('#aboutTab').css({ 'background-color': 'transparent', 'color': '#ccc' });
		$('#about').hide();
		$('#privacy').show();
	});
	$('#aboutTab').click(function () {
		$(this).css({ 'background-color': 'rgba(200, 200, 200, .7)', 'color': '#333' });
		$('#privacyTab').css({ 'background-color': 'transparent', 'color': '#ccc' });
		$('#privacy').hide();
		$('#about').show();
	});
}
);