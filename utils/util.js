// https://api.imjad.cn/cloudmusic/?type=song&id=375168
const base_Url = "https://api.imjad.cn/cloudmusic/?";

const searchSongId = (searchType, songId) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${base_Url}type=${searchType}&id=${songId}`,
      success: (res) => resolve(res), 
      fail: (res) => reject(res)
    })
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

const convertToCastString = (casts) => {
  let castNames = [];
  casts.forEach(cast => {
    castNames.push(cast.name)
  })
  return castNames.join('/')
}

const convertToCastInfos = (casts) => {
  let castsInfos = [];
  casts.forEach(cast => {
    let castinfo = {
      img: cast.avatars ? cast.avatars.large : "",
      name: cast.name
    }
    castsInfos.push(castinfo);
  })
  return castsInfos
}

module.exports = {
  searchSongId: searchSongId,
  convertToStarsArray: convertToStarsArray,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos,
  getMoreMovies: getMoreMovies
}
