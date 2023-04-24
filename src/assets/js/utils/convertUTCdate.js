function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  var localOffset = date.getTimezoneOffset() / 60;
  var hours = date.getUTCHours();
  newDate.setHours(hours - localOffset);
  return newDate;
}
