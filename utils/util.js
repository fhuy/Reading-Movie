// https://api.imjad.cn/cloudmusic/?type=song&id=375168
const base_Url = "https://api.imjad.cn/cloudmusic/?",
      sucCode = 200;

const searchSongId = (searchType, songId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${base_Url}type=${searchType}&id=${songId}`,
      success: (res) => resolve(res), 
      fail: (res) => reject(res)
    })
    console.log('url', `${base_Url}type=${searchType}&id=${songId}`)
  })
}

const getMoreMovies = (movieUrl, callBack) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: movieUrl,
      header: {
        'content-type': 'application/xml' // 默认值
      },
      method: 'GET',
      // success: (res) => resolve(res), 
      success: (res) => {
        callBack(res.data)
      },
      fail: (res) => reject(res)
    })
  })
}

const convertToStarsArray = (stars) => {
  let num = stars.toString().substring(0, 1);
  let array = [];
  for(let i = 1; i <= 5; i++){
    if(i <= num){
      array.push(1);
    }
    else{
      array.push(0);
    }
  }
  return array;
}



module.exports = {
  searchSongId: searchSongId,
  convertToStarsArray: convertToStarsArray,
  getMoreMovies: getMoreMovies
}
