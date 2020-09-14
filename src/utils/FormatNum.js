export default function FormatNum (x) { // 1000000 -> 1 000 000
  return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : x;
}