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
    console.log("onready")
  },
  onShow: function(){
    console.log("onshow")
  },
  onHide: function(){
    console.log("onhide")
  },
  onUnload: function(){
    console.log("onunload")
  },
  onPostTap: function(event){
    const postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: `post-detail/post-detail?id=${postId}`
    })
  }
})