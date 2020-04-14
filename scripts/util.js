function formatNumer(x) { // 1000000 -> 1 000 000
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}