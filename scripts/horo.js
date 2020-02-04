function romanize(num) {
	if (!+num)
		return '&nbsp;';
	var	digits = String(+num).split(''),
		key = ['','C','CC','CCC','CD','D','DC','DCC','DCCC','CM',
			   '','X','XX','XXX','XL','L','LX','LXX','LXXX','XC',
			   '','I','II','III','IV','V','VI','VII','VIII','IX'],
		roman = '',
		i = 3;
	while (i--)
		roman = (key[+digits.pop() + (i * 10)] || '') + roman;
	return Array(+digits.join('') + 1).join('M') + roman;
}
function updateClock(){
	d=new Date();
	document.getElementById('clock').innerHTML = 
		'<div><p>ANNUS</p><p>' +
		romanize(d.getFullYear()) +
		'</p></div><div><p>MENSIS</p><p>' +
		romanize(d.getMonth()+1) +
		'</p></div><div><p>DOMUS</p><p>' +
		romanize(d.getDate()) +
		'</p></div><div><p>HORA</p><p>' +
		romanize(d.getHours()) +
		'</p></div><div><p>MINUTUS</p><p>' +
		romanize(d.getMinutes()) +
		'</p></div><div><p>SECUNDUS</p><p>' +
		romanize(d.getSeconds()) +
		'</p></div>';
	setTimeout(updateClock,1000);
}
$(function () {
		updateClock();
		var timeout = null;
		var adtimer = null;
		$('#clock').fitText(1.5);
		$('footer').fitText(.5); 
		$('#socialBar').hover(
			function() {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				$(this).animate({ marginTop: 0 }, 'fast');
			},
			function() {
				var initialMargin = parseInt(-1 * ($('#socialBar').height()+5));
				var menuBar = $(this);
				timeout = setTimeout(function() {
					timeout = null;
					menuBar.animate({ marginTop: initialMargin }, 'slow');
				}, 1000);
			}
		);
		$('#addBlock').hover(
			function() {
				if (adtimer) {
					clearTimeout(adtimer);
					adtimer = null;
				}
				$(this).animate({ height: 68 }, 'fast');
			},
			function() {
				var menuBar = $(this);
				adtimer = setTimeout(function() {
					adtimer = null;
					menuBar.animate({ height: 8 }, 'slow');
				}, 1000);
			}
		);
		if (location.search.search(/container/i) != -1) {
			$('.igoogle').hide();
		}
		$(window).resize(function() {
			$('#socialBar').css('margin-left', (-1 * (($('#socialBar').width()/2)+10)));
			$('#socialBar').css('margin-top', (-1 * ($('#socialBar').height()+5)));
			$('#addBlock').css('margin-left', (-1 * ($('#addBlock').width()/2))+'px');
		});
		loadSocial = setTimeout(function()	{
			$('#socialBar').css('margin-left', (-1 * (($('#socialBar').width()/2)+15)));
			$('#socialBar').css('margin-top', (-1 * ($('#socialBar').height()+5))); 
			$('#socialBar').trigger('mouseenter');
			$('#socialBar').show();
		}, 3000);
		hideSocial = setTimeout(function() {
			$('#socialBar').trigger('mouseleave');
		}, 12000);
		loadAdds = setTimeout(function()	{
			$('#addBlock').css('margin-left', (-1 * ($('#addBlock').width()/2)));
			$('#addBlock').trigger('mouseenter');
			$('#addBlock').show();
		}, 3000);
		hideAdds = setTimeout(function() {
			$('#addBlock').trigger('mouseleave');
		}, 12000);
		upAdds = setInterval(function()	{
			$('#addBlock').trigger('mouseenter');
			downAdds = setTimeout(function() {
				$('#addBlock').trigger('mouseleave');
			}, 30000);
		}, 120000);
		$(function(){
			positionFooter(); 
			function positionFooter(){
				$('#addHolder').css({top:($(window).scrollTop()+$(window).height()-$('#addHolder').height())+'px'})	
				$('#info').css({top:($(window).height()/2) + 'px'});
				$('#info').css({left:($(window).width()/2) + 'px'});
				$('.closeInfo').css({top:(($(window).height()/2)-130) + 'px'});
				$('.closeInfo').css({left:(($(window).width()/2)+155) + 'px'});
			}
		 
			$(window)
				.scroll(positionFooter)
				.resize(positionFooter)
		});
		$('.info').click(function(){
			$('#infoBack').fadeIn('slow');
		});
		$('.closeInfo').click(function(){
			$('#infoBack').fadeOut('fast');
		});
		$(document).keyup(function(e) {
			if (e.keyCode == 27) { $('#infoBack').fadeOut('fast'); }   // esc
		});
		$('li#privacyTab').click(function() {
			$(this).css({'background-color': 'rgba(200, 200, 200, .7)', 'color': '#333'});
			$('#aboutTab').css({'background-color': 'transparent', 'color': '#ccc'});
			$('#about').hide();
			$('#privacy').show();
		});
		$('#aboutTab').click(function() {
			$(this).css({'background-color': 'rgba(200, 200, 200, .7)', 'color': '#333'});
			$('#privacyTab').css({'background-color': 'transparent', 'color': '#ccc'});
			$('#privacy').hide();
			$('#about').show();
		});
	}
);
var addthis_config = {
	data_ga_property: 'UA-25833530-1',
	data_ga_social : true
};

var addthis_share = {
	url: 'http://web.archive.org/web/20151103115427/http://horologium.rspct.us'
}
