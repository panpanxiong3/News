// pages/book/book.js
import {
  Books
} from "../../model/books";

import {
  random
} from "../../util/common"
const booksModel = new Books();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    books: [],
    searching: false,
    more: null //上拉屏幕获取随机字符串 
  },

  /**
   * 生命周期函数--监听页面加载
   */
   async onLoad (options) {
      let books = await booksModel.getBooks();
      this.setData({
        books
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
  /**
   * 点击搜索页面
   */
  onSearch() {
    this.setData({
      searching: true
    })
  },
  /**
   * 组件自定义事件: 取消搜索页面
   */
  onCancel(event) {
    this.setData({
      searching: false
    })
  },

  /**
   * 监听用户上拉触底事件
   */
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }
})