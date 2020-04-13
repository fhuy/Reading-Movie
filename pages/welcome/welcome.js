Page({
  onTap: function(){
    wx.redirectTo({
      url: "../posts/post"
    });
  },
  onShareAppMessage: function (res) {
    return {
      title: 'Reading&&Movies',
      path: '/pages/welcome/welcome',
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
})