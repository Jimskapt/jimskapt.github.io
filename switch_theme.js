let is_dark = true;

document.addEventListener('DOMContentLoaded', function() {

	const nav = document.getElementsByTagName('nav')[0];
	if (nav !== undefined && nav !== null) {
		const a = document.createElement('span');
		a.id = 'theme_switch';
		a.innerText = '🌕';
		a.title = 'Switch to light theme';
		a.style.cursor = 'pointer';

		a.addEventListener('click', function() {
			const links = document.getElementsByTagName('link');
			let theme = undefined;

			for(let i_links = 0; i_links < links.length; i_links++) {
				const link = links[i_links];

				if (link.getAttribute('title') == 'Theme') {
					theme = link;
					break;
				}
			}

			if (theme !== undefined) {
				is_dark = !is_dark;

				if (is_dark) {
					theme.href = '/dark_style.css';

					document.getElementById('theme_switch').innerText = '🌕';
					document.getElementById('theme_switch').title = 'Switch to light theme';
				} else {
					theme.href = '/light_style.css';

					document.getElementById('theme_switch').innerText = '🌑';
					document.getElementById('theme_switch').title = 'Switch to dark theme';
				}

				if (get_cookie('accept_cookies') === 'true') {
					document.cookie = 'dark_theme=' + is_dark + ';path=/;max-age=31536000;samesite=lax';
				} else {
					document.getElementById('accept-cookies').style.display = 'block';
				}
			}
		})

		let bar = document.createElement('span');
		bar.innerHTML = '&nbsp;|&nbsp;';
		nav.prepend(bar);
		nav.prepend(a);
	}

	const cookie_dark = get_cookie('dark_theme');
	if (cookie_dark !== undefined) {
		if (cookie_dark === 'false') {
			document.getElementById('theme_switch').click();
		}
	}
});

function get_cookie(name) {
	if (document.cookie.trim() !== '') {
		const search = document.cookie.split(';').find(function(row) { return row.trim().startsWith(name); });
		if (search === undefined) {
			return undefined;
		} else {
			return search.split('=')[1].trim();
		}
	} else {
		return undefined;
	}
}

function save_cookie(save) {
	if (save === true) {
		document.cookie = 'accept_cookies=true;path=/;max-age=31536000;samesite=lax';
		document.cookie = 'dark_theme=' + is_dark + ';path=/;max-age=31536000;samesite=lax';
	}

	document.getElementById('accept-cookies').style.display = 'none';
}
