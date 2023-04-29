function openPaymentsPage() {
	let href = '#' + currentPool + '/payments/';
	$('.header__menu-link--payments').attr('href', `${href}`);

	$(document).ready(function () {
		window.location.href = href;
		window.location.reload();
	});
}
