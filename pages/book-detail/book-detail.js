// pages/book-detail/book-detail.js
import {
  Books
} from '../../model/books';
import {
  LikeModel
} from '../../model/like'

let booksModel = new Books();
let likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      details:null, //书籍信息
      likeStatus:false, //点赞数量
      comments:[] //短评信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let bid = options.bid;
     const details = booksModel.getBooksDetail(bid);
     const likeStatus= booksModel.getBooksLikeStatus(bid);
     const comments = booksModel.getBooksShortComment(bid);

     details.then(res=>{
       console.log("书籍信息",res);
       this.setData({
        details:res
       })
     })

     likeStatus.then(res=>{
       console.log("点赞状态",res);
      this.setData({
        likeStatus:res.like_status==0?true:false,
        likeCount:res.fav_nums
      })
    })

    comments.then(res=>{
      console.log("短评信息",res);
      this.setData({
        comments:res.comments
      })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 监听喜欢
  onLike(event){
    let behaveir = event.detail.behaveir;
    likeModel.like(behaveir,this.data.details.id,400);
  }
})