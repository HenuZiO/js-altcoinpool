function loadLastMinerPayouts(minerPaymentsData) {
  let payoutCard = ``;
  let minerPayoutCount = 0;

  if (minerPaymentsData.length > 0) {
    minerPaymentsData.forEach((el) => {
      const payoutCoinName = el.coin;
      const payoutTime = new Date(el.created).toLocaleString();
      const payoutAmount = el.amount.toFixed(5);
      const payoutAddress = stripWallet(el.address);
      const payoutTransUrl = el.transactionInfoLink;
      const payoutTransId = el.transactionConfirmationData;

      if (minerPayoutCount > 11) return;
      minerPayoutCount += 1;

      payoutCard += `
    <div class="tabs_mobile__item">
          <ul class="tabs_mobile__definitions">
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--date">
              <span class="tabs_mobile__definition">${payoutTime}</span>
              <span class="tabs_mobile__term">Date</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--amount">
              <span class="tabs_mobile__definition">${payoutAmount} ${payoutCoinName}</span>
              <span class="tabs_mobile__term">Amount</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--address">
              <span class="tabs_mobile__definition">${payoutAddress}</span>
              <span class="tabs_mobile__term">Address</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--transurl">
              <span class="tabs_mobile__definition">
                <a href="${payoutTransUrl}" class="tabs_mobile__item-link" target="_blank">Сheck transaction here</a>
              </span>
              <span class="tabs_mobile__term">Transaction URL</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--transid">
              <span class="tabs_mobile__term">Transaction ID</span>
              <span class="tabs_mobile__definition"
                >${payoutTransId}</span
              >
            </li>
          </ul>
        </div>
    `;
    });
  } else {
    payoutCard += `
    <div class="tabs_mobile__item">
          <ul class="tabs_mobile__definitions">
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--date">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Date</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--amount">
              <span class="tabs_mobile__definition">No payments yet</span>
              <span class="tabs_mobile__term">Amount</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--address">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Address</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--transurl">
              <span class="tabs_mobile__definition">
                <a class="tabs_mobile__item-link" target="_blank">No transactions</a>
              </span>
              <span class="tabs_mobile__term">Transaction URL</span>
            </li>
            <li class="tabs_mobile__definition-item tabs_mobile__definition-item--transid">
              <span class="tabs_mobile__definition">- - -</span>
              <span class="tabs_mobile__term">Transaction ID</span>
            </li>
          </ul>
        </div>
    `;
  }

  $('.stat-tabs__content-item--personalPayout').html(payoutCard);
}
