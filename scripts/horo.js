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
	const d=new Date();
	const clocktext = document.getElementById('clocktext');

	clocktext.innerHTML = 
		`<div>
			 <p>ANNUS</p>
			 <p>${romanize(d.getFullYear())}</p>
		 </div>
		 <div>
			 <p>MENSIS</p>
			 <p>${romanize(d.getMonth()+1)}</p>
		 </div>
		 <div>
			 <xhtmlp>DOMUS</p>
			 <p>${romanize(d.getDate())}</p>
		 </div>
		 <div>
			 <p>HORA</p>
			 <p>${romanize(d.getHours())}</p>
		 </div>
		 <div>
		 	 <p>MINUTUS</p>
		 	 <p>${romanize(d.getMinutes())}</p>
		 </div>
		 <div>
			 <p>SECUNDUS</p>
			 <p>${romanize(d.getSeconds())}</p>
		 </div>`;
	setTimeout(updateClock,1000);
}
function buildClock() {
	const clock = document.getElementById('clock');
	const content = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
	const clocktext = document.createElement('div');

	clock.setAttribute('viewBox', '0 0 1920 1080');
	content.setAttribute('x', '0');
	content.setAttribute('y', '12');
	content.setAttribute('width', '1920');
	content.setAttribute('height', '1080');
	clocktext.setAttribute('id', 'clocktext');

	clock.appendChild(content);
	content.appendChild(clocktext);

	updateClock();
}
$(function () {
	buildClock()
		var timeout = null;
		var adtimer = null;
		$('#menuBar').hover(
			function() {
				if (timeout) {
					clearTimeout(timeout);
					timeout = null;
				}
				$(this).animate({ marginTop: 0 }, 'fast');
			},
			function() {
				var initialMargin = parseInt(-1 * ($('#menuBar').height()+5));
				var menuBar = $(this);
				timeout = setTimeout(function() {
					timeout = null;
					menuBar.animate({ marginTop: initialMargin }, 'slow');
				}, 1000);
			}
		);
		$('#adBlock').hover(
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
			$('#menuBar').css('margin-left', (-1 * (($('#menuBar').width()/2)+10)));
			$('#menuBar').css('margin-top', (-1 * ($('#menuBar').height()+5)));
			$('#adBlock').css('margin-left', (-1 * ($('#adBlock').width()/2))+'px');
		});
		loadSocial = setTimeout(function()	{
			$('#menuBar').css('margin-left', (-1 * (($('#menuBar').width()/2)+15)));
			$('#menuBar').css('margin-top', (-1 * ($('#menuBar').height()+5))); 
			$('#menuBar').trigger('mouseenter');
			$('#menuBar').show();
		}, 3000);
		hideSocial = setTimeout(function() {
			$('#menuBar').trigger('mouseleave');
		}, 12000);
		loadAds = setTimeout(function()	{
			$('#adBlock').css('margin-left', (-1 * ($('#adBlock').width()/2)));
			$('#adBlock').trigger('mouseenter');
			$('#adBlock').show();
		}, 3000);
		hideAds = setTimeout(function() {
			$('#adBlock').trigger('mouseleave');
		}, 12000);
		upAds = setInterval(function()	{
			$('#adBlock').trigger('mouseenter');
			downAds = setTimeout(function() {
				$('#adBlock').trigger('mouseleave');
			}, 30000);
		}, 120000);
		$(function(){
			positionFooter(); 
			function positionFooter(){
				$('#adHolder').css({top:($(window).scrollTop()+$(window).height()-$('#adHolder').height())+'px'})	
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