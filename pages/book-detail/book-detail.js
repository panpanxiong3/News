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
    details: null, //书籍信息
    likeStatus: false, //点赞数量
    comments: [], //短评信息
    posting: false //输入框显示状态
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let bid = options.bid;
    const details = booksModel.getBooksDetail(bid);
    const likeStatus = booksModel.getBooksLikeStatus(bid);
    const comments = booksModel.getBooksShortComment(bid);
    //加载动画
    wx.showLoading({
      title: '加载中',
    })
    Promise.all([details, likeStatus, comments]).then(res => {
      this.setData({
        details: res[0],
        likeStatus: res[1].like_status == 0 ? true : false,
        likeCount: res[1].fav_nums,
        comments: res[2].comments
      })
      wx.hideLoading({
        success: (res) => {},
      })
    })
    //未使用Promise.all方法
    // details.then(res => {
    //   console.log("书籍信息", res);
    //   this.setData({
    //     details: res
    //   })
    // }) 
    //  likeStatus.then(res=>{
    //   this.setData({
    //     likeStatus:res.like_status==0?true:false,
    //     likeCount:res.fav_nums
    //   })
    // })

    // comments.then(res=>{
    //   console.log("短评信息",res);
    //   this.setData({
    //     comments:res.comments
    //   })
    // })
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
  onLike(event) {
    let behaveir = event.detail.behaveir;
    likeModel.like(behaveir, this.data.details.id, 400);
  },
  /**
   * 监听post输入框开启
   */
  onPosting() {
    this.setData({
      posting: true
    })
  },
  /**
   * 监听post输入框关闭
   */
  onCancel() {
    this.setData({
      posting: false
    })
  },
  /**
   * 监听标签点击事件
   * @param {*} event 组件回调信息
   */
  onPostingTag(event) {
    let content = event.detail.content || event.detail.value; //点击标签文字内容
    let bid = this.data.details.id; //书本id
    if (!content) {
      wx.showToast({
        title: '请输入评论',
        icon: 'none'
      })
    }
    if (content.length > 12) {
      wx.showToast({
        title: '请输入小于12个字符的评论',
        icon: 'none'
      })
    }
    //请求接口
    booksModel.postTagContent(bid, content).then(res => {
      if (res) {
        wx.showToast({
          title: '+1',
          icon: 'none'
        })
        this.data.comments.unshift({
          content: content,
          nums: 1
        });
        this.setData({
          comments: this.data.comments,
          posting: false
        })
      }
    })
  }
})