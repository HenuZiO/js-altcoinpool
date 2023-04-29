function openMinersPage() {
	let href = '#' + currentPool + '/miners/';
	$('.header__menu-link--miners').attr('href', `${href}`);

	$(document).ready(function () {
		window.location.href = href;
		window.location.reload();
	});
}
