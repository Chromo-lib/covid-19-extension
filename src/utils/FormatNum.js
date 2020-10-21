export function FormatNum(x) { // 1000000 -> 1 000 000
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}

export function commarize(x) { // 1000 -> 1K / 1000000 -> 1M
  return x < 1000 ? x.toString()
    : x >= 1000 && x < 1e6
      ? x.toString().slice(0, -3) + 'K'
      : x.toString().slice(0, -6) + 'M'
}