export default function msToTime(duration: number) {

  duration = Date.now() - duration;

  let minutes: any = Math.floor((duration / (1000 * 60)) % 60),
    hours: any = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

  return hours < 1 ? minutes + ' minute(s) ago' : hours + ":" + minutes + ' ago';
}