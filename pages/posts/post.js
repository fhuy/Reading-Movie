let postData=require('../../data/posts-data')

Page({
  data:{
    posts_content: [],
    views: [0, 0, 0, 0, 0]
  },
  onLoad: function(options){
    this.setData({
      posts_content: postData.postList
    })
    if(!wx.getStorageSync('viewsCount')){
      wx.setStorageSync('viewsCount', this.data.views)
    }
    this.setData({
      views: wx.getStorageSync('viewsCount')
    })
  },
  onReady: function(){
  },
  onShow: function(){
  },
  onHide: function(){
  },
  onUnload: function(){
  },
  onPostTap: function(event){
    const postId = event.target.dataset.type? event.target.dataset.postid : event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`
    })
    this.data.views[postId]++;
  },
  onShareAppMessage: function (res) {
    return {
      title: 'Reading&&Movies',
      path: '/pages/posts/post',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete:function(res){
        // 不管成功失败都会执行
      }
    }
  },
  onShow: function () {
    this.setData({
      views: this.data.views  
    })
    wx.setStorageSync('viewsCount', this.data.views)
  },
})