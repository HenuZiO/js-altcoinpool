function loadNetworkStats(poolData, poolBlocksData) {
	let coinName = poolData.pool.coin.name;
	let coinTicker = poolData.pool.coin.symbol;

	let blockHeight = poolData.pool.networkStats.blockHeight;
	let networkHashrate = formatHash(
		poolData.pool.networkStats.networkHashrate,
		5,
		'H/s'
	);
	let networkDiff = formatHash(
		poolData.pool.networkStats.networkDifficulty,
		5,
		''
	);
	let lastChainBlock = new Date(
		poolData.pool.networkStats.lastNetworkBlockTime
	).toLocaleString();

	let blockReward = poolBlocksData[1]
		? poolBlocksData[poolBlocksData.length - 1].reward.toFixed(3)
		: 'No info';

	let formattedNetworkBlockTime;

	let ancientBlock;

	try {
		if (poolBlocksData.length > 0) {
			ancientBlock = poolBlocksData[poolBlocksData.length - 1];
		}
		let recentBlock = poolBlocksData[0] ? poolBlocksData[0] : 'No data';
		let mostRecentBlockTime = recentBlock.created;
		let mostAncientBlockTime = ancientBlock.created;
		let mostRecentBlockTimeInSeconds =
			new Date(mostRecentBlockTime).getTime() / 1000;
		let mostAncientBlockTimeInSeconds =
			new Date(mostAncientBlockTime).getTime() / 1000;
		let mostRecentBlockHeight = recentBlock.blockHeight;
		let mostAncientBlockHeight = ancientBlock.blockHeight;
		let networkBlockTime =
			(mostRecentBlockTimeInSeconds - mostAncientBlockTimeInSeconds) /
			(mostRecentBlockHeight - mostAncientBlockHeight);
		formattedNetworkBlockTime =
			networkBlockTime < 60
				? `${networkBlockTime.toFixed(2)} secs`
				: `${(networkBlockTime / 60).toFixed(2)} mins`;
	} catch (error) {
		console.log('Network AVG Blocktime - Bad request');
		console.log(error);
	}

	const networkStatsCard = `
          <div class="main-stats__title">
          <span class="main-stats__title-type">Network stats</span>
          <h3 class="main-stats__title-coin">${coinName} (${coinTicker})</h3>
        </div>
        <div class="main-stats__info">
          <ul class="main-stats__list">
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Block Height</span>
              <span class="main-stats__span-right">${blockHeight}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Hashrate</span>
              <span class="main-stats__span-right">${networkHashrate}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Difficulty</span>
              <span class="main-stats__span-right">${networkDiff}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Last block found</span>
              <span class="main-stats__span-right">${lastChainBlock}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Block reward</span>
              <span class="main-stats__span-right">
              ${blockReward}
              </span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Network AVG Blocktime</span>
              <span class="main-stats__span-right">${
								formattedNetworkBlockTime
									? formattedNetworkBlockTime
									: 'No info'
							}</span>
            </li>
          </ul>
        </div>
  `;

	$('.main-stats__item--network').html(networkStatsCard);
}
