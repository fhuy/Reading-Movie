Page({
  data: {
  },
  onLoad: function(){

  },
  toMusicList: function(){
    wx.navigateTo({
      url: 'music-lists/music-lists.wxml',
    })
  }
})