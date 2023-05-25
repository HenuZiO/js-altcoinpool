function loadLastMinerBlocks(poolBlocksData) {
	let blockCard = ``;

	let options = {
		year: 'numeric',
		month: 'numeric',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric'
	};

	let minerBlockCount = 0;

	const minerBlocks = poolBlocksData.filter(el => {
		return el.miner == currentAddress;
	});

	if (minerBlocks.length > 0) {
		minerBlocks.forEach(el => {
			minerBlockCount += 1;
			if (minerBlockCount > 12) return;

			const blockDate = new Date(el.created).toLocaleString('ru', options);
			const blockHeight = el.blockHeight;
			const blockMiner = stripWallet(el.miner);
			const blockEffort = (el.effort * 100).toFixed(2);
			const blockStatus = el.status;
			const blockReward =
				el.reward.toFixed(0) == 0 ? el.reward.toFixed(3) : el.reward.toFixed(0);
			const blockConfirmations = (el.confirmationProgress * 100).toFixed(2);

			blockCard += `
    <div class="tabs_mobile__item">
          <ul class="tabs_mobile__definitions">
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--date2">
              <span class="tabs_mobile__definition">${blockDate}</span>
              <span class="tabs_mobile__term">Date</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--blockH">
              <span class="tabs_mobile__definition">${blockHeight}</span>
              <span class="tabs_mobile__term">Block Height</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--miner">
              <span class="tabs_mobile__definition"> ${blockMiner} </span>
              <span class="tabs_mobile__term">Miner</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--effort">
              <span class="tabs_mobile__definition">${blockEffort}%</span>
              <span class="tabs_mobile__term">Effort</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--status">
              <span class="tabs_mobile__definition">${blockStatus}</span>
              <span class="tabs_mobile__term">Status</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--reward">
              <span class="tabs_mobile__definition">${blockReward}</span>
              <span class="tabs_mobile__term">Reward</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--confirmations">
              <span class="tabs_mobile__definition">${blockConfirmations}%</span>
              <span class="tabs_mobile__term">Confirmations</span>
            </li>
          </ul>
        </div>`;
		});
	} else {
		blockCard += `
    <div class="tabs_mobile__item">
          <ul class="tabs_mobile__definitions">
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--date2">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Date</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--blockH">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Block Height</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--miner">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Miner</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--effort">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Effort</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--status">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Status</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--reward">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Reward</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--confirmations">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Confirmations</span>
            </li>
          </ul>
        </div>`;
	}

	$('.stat-tabs__content-item--minerBlocks').html(blockCard);
}
