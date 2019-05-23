// source: http://stackoverflow.com/a/11058858
export const ab2str = (buf) => {
  return String.fromCharCode.apply(null, new Uint8Array(buf));
}

/* string to arraybuffer (alphanumeric chars on one byte) */
export const str2ab = (str) => {
  let buf = new ArrayBuffer(str.length)
  let bufView = new Uint8Array(buf)
  for (let i=0, strLen=str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}