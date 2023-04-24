function openBlocksPage() {
  let href = '#' + currentPool + '/blocks/';
  $('.header__menu-link--blocks').attr('href', `${href}`);

  $(document).ready(function () {
    window.location.href = href;
    window.location.reload();
  });
}
