function _sl(s, c) {
	return (c || document).querySelector(s);
}

function _id(s) {
	return document.getElementById(s);
}


// /m: youtube.com

function standAloneConsentForm(l) {
	if (l.pathname == '/m') {
		var e = _sl('form[action*="consent.youtube.com/s"] button');
		
		if (e)
			e.click();
	}
}


var _i = setInterval(function() {
	var html = _sl('html');
	
	if (!html || /idc8_330/.test(html.className))
		return;
	
	clearInterval(_i);
	
	html.className += ' idc8_330';
	
	var c = 0, l = document.location, i = setInterval(function() {
		
		var e;
		
		// the 2nd step #introAgreeButton alternative may not be in use anymore
		
		if (l.hostname.split('.')[0] == 'consent') {
			var containers = document.querySelectorAll('.cui-csn-data');
			
			if (containers.length > 0) {
				var container = containers[containers.length - 1];
				
				if (l.pathname == '/intro/') {
					e = _id('introAgreeButton');
					
					if (e) {
						e.click();
					} else {
						e = _sl('a[href*="continue"]:not([href*="account"])', container);
					
						if (e)
							e.click();
					}
				}
				else if (l.pathname == '/ui/') {
					e = _sl('div[style*="none"] img[src*="keyboard_arrow_down_white"]', container);
					
					if (e) {
						_id('agreeButton').click();
						clearInterval(i);
					} else
						_sl('img[src*="keyboard_arrow_down_white"]', container).parentNode.parentNode.click();
				}
			}
			else
				standAloneConsentForm(l);
		}
		else {
			// The latest cookie popup, desktop and mobile
			
			var container = _sl('div[aria-modal="true"][style*="block"]');
			
			if (container && _sl('a[href*="policies.google.com/technologies/cookies"]', container))
				_sl('button + button', container).click();
			
			
			// General privacy reminder
			e = _sl('form[action^="/signin/privacyreminder"] > div > span > div:not([role]) > div:not([tabindex]) span + div');
			if (e) e.click();
			
			// #cns=1
			if (l.hash == '#cns=1')
				l.hash = '#cns=0';
		}
		
		c++;
		
		if (c == 300)
			clearInterval(i);
	
	}, 500);
}, 500);