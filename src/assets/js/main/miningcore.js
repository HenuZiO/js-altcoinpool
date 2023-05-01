const WebURL = 'https://altcoinpool.ru';
const API = 'https://api.altcoinpool.ru/api';
const stratumAddress = 'stratum.altcoinpool.ru';

const getProjectData = () =>
	Promise.all([
		getPoolsData(),
		getPoolData(),
		getPoolBlocksData(),
		getPoolPaymentsData(),
		getMinersData(),
		getMinerData(),
		getMinerPaymentsData()
	]).then(data => {
		poolsData = data[0].pools;
		poolData = data[1];
		poolBlocksData = data[2];
		poolPaymentData = data[3];
		poolMinersData = data[4];
		minerData = data[5];
		minerPaymentsData = data[6];

		switch (currentPage) {
			case 'dashboard':
				$('.main-index').hide();
				$('.sidebar').hide();
				$('.page-blocks').hide();
				$('.page-miners').hide();
				$('.page-payments').hide();
				$('.sidebar-coin').show();
				$('.page-dashboard').show();
				loadDashboardPage(
					poolsData,
					poolData,
					poolBlocksData,
					poolPaymentData,
					minerData,
					minerPaymentsData
				);
				break;
			case 'blocks':
				$('.main-index').hide();
				$('.sidebar').hide();
				$('.sidebar-coin').show();
				$('.page-dashboard').hide();
				$('.page-payments').hide();
				$('.page-miners').hide();
				$('.page-blocks').show();
				loadBlocksPage(poolsData, poolBlocksData);
				break;
			case 'payments':
				$('.main-index').hide();
				$('.sidebar').hide();
				$('.page-dashboard').hide();
				$('.page-blocks').hide();
				$('.page-miners').hide();
				$('.sidebar-coin').show();
				$('.page-payments').show();
				loadPaymentsPage(poolsData, poolPaymentData);
				break;
			case 'miners':
				$('.main-index').hide();
				$('.sidebar').hide();
				$('.page-dashboard').hide();
				$('.page-blocks').hide();
				$('.page-payments').hide();
				$('.sidebar-coin').show();
				$('.page-miners').show();
				loadMinersPage(poolsData, poolMinersData);
				break;
			default:
				$('.header__menu-list').hide();
				$('.header__burger').hide();
				$('.header__mobile-menu-list').hide();
				$('.header__menu--right').hide();
				$('.sidebar-coin').hide();
				$('.page-dashboard').hide();
				$('.page-blocks').hide();
				$('.page-miners').hide();
				$('.page-payments').hide();
				$('.main-index').show();
				$('.sidebar').show();
				loadHomePage(poolsData);
		}
	});

function loadDashboardPage(
	poolsData,
	poolData,
	poolBlocksData,
	poolPaymentData,
	minerData,
	minerPaymentsData
) {
	loadPoolCardInfo(poolData);
	loadPoolsList(poolsData);
	loadNetworkStats(poolData, poolBlocksData);
	loadPoolStats(poolData, poolBlocksData);

	if (currentPool && currentAddress) {
		loadMinerStats(poolData, minerData);
		loadAdditionalStats(poolData, poolBlocksData, minerData);
		loadWorkerList(minerData);
		loadMinerGraph(minerData);
		loadLastMinerPayouts(minerPaymentsData);
		loadLastMinerBlocks(poolBlocksData);
		loadLastPoolBlocks(poolBlocksData);
		lastPoolPayouts(poolPaymentData);
	}

	if (currentPool && !currentAddress) {
		$('.main-stats__item--miner').hide();
		$('.additional-stats').hide();
		$('.miners-hash').hide();
		$('.stat-tabs').hide();
		loadBlankMinerPage(currentPool);
	}
}

function loadBlocksPage(poolsData, poolBlocksData) {
	$('.sidebar-coin__block-title--not').hide();
	$('.sidebar-coin__content--not').hide();
	loadPoolsList(poolsData);
	loadBlocksOnPage(poolBlocksData);
}

function loadPaymentsPage(poolsData, poolPaymentData) {
	$('.sidebar-coin__block-title--not').hide();
	$('.sidebar-coin__content--not').hide();
	loadPoolsList(poolsData);
	loadPaymentsOnPage(poolPaymentData);
}

function loadMinersPage(poolsData, poolMinersData) {
	$('.sidebar-coin__block-title--not').hide();
	$('.sidebar-coin__content--not').hide();
	loadPoolsList(poolsData);
	loadMinersOnPage(poolMinersData);
}
