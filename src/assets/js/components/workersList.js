function loadWorkerList(minerData) {
  const minerWorkers = minerData.performance ? Object.entries(minerData.performance.workers) : [];

  let minerWorkerTemplate = ``;

  let workersCount = 0;

  if (minerWorkers.length > 0) {
    for (minerWorker of minerWorkers) {
      workersCount += 1;
      workerName = minerWorker[0] ? minerWorker[0] : 'Unnamed Rig';

      minerWorkerTemplate += `
            <div class="miners-hash__table-line">
            <span class="miners-hash__table-text miners-hash__table-title--number">${workersCount}</span>
            <span class="miners-hash__table-text miners-hash__table-title--worker">${workerName}</span>
            <span class="miners-hash__table-text miners-hash__table-title--hashrate">${formatHash(
              minerWorker[1].hashrate,
              3,
              'H/s',
            )}</span>
            <span class="miners-hash__table-text miners-hash__table-title--shares">${
              minerWorker[1].sharesPerSecond
            } S/s</span>
          </div>
  `;
    }
  } else {
    minerWorkerTemplate += `
            <div class="miners-hash__table-line">
            <span class="miners-hash__table-text miners-hash__table-title--number">- - -</span>
            <span class="miners-hash__table-text miners-hash__table-title--worker">No connected workers</span>
            <span class="miners-hash__table-text miners-hash__table-title--hashrate">- - -</span>
            <span class="miners-hash__table-text miners-hash__table-title--shares">- - -</span>
          </div>`;
  }

  $('.miners-hash__table-content').html(minerWorkerTemplate);
}
