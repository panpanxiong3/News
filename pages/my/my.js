// pages/my/my.js
import {
  Classic
} from "../../model/classic";
import {
  Books
} from "../../model/books";
const classicModle = new Classic();
const booksModele = new Books();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userAuthorized();
    this.getBookCount();
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
  /**
   * 跳转关于我们页面
   */
  onJumpToAbout() {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  /**
   * 跳转点击学习数量
   */
  onStudy() {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  },
  /**
   * 获取喜欢的书书籍数量
   */
  getBookCount() {
booksModele.getBooksCount().then(res=>{
  console.log("喜欢的书",res)
})
  },
  /**
   * 获取用户授权信息
   * @param {} event 授权回调信息
   */
  bindGetUserInfo(e) {

  },
  /**
   * 判断用户是否授权
   */
  userAuthorized() {
    wx.getSetting({
      withSubscriptions: true,
      success: data => {
        if (data.authSetting['scope.userInfo']) {
          // 查看是否授权
          wx.getUserInfo({
            success: data => {
              this.setData({
                userInfo: data.userInfo,
                authorized: true
              })
            }
          })
        } else {
          console.log('err');
        }
      }
    })
  },
  /**
   * 自定义组件 传递用户信息
   * @param {*} event  用户信息
   */
  onGetUserInfo(event) {
    let userInfo = event.detail.userInfo;
    if (userInfo) {
      this.setData({
        userInfo
      })
    }
  }
})