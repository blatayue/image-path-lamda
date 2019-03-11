const axios = require('axios')
const getColors = require('get-image-colors')
const url = require('url')

module.exports = (req, res) => {
  const reqUrl = url.parse(req.url, true)
  if (!reqUrl.query.imgPath) {
    res.statusCode = 405
    res.write(JSON.stringify({ error: 'imgPath param was not sent' }))
    res.end()
    return
  }

  const img = decodeURIComponent(reqUrl.query.imgPath)
  const type = reqUrl.query.fileType
  console.log(img)
  axios.get(img, { responseType: 'arraybuffer' }).then(axiosRes =>
    getColors(axiosRes.data, `image/${type}`).then(palette => {
      console.log(palette)
      const hexPal = palette.map(color => color.hex())
      console.log(hexPal)
      res.write(JSON.stringify(hexPal))
      res.end()
    })
  )
  return
}
