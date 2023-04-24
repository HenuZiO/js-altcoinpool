function loadPoolsList(poolsData) {
  let htmlTemplate = ``;

  const payoutSchemesObject = (coinName) => {
    let incomingCoinName = coinName.split('-')[0];
    let payoutSchemes = [];

    poolsData.forEach((value) => {
      if (value.coin.name.split('-')[0] == incomingCoinName) {
        payoutSchemes.push(value.paymentProcessing.payoutScheme);
      }
    });
    return payoutSchemes;
  };

  const uniquePoolAlgo = Array.from(
    new Set(
      poolsData.map((el) => {
        return el.coin.algorithm;
      }),
    ),
  );

  uniquePoolAlgo.forEach(function (algo) {
    coinFilterResult = poolsData.filter(function (element) {
      elementCoinName = element.coin.name;
      return element.coin.algorithm == algo && elementCoinName.split('-')[1] != 'SOLO';
    });

    htmlTemplate += `
      <div class="sidebar-coin__algo-title">
        ${algo}
      </div>
      <div class="sidebar-coin__content">
    `;

    Object.keys(coinFilterResult).forEach((data) => {
      let localCoinId = coinFilterResult[data].id;
      let localCoinName = coinFilterResult[data].coin.name;
      let localCoinTicker = coinFilterResult[data].coin.symbol;
      let localCoinLogo = `https://altcoinpool.ru/img/coin/icon/${coinFilterResult[
        data
      ].coin.type.toLowerCase()}.png`;
      let localPayoutScheme = payoutSchemesObject(localCoinName);

      htmlTemplate += `
        <div class="sidebar-coin__coin-item" href='#${localCoinId}/dashboard/'>
        <div class="sidebar-coin__coin-item--left">
        <img class="sidebar-coin__coin-img" src="${localCoinLogo}" alt="">
        <h4 class="sidebar-coin__coin-title">${localCoinName} (${localCoinTicker})</h4>
        </div>
        <div class="sidebar-coin__coin-item--right">
        <ul class="sidebar-coin__coin-props">
        <li class="sidebar-coin__coin-prop"><a class="sidebar-coin__coin-prop--link" href="#${localCoinId}/dashboard/">${localPayoutScheme[0]}</a></li>
        <li class="sidebar-coin__coin-prop"><a class="sidebar-coin__coin-prop--link" href="#${localCoinId}-solo/dashboard/">${localPayoutScheme[1]}</a></li>
        </ul>
        </div>
        </div>
      `;
    });
    htmlTemplate += `</div>`;
  });

  $('.sidebar-coin__blocks-location').html(htmlTemplate);

  $(document).ready(function () {
    $('.sidebar-coin__coin-prop--link').on('click', function (event) {
      let href = $(this).attr('href');
      if (href) {
        window.location.href = href;
        window.location.reload();
      }
    });
  });
}
