function loadMinerStats(poolData, minerData) {
	let coinName = poolData.pool.coin.name;
	let coinTicker = poolData.pool.coin.symbol;

	let minerHash = 0;
	let minerHashrate;

	let minerPendingBalance;
	let miner24hPaid;
	let minerTotalPaid;

	let minerWorkers = minerData.performance
		? Object.keys(minerData.performance.workers).length
		: '- - -';
	minerPendingBalance = minerData.pendingBalance;

	if (minerData.performance) {
		Object.keys(minerData.performance.workers).forEach(function (worker) {
			let minerWorkerHash = minerData.performance.workers[worker].hashrate;
			minerHash += minerWorkerHash;
		});
	}

	minerHashrate = minerHash ? formatHash(minerHash, 5, 'H/s') : '- - -';

	miner24hPaid = minerData.todayPaid
		? minerData.todayPaid.toFixed(2)
		: 'No payments yet';
	minerTotalPaid = minerData.totalPaid
		? minerData.totalPaid.toFixed(2)
		: 'No payments yet';

	minerStatsCard = `
          <div class="main-stats__title">
          <span class="main-stats__title-type">Miner stats</span>
          <h3 class="main-stats__title-coin">${coinName} (${coinTicker})</h3>
        </div>
        <div class="main-stats__info">
          <ul class="main-stats__list">
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Hashrate</span>
              <span class="main-stats__span-right">${minerHashrate}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Workers</span>
              <span class="main-stats__span-right">${minerWorkers}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left"></span>
              <span class="main-stats__span-right"></span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Today paid</span>
              <span class="main-stats__span-right">${miner24hPaid}</span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Pending balance</span>
              <span class="main-stats__span-right">
              ${minerPendingBalance ? minerPendingBalance : 0}
              </span>
            </li>
            <li class="main-stats__list-item">
              <span class="main-stats__span-left">Total paid</span>
              <span class="main-stats__span-right">${minerTotalPaid}</span>
            </li>
          </ul>
        </div>
  `;
	$('.main-stats__item--miner').html(minerStatsCard);
}
