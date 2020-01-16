module.exports = {
    transformStringInArray(string) {
        return string.split(",").map(item => item.trim())
    }
}