const postsData = require('../../../data/posts-data')
Page({
  data: {
    postData: {},
    collected: false, 
    currentPostId: 0  
  },
  onLoad: function(option){
    const postId = option.id,
          postData = postsData.postList[postId];
    this.setData({ 
      postData,
      currentPostId: postId                
    });
    // const postsCollected = wx.getStorageSync('postsCollected')||{};
    // const 
    // if(wx.getStorageSync('postsCollected')){
    //   const postsCollected = wx.getStorageSync('postsCollected')
    // }
    // //如果在data上，xxx收藏状态，不存在SS中，那一回来，就没有了
    // //而每一次改动都要存在SS中，因为再打开要从它中拿
    // //也因此是先判断没有SS，再setSS
    // if(!postsCollected[postId]){
    //   postsCollected[postId] = false;
    // }
    let postsCollected = wx.getStorageSync('posts_collected')
    if(postsCollected){
      this.setData({
        collected: postsCollected[postId]
      })  
    }
    else{
      let postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected)
    }
    // this.setData({
    //   collected: postsCollected[postId]
    // })    
  },
  onCollectionTap: function(){
    const postsCollected = wx.getStorageSync('posts_collected'),
          postId = this.data.currentPostId;
    console.log('postsCollected', postsCollected)
    console.log('postId', postId)
    this.setData({
      collected: !this.data.collected
    })
    postsCollected[postId] = this.data.collected;
    wx.setStorageSync('posts_collected', postsCollected)
    wx.showToast({
      title: this.data.collected?"收藏成功":"取消成功"
    })
    // console.log('collected', this.data.collected);
    // console.log('', wx.getStorageSync('posts_collected'))
    //应该是先把postsCollected里的属性值改变
    //再
  }
})