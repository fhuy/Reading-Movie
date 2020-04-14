const postsData = require('../../../data/posts-data')
Page({
  data: {
    postData: {},
    collected: false, 
    currentPostId: 0,
    isPlayingMusic: false  
  },
  onLoad: function(option){
    const postId = option.id,
          postData = postsData.postList[postId];
    this.setData({ 
      postData,
      currentPostId: postId                
    });
    // //如果在data上，xxx收藏状态，不存在SS中，那一回来，就没有了
    // //而每一次改动都要存在SS中，因为再打开要从它中拿
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
  },
  onCollectionTap: function(){
    const postsCollected = wx.getStorageSync('posts_collected'),
          postId = this.data.currentPostId,
          postCollected = !postsCollected[postId];
    postsCollected[postId] = postCollected;
    wx.setStorageSync('posts_collected', postsCollected)
    this.setData({
      collected: postCollected
    })
    wx.showToast({
      title: this.data.collected?"收藏成功":"取消成功",
      duration: 1000
    })
    // this.showModal(postsCollected, postCollected);    
  },
  showModal: function(postsCollected, postCollected){
    let that = this;
    console.log('that', this);
    wx.showModal({
      title: '收藏',
      content: postCollected?'收藏该文章':'取消收藏该文章',
      showCancel: 'true',
      cancelText: '取消',
      cancelColor: '#333',
      confirmText: '确认',
      confirmColor: '#405f80',
      success: function (res){
        console.log('success-this', this)
        if(res.confirm){
          // 成功后，1.更新Storage；2.更新data的collected
          wx.setStorageSync('posts_collected', postsCollected)
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  onShareTap: function(event){
    console.log('event', event)
    let that = this;
    wx.showActionSheet({
      itemList: [
        "分享给微信好友",
        "分享到朋友圈",
        "分享到QQ",
        "分享到微博",
      ],
      itemColor: "#405f80",
      success: function(res){
        console.log('that', that)
        console.log('this',this);
        console.log('res', res);
        console.log('res.cancel',res.cancel);
        console.log('tapIndex', res.tapIndex);
        console.log('itemList[tapIndex]', itemList[res.tapIndex])
        console.log('itemList[tapIndex]', that.itemList[res.tapIndex])
      }
    })
  },
  onShareAppMessage: function (res) {
    return {
      title: 'Reading&&Movies',
      path: '/pages/posts/post-detail',
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
  onMusicTap: function(){
    const BackgroundAudioManager = wx.getBackgroundAudioManager();
    if(this.data.isPlayingMusic){
      BackgroundAudioManager.pause();
      this.setData({
        isPlayingMusic: false
      })
    }else{
      // BackgroundAudioManager.src = 'http://m8.music.126.net/20200414151900/031827be9160de37d4206ab5c26a1d4c/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3'
      BackgroundAudioManager.src = 'http://m8.music.126.net/20200414105411/dac29f8c9c12e9f50fbd9427c2c107bb/ymusic/332a/ee4f/5f6a/bee5e5efcd290ef7559ae9127e630aea.mp3'
      BackgroundAudioManager.title = '此时此刻'
      BackgroundAudioManager.epname = '此时此刻'
      BackgroundAudioManager.singer = '许巍'
      BackgroundAudioManager.coverImgUrl = 'https://p1.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg'
      this.setData({
        isPlayingMusic: true
      })      
    }
  },
  requestMusic: function(){
    console.log(11111)
    wx.request({
      url: 'http://localhost:3000/song/url?id=33894312',
      success (res) {
        console.log('res.data', res.data)
        console.log('res.data.data', res.data.data)
        console.log('res.data.data[0]', res.data.data[0])
        console.log('res.data.data[0].url', res.data.data[0].url)
      }
    })
  }
})