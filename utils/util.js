// https://api.imjad.cn/cloudmusic/?type=song&id=375168
const base_Url = "https://api.imjad.cn/cloudmusic/?",
      sucCode = 200;
const searchSongId = (searchType, songId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${base_Url}type=${searchType}&id=${songId}`,
      // success: (res) => {
      //   if(res.code === sucCode){
      //     resolve(res);
      //   }
      //   console.log('res', res.data)
      // }, 
      success: (res) => resolve(res), 
      fail: (res) => reject(res)
    })
    console.log('url', `${base_Url}type=${searchType}&id=${songId}`)
  })
}



module.exports = {
  searchSongId: searchSongId
}
