var postData=require('../../data/posts-data')
Page({
  data:{
    posts_content: [],
  },
  onLoad: function(options){
    this.setData({
      posts_content: postData.postList
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
    const postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`
    })
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
  }
})