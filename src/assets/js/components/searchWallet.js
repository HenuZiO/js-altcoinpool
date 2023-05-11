function searchWalletData() {
	if ($('#searchWallet-input').val().length > 0) {
		localStorage.setItem(
			currentPool + '-searchWallet-input',
			$('#searchWallet-input').val()
		);
	}
	let href = '#' + currentPool + '/dashboard/' + $('#searchWallet-input').val();

	$(document).ready(function () {
		window.location.href = href;
		window.location.reload();
	});
}
