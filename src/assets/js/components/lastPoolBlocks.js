function loadLastPoolBlocks(poolBlocksData) {
  let blockCard = ``;
  let poolBlocksCount = 0;

  let options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };

  poolBlocksData.forEach((el) => {
    const blockDate = new Date(el.created).toLocaleString('ru', options);
    const blockHeight = el.blockHeight;
    const blockMiner = stripWallet(el.miner);
    const blockEffort = (el.effort * 100).toFixed(2);
    const blockStatus = el.status;
    const blockReward = el.reward.toFixed(0);
    const blockConfirmations = (el.confirmationProgress * 100).toFixed(2);

    if (poolBlocksCount > 11) return;
    poolBlocksCount += 1;

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

  $('.stat-tabs__content-item--poolBlocks').html(blockCard);
}
