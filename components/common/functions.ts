export const shortenText = (text:string, numOfChars:number):string => {
  if (text) {
    const appendix = text.length > numOfChars - 1 ? '...' : ''
    return text.substring(0, numOfChars) + appendix
  }
  return ''
}
