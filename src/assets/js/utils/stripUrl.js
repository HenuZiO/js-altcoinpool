function stripURL(url) {
  let strippedLink = url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i)[1];
  return strippedLink;
}
