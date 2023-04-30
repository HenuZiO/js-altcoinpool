function loadMinersOnPage(poolMinersData) {
	let payoutCard = ``;

	poolMinersData.forEach((el, index) => {
		const miner = el.miner;
		const minerHashrate = formatHash(el.hashrate, 5, 'H/s');

		payoutCard += `
    <div class="tabs_mobile__item">
          <span class="tabs_mobile__item--index">${index + 1}</span>
          <ul class="tabs_mobile__definitions">
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--date">
              <span class="tabs_mobile__definition">${miner}</span>
              <span class="tabs_mobile__term">Miner</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--amount">
              <span class="tabs_mobile__definition">${minerHashrate}</span>
              <span class="tabs_mobile__term">Hashrate</span>
            </li>
          </ul>
        </div>
    `;
	});

	$('.page-miners__miners-area').html(payoutCard);
}
