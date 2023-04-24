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
    getMinerPaymentsData(),
  ]).then((data) => {
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
        $('.sidebar-coin').show();
        $('.page-dashboard').show();
        $('.page-blocks').hide();
        loadDashboardPage(
          poolsData,
          poolData,
          poolBlocksData,
          poolPaymentData,
          minerData,
          minerPaymentsData,
        );
        break;
      case 'blocks':
        $('.main-index').hide();
        $('.sidebar').hide();
        $('.sidebar-coin').show();
        $('.page-dashboard').hide();
        $('.page-blocks').show();
        loadBlocksPage(poolsData, poolBlocksData);
        break;
      default:
        $('.main-index').show();
        $('.header__menu--right').hide();
        $('.sidebar').show();
        $('.sidebar-coin').hide();
        $('.page-dashboard').hide();
        $('.page-blocks').hide();
        loadHomePage(poolsData);
    }
  });

function loadDashboardPage(
  poolsData,
  poolData,
  poolBlocksData,
  poolPaymentData,
  minerData,
  minerPaymentsData,
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
