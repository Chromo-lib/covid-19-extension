export default function SplitUpper(str: string): string { // HelloWorld -> Hello World
  return str ? str.split(/(?=[A-Z])/g).join(' ') : str;
}