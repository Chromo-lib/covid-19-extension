export default function SplitUpper(str: string): string {
  return str ? str.split(/(?=[A-Z])/g).join(' ') : str;
}