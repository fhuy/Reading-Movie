# Reading-Movie
>参考慕课课程所写，项目中大量使用template、Storage和globalData。
>- 熟练封装API
>- 对template的封装、引用，以及传值应用纯熟
>- 熟练配合Storage、globalData使用控制状态等

### 关于API
<br>*文章数据都是假数据，音乐和电影数据调用网易和豆瓣接口。*
<br>
<br>**网易音乐歌曲id、封面url始终不变，音频url一直在变，于是传入歌曲的id，每当点击播放按钮，便发起一次请求，实时获取到音频url**
### 项目难点
<br>业务逻辑上，解决了歌曲播放标识符和实际播放状态不同步的问题，加深了getBackgroundAudioManager()的理解
### 项目亮点

<br>1.灵活运用template
<br>2.es6的class封装请求电影API以及对返回数据的处理函数
<br>3.运用Js动态语言的特性，将获取到的数据实时赋值成对象的属性值
<br>4.配合数组，将获取到的start_score转换成星星颗数
<br>5.ViewCounts（查看次数）的计数方式以user实际点击文章的次数为准，而不是写死的数据（主要运用Storage和生命周期函数）

### 功能详情
<br>**1.首页**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/welcome.PNG)
<br>
<br>**2.文章列表**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/pic1.PNG)
<br>
<br>**3.文章详情**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/pic2.PNG)
<br>
<br>**4.电影首页**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/pic3.PNG)
<br>
<br>**5.更多电影**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/pic4.PNG)
<br>
<br>**6.电影详情**
<br>
<br>![image](https://github.com/fhuy/Reading-Movies/blob/master/images/pic5.PNG)
