function loadBlankMinerPage(pool) {
  alertMessage = `
      <div class="additional-stats">
    <div class="additional-stats__item">
      <span class="additional-stats__item-text additional-stats__item-text--alert">
        <span class=" additional-stats__item-text--orange-title">
        Hey, miner!
        </span>

        Welcome to our <span class=" additional-stats__item-text--orange">${pool.toUpperCase()}</span> mining pool!
        Now you can see information about the network - its hashrate, difficulty and coin price. 
        As well as information about our pool.
        To continue working with the pool, you need to enter your wallet address in the field above. ⬆️
      </span>
    </div>
  </div>
    `;

  $('.alertMessage').html(alertMessage);
}
