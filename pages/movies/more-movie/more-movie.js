const util = require('../../../utils/util.js'),
      app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateTitle: "",
    totalCount: 0,
    isEmpty: true,
    movies: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const categoryTitle = options.title;
    wx.setNavigationBarTitle({
      title: categoryTitle
    })
    let moviesUrl = "";
    switch (categoryTitle) {
      case "正在热映":
          moviesUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?${app.globalData.doubanApikey}`; 
        break;
      case "即将上映":
          moviesUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?${app.globalData.doubanApikey}`;
        break;   
      case "豆瓣Top250":
          moviesUrl =`${app.globalData.doubanBase}/v2/movie/top250?${app.globalData.doubanApikey}`; 
        break;     
    }
    this.setData({
      requestUrl: moviesUrl
    })
    util.getMoreMovies(moviesUrl, this.processDoubanData)
  },
  processDoubanData: function (moviesDouban) {    
    let movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "...";
      }
      // [1,1,1,1,1] [1,1,1,0,0]
      var temp = {
        stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      movies.push(temp)
    }
    let totalMovies = {};
    // 经过实验，data中数据不声明就赋值也可以，但会被看做初始值是undefined，Boolean值是false
    if (!this.data.isEmpty) {
      totalMovies = this.data.movies.concat(movies);
    }
    else {
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    this.data.totalCount += 20;
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  // 原本是onScrollLower，现改成onReachBottom，或者把onScrollLower内容复制给onReachBottom，
  // 把onScrollLower注释掉
  onReachBottom: function () {
    let nextUrl = `${this.data.requestUrl}&start=${this.data.totalCount}&count=20`;
    // 我觉得没有考虑total<=20的情况
    util.getMoreMovies(nextUrl, this.processDoubanData)
    wx.showNavigationBarLoading();
  },
  onPullDownRefresh: function () {
    // 顶部/下拉刷新只会展示前20条数据
    // 把一切条件恢复到初始化时
    let refreshUrl = `${this.data.requestUrl}&start=0&count=20`;
    this.data.movies = {};
    this.data.isEmpty = true;
    this.data.totalCount = 0;
    util.getMoreMovies(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onMovieTap: function(event){
    const movieId = event.currentTarget.dataset.movieid;
    wx.navigateTo({
      url: `../movie-detail/movie-detail?id=${movieId}`
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
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {

  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})