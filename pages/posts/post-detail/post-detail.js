const postsData = require('../../../data/posts-data'),
      API = require('../../../utils/util');
var app = getApp()
Page({
  data: {
    postData: {},
    // collected: false, 
    currentPostId: 0,
    // isPlayingMusic: false  
  },
  onLoad: function(option){
    const postId = option.id,
          postData = postsData.postList[postId];
    this.setData({ 
      postData,
      currentPostId: postId                
    });
    //如果在data上，xxx收藏状态，不存在SS中，那一回来，就没有了
    //而每一次改动都要存在SS中，因为再打开要从它中拿
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
    // 解决离开页面时音乐正在播放，回来时页面音乐是停止符号
    if(app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicId === postId){
      this.setData({
        isPlayingMusic: true 
      })
    }
    this.setMusicMonitor();
  },
  setMusicMonitor: function(){
    const that = this,
          BackgroundAudioManager = wx.getBackgroundAudioManager();
    BackgroundAudioManager.onPlay(function() {
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicId = that.data.currentPostId;
      that.setData({
        isPlayingMusic: true
      }); 
    });
    BackgroundAudioManager.onPause(function() {
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicId = null;     
      that.setData({
        isPlayingMusic: false
      });        
    });
    BackgroundAudioManager.onStop(function() {
      app.globalData.g_isPlayingMusic = false;  
      that.setData({
        isPlayingMusic: false
      });
    });
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
    let musicUrl,
        currentMusic = this.data.postData.music, 
        songId = currentMusic.id;
    API.searchSongId('song', songId).then(res => {
      if(res.statusCode === 200){
        musicUrl = res.data.data[0].url;
        const BackgroundAudioManager = wx.getBackgroundAudioManager();
        if(this.data.isPlayingMusic){
          BackgroundAudioManager.pause();
          this.setData({
            isPlayingMusic: false
          })
        }else{
          BackgroundAudioManager.src = musicUrl;
          BackgroundAudioManager.title = currentMusic.title;
          BackgroundAudioManager.singer = currentMusic.author;
          BackgroundAudioManager.coverImgUrl = currentMusic.coverImg;  
          this.setData({
            isPlayingMusic: true
          })      
        }    
      }
    }).catch(res => {
      console.log(res)
    })
  }
})