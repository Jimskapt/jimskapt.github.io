document.addEventListener('DOMContentLoaded', function() {
	const default_page = document.location.pathname.replace(/^(\/fr)/, '');
	const french_path = document.location.origin + '/fr' + default_page;
	const english_path = document.location.origin + default_page;

	if (navigator.language.toLowerCase().search('fr') != -1 && !document.location.pathname.toLowerCase().startsWith('/fr')) {
		fetch(french_path)
			.then(function() {
				const translation_warning_message = document.getElementById('translation-warning-message');
				if (translation_warning_message !== undefined && translation_warning_message !== null) {
					translation_warning_message.href = french_path + document.location.search;
					translation_warning_message.style.display = 'block';
					translation_warning_message.innerText = '🌐 Cette page est aussi disponible en français, cliquez ici pour la consulter !';
				}
			})
			.catch(function() {});
	} else if (navigator.language.toLowerCase().search('fr') == -1 && document.location.pathname.toLowerCase().startsWith('/fr')) {
		fetch(english_path)
			.then(function() {
				const translation_warning_message = document.getElementById('translation-warning-message');
				if (translation_warning_message !== undefined && translation_warning_message !== null) {
					translation_warning_message.href = english_path + document.location.search;
					translation_warning_message.style.display = 'block';
					translation_warning_message.innerText = '🌐 This page is also available in english, please click here to read it !';
				}
			})
			.catch(function() {});
	}
});
