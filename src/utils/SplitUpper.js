export default function SplitUpper(str) { // HelloWorld -> Hello World
  return str ? str.split(/(?=[A-Z])/g).join(' ') : str;
}