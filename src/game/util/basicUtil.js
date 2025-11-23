export function parseUuid(url) {
    const spiltedData = url.split("/")
    return spiltedData[spiltedData.length-1]
}

