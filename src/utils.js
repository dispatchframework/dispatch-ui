export function convertTime(ts) {
  const date = new Date(ts * 1000);
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = `0${date.getMinutes()}`;
  const seconds = `0${date.getSeconds()}`;
  const formattedTime = `${month + 1}/${day}/${year} ${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;
  return formattedTime;
}
