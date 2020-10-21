export default function msToTime(duration) {

  let result = '0 minute(s) ago';

  if (duration && duration < Date.now()) {
    duration = Date.now() - duration;

    let minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;

    result = hours < 1 ? minutes + ' minute(s) ago' : hours + ":" + minutes + ' ago';
  }
  
  return result;
}