
document.querySelector('#liveSearch').oninput = function () {
    let userQuery = this.value.trim().toLowerCase();
    let sortBlocksBoxes = $('.coin-sort');
    let liveSearchResultBox = $('.search-result__container');
    let hiddenMsg = $('.search-result__hidden-msg');
    let emptySlots = $('coin-item coin-item__main--empty');

    if (userQuery != '') {
        $('.coin-item__top-title').each(function () {
            let coinCard = $(this).closest('.coin-item');
            let text = $(this).text().toLowerCase();

            if (text.includes(userQuery)) {
                coinCard.show();
                hiddenMsg.hide();
            } else {
                coinCard.hide();
                sortBlocksBoxes.hide();
                liveSearchResultBox.show();
            }
        });
    } else {
        $('.coin-item__top-title').each(function () {
            let coinCard = $(this).closest('.coin-item');
            
            coinCard.show();
            sortBlocksBoxes.show();
            liveSearchResultBox.hide();
            hiddenMsg.hide();
        });
    }
}
