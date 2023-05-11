function loadPoolStats(poolData, poolBlocksData) {
	const poolBlocksTimeCreatedInMs = poolBlocksData.map(el =>
		new Date(el.created).getTime()
	);

	const pool24hBlocks = poolBlocksTimeCreatedInMs.filter(el => {
		const currentTimeInMs = new Date().getTime();
		if (currentTimeInMs - el < 86400000) return el;
	});

	let coinName = poolData.pool.coin.name;
	let coinTicker = poolData.pool.coin.symbol;
	let poolHashrate = formatHash(poolData.pool.poolStats.poolHashrate, 5, 'H/s');
	let poolMiners = poolData.pool.poolStats.connectedMiners;

	let lastPoolBlock = poolData.pool.lastPoolBlockTime
		? new Date(poolData.pool.lastPoolBlockTime).toLocaleString()
		: 'No blocks on pool yet';
	let poolEffort = (poolData.pool.poolEffort * 100).toFixed(2);
	let minPayout = poolData.pool.paymentProcessing.minimumPayment;
	let poolFee = poolData.pool.poolFeePercent;

	const poolStatsCard = `
          <div class="main-stats__title">
          <span class="main-stats__title-type">Pool stats</span>
          <h3 class="main-stats__title-coin">${coinName} (${coinTicker})</h3>
        </div>
        <div class="main-stats__info">
          <ul class="main-stats__list">
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Hashrate</span>
              <span class="main-stats__span-right">${poolHashrate}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Miners</span>
              <span class="main-stats__span-right">${poolMiners}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">24h blocks</span>
              <span class="main-stats__span-right">${
								pool24hBlocks.length == 250
									? `> ${pool24hBlocks.length}`
									: pool24hBlocks.length
							}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Last block found</span>
              <span class="main-stats__span-right">${lastPoolBlock}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Pool effort</span>
              <span class="main-stats__span-right">${poolEffort} %</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Min. payout / Pool fee</span>
              <span class="main-stats__span-right">${minPayout} ${coinTicker} / ${poolFee} %</span>
            </li>
          </ul>
        </div>
  `;
	$('.main-stats__item--pool').html(poolStatsCard);
}
