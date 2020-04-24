const util = require('../../utils/util.js'),
      app = getApp();
Page({
  data: {
    movies: []
  },
  onLoad: function(){
    console.log('readyData', this.data.readyData)
    const inTheatersUrl = `${app.globalData.doubanBase}/v2/movie/in_theaters?start=0&count=3&${app.globalData.doubanApikey}`;
    const comingSoonUrl = `${app.globalData.doubanBase}/v2/movie/coming_soon?${app.globalData.doubanApikey}`;
    const top250Url = `${app.globalData.doubanBase}/v2/movie/top250?${app.globalData.doubanApikey}`;
    this.getMovieListData(inTheatersUrl, "inTheaters", "正在热映");
    // this.getMovieListData(comingSoonUrl, "comingSoon", "即将上映");
    // this.getMovieListData(top250Url, "top250", "豆瓣Top250");
  },
  getMovieListData: function(url, settedKey, categoryTitle){
    let that = this;
    wx.request({
      url: url, 
      header: {
        'content-type': 'application/xml' // 默认值
      },
      method: 'GET',
      success (res) {
        that.processDoubanData(res.data, settedKey, categoryTitle)
      },
      fail: function(error) {
        console.log('error', error)
      }
    })
  },
  processDoubanData: function(moviesDouban, settedKey, categoryTitle){
    let movies = [];
    for(let idx in moviesDouban.subjects){
      let subject = moviesDouban.subjects[idx];
      let title = subject.title;
      if(title.length >= 6){
        title = title.substring(0, 6) + "...";
      }
      let temp = {
        // stars: util.convertToStarsArray(subject.rating.stars),
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id
      }
      // 三种类型的影片各有一个movies
      movies.push(temp)
    }
    console.log('movies', movies)
    this.setData({
      movies: movies
    })
    // let readyData = {};
    // readyData[settedKey] = {
    //   categoryTitle: categoryTitle,
    //   movies: movies
    // }
    // console.log('readyData', readyData)
    // this.setData(readyData);    
  }
})