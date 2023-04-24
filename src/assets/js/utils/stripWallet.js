function stripWallet(wallet) {
  let strippedWallet = wallet.substring(0, 12) + '...' + wallet.substring(wallet.length - 12);
  return strippedWallet;
}
