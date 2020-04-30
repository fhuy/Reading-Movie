// const util = require('../../../utils/util.js'),
import { Movie } from 'class/Movie.js';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // const movieId = options.id;
    const detailUrl = `${app.globalData.doubanBase}/v2/movie/subject/${options.id}?${app.globalData.doubanApikey}`;
    // util.getMoreMovies(detailUrl, this.processDoubanData);  
    const movie = new Movie(detailUrl);
    // 因为是异步，必须用callback才能获取到数据
    // const that = this;
    // movie.getMovieData(function () {
    //   that.setData({
    //     movie: movie
    //   })
    // })
    // 用箭头函数，不会因为调用方的改变而导致this改变
    movie.getMovieData((movie) => {
      this.setData({
        movie: movie
      })
    })  
  },
  // processDoubanData: function (data) {    
  //   // console.log('moviesDouban', moviesDouban)
  //   let director =  {
  //     avatar: "",
  //     name: "",
  //     id: ""
  //   }
  //   // 如果director不止一位呢
  //   if(data.directors[0] != null) {
  //     if(data.directors[0].avatars != null) {
  //       director.avatar = data.directors[0].avatars.large
  //     }
  //     director.name = data.directors[0].name;
  //     director.is = data.directors[0].id;
  //   }
  //   let movie = {
  //     movieImg: data.images ? data.images.large : "",
  //     country: data.countries[0],
  //     title: data.title,
  //     originalTitle: data.original_title,
  //     wishCount: data.wish_count,
  //     commentCount: data.comments_count,
  //     year: data.year,
  //     generes: data.genres.join("、"),
  //     stars: util.convertToStarsArray(data.rating.stars),
  //     score: data.rating.average,
  //     director: director,
  //     casts: util.convertToCastString(data.casts),
  //     castsInfo: util.convertToCastInfos(data.casts),
  //     summary: data.summary
  //   }
  //   this.setData({
  //     movie: movie
  //   })
  // },
  viewMoviePostImg: function (e) {
    var src = e.currentTarget.dataset.src;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })    
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})