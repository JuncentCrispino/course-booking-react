export const encodeDataToURL = (data) => {
  return Object
    .keys(data)
    .map(value => `${value}=${encodeURIComponent(data[value])}`)
    .join('&')
}