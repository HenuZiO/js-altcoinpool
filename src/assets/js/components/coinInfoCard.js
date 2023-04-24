function loadPoolCardInfo(poolData) {
  let coinName = poolData.pool.coin.name;
  let coinAlgo = poolData.pool.coin.algorithm;
  let coinTicker = poolData.pool.coin.symbol;
  let coinWebsite = poolData.pool.coin.website;
  let coinExplorer = poolData.pool.addressInfoLink;
  let coinDiscord = poolData.pool.coin.discord;
  let coinTelegram = poolData.pool.coin.telegram;
  let coinTwitter = poolData.pool.coin.twitter;

  let poolWallet = poolData.pool.address;
  let poolPayoutScheme = poolData.pool.paymentProcessing.payoutScheme;
  let poolPorts = poolData.pool.ports;
  let minPayout = poolData.pool.paymentProcessing.minimumPayment;
  let poolFee = poolData.pool.poolFeePercent;

  $('.sidebar-coin__block-text').text(coinTicker);

  if (!coinWebsite) {
    $('.sidebar-coin__info-item--www').hide();
  } else {
    const wwwLink = $('.sidebar-coin__info-link--website')
      .attr('href', `${coinWebsite}`)
      .text(`${stripURL(coinWebsite)}`);
  }
  if (!coinExplorer) {
    $('.sidebar-coin__info-item--explorer').hide();
  } else {
    const explorerLink = $('.sidebar-coin__info-link--explorer').attr('href', `${coinExplorer}`);
  }
  if (!coinDiscord) {
    $('.sidebar-coin__info-item--ds').hide();
  } else {
    const discordLink = $('.sidebar-coin__info-link--discord').attr('href', `${coinDiscord}`);
  }
  if (!coinTelegram) {
    $('.sidebar-coin__info-item--tg').hide();
  } else {
    const telegramLink = $('.sidebar-coin__info-link--telegram').attr('href', `${coinTelegram}`);
  }
  if (!coinTwitter) {
    $('.sidebar-coin__info-item--twitter').hide();
  } else {
    const twitterLink = $('.sidebar-coin__info-link--twitter').attr('href', `${coinTwitter}`);
  }

  const connectName = $('.sidebar-coin__info-connect-item--coin').text(
    `${coinName} (${coinTicker})`,
  );
  const connectAlgo = $('.sidebar-coin__info-connect-item--algo').text(coinAlgo);
  const connectPoolWallet = $('.sidebar-coin__info-connect-item--poolWallet').text(
    stripWallet(poolWallet),
  );
  const connectPayoutScheme = $('.sidebar-coin__info-connect-item--payout').text(poolPayoutScheme);
  const connectMinPayment = $('.sidebar-coin__info-connect-item--minPay').text(
    `${minPayout} ${coinTicker}`,
  );
  const connectPoolFee = $('.sidebar-coin__info-connect-item--poolFee').text(`${poolFee}%`);

  let connectPorts = ``;

  Object.keys(poolPorts).forEach((key) => {
    connectPorts += `
    <li class="sidebar-coin__info-connect-item">
      <span class="sidebar-coin__info-connect-item--left">
        ${poolPorts[key].name} • Diff ${poolPorts[key].difficulty}+
      </span>
      <span class="sidebar-coin__info-connect-item--right sidebar-coin__info-connect-item--right-code">
        ru-stratum.altcoinpool.ru:${key}
      </span>
    </li>
    `;
    $('.sidebar-coin__info-connect-list--ports').html(connectPorts);
  });
}
