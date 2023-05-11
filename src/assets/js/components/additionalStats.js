function loadAdditionalStats(poolData, poolBlocksData, minerData) {
	let reward = 0;

	for (let i = 0; i < poolBlocksData.length; i++) {
		const currentBlock = poolBlocksData[i];
		if (currentBlock.status === 'confirmed') {
			reward = Math.round(currentBlock.reward);
			break;
		}
	}

	const lastDayMinerBlocks = poolBlocksData
		.filter(el => el.miner == currentAddress)
		.filter(el => {
			let blockTime = new Date(el.created).getTime();
			let currentTime = new Date().getTime();
			if (currentTime - blockTime < 86400000) return el;
		});

	let minerHash = 0;
	if (minerData.performance) {
		Object.keys(minerData.performance.workers).forEach(function (worker) {
			let minerWorkerHash = minerData.performance.workers[worker].hashrate;
			minerHash += minerWorkerHash;
		});
	}

	let networkHashrate = Math.round(poolData.pool.networkStats.networkHashrate);

	let minerLastPayment = minerData.lastPayment
		? new Date(minerData.lastPayment).toLocaleString()
		: 'No payments yet';

	let minerLastPaymentLink = minerData.lastPaymentLink;

	let minerPendingShares = minerData.pendingShares
		? Math.round(minerData.pendingShares)
		: '0';

	let ancientBlock;
	if (lastDayMinerBlocks.length > 0) {
		ancientBlock = lastDayMinerBlocks[lastDayMinerBlocks.length - 1];
	}

	let recentBlock = lastDayMinerBlocks[0];
	let mostRecentBlockTime = recentBlock ? recentBlock.created : '';
	let mostAncientBlockTime = ancientBlock ? ancientBlock.created : '';
	let mostRecentBlockTimeInSeconds =
		new Date(mostRecentBlockTime).getTime() / 1000;
	let mostAncientBlockTimeInSeconds =
		new Date(mostAncientBlockTime).getTime() / 1000;
	let mostRecentBlockHeight = recentBlock ? recentBlock.blockHeight : '';
	let mostAncientBlockHeight = ancientBlock ? ancientBlock.blockHeight : '';

	let networkBlockTime =
		lastDayMinerBlocks.length >= 2
			? (mostRecentBlockTimeInSeconds - mostAncientBlockTimeInSeconds) /
			  (mostRecentBlockHeight - mostAncientBlockHeight)
			: 'Need more blocks to info';

	let formattedNetworkBlockTime =
		networkBlockTime < 60
			? `${networkBlockTime.toFixed(2)} secs`
			: `${(networkBlockTime / 60).toFixed(2)} mins`;

	let blocksTTF =
		minerHash != 0 ? (networkHashrate / minerHash) * networkBlockTime : 0;

	let estMinerCoins =
		reward * (86400 / networkBlockTime) * (minerHash / networkHashrate) -
		reward * (86400 / networkBlockTime) * (minerHash / networkHashrate) * 0.01;

	var blocksPer24Hrs = 86400 / blocksTTF;

	let blocksConfirmed = 0;
	for (let i = 0; i < poolBlocksData.length; i++) {
		const currentBlock = poolBlocksData[i];
		if (
			currentBlock.miner.toLowerCase() === currentAddress.toLowerCase() &&
			currentBlock.status === 'confirmed'
		) {
			blocksConfirmed++;
		}
	}

	let blocksPending = 0;
	for (let i = 0; i < poolBlocksData.length; i++) {
		const currentBlock = poolBlocksData[i];
		if (
			currentBlock.miner.toLowerCase() === currentAddress.toLowerCase() &&
			currentBlock.status === 'pending'
		) {
			blocksPending++;
		}
	}

	const htmlPendingShares = $('.additional-stats__item-text--pending').text(
		minerPendingShares
	);

	const htmlFoundedBlocks = $('.additional-stats__item-text--blocks').html(`
    ${blocksPending} <span class="additional-stats__item-text--little">(pending)</span> |
    ${blocksConfirmed} <span class="additional-stats__item-text--little">(confirmed)</span>
  `);

	const html24hEstEarnings = $('.additional-stats__item-text--esteanings')
		.html(`
    ${
			blocksTTF > 0 ? `~ ${estMinerCoins.toLocaleString()}` : '0'
		} <span class="additional-stats__item-text--little">(coins)</span> |
    ${
			blocksTTF > 0 ? `~ ${blocksPer24Hrs.toFixed(0)}` : '0'
		} <span class="additional-stats__item-text--little">(blocks)</span>
  `);

	const htmlLastPayment = $('.additional-stats__item-text--payment').text(
		minerLastPayment
	);

	const htmlLastPaymentLink = minerLastPaymentLink
		? $('.additional-stats__item-link--payment')
				.attr('href', `${minerLastPaymentLink}`)
				.text('See in explorer')
		: $('.additional-stats__item-link--payment').text('No payments yet');

	const htmlNetworkBlockTime = $(
		'.additional-stats__item-text--blocktime'
	).text(
		`${
			lastDayMinerBlocks.length >= 2
				? formattedNetworkBlockTime
				: networkBlockTime
		}`
	);
}
