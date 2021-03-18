// pages/classic/classic.js
import {
  Classic
} from '../../model/classic';

import {
  LikeModel
} from '../../model/like';
let classicModel = new Classic();
let likeModel = new LikeModel();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    first: true, //是否为最新一期
    latest: false, //是否为最后一期
    likeCount: 0, //点赞数
    likeState: false // 是否点赞
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    classicModel.getLatest((res) => {
      this.setData({
        classicData: res,
        likeCount:res.fav_nums,
        likeState:res.like_status==0?true:false
      })
    })
  },


  // 监听是否喜欢
  onLike: function (event) {
    let behaveir = event.detail.behaveir;
    likeModel.like(behaveir, this.data.classicData.id, this.data.classicData.type);
  },
  /**
   * 监听navi组件向左切换动作
   */
  onNext: function () {
    this._setClassic('next')
  },

  /**
   * 监听navi组件向右切换动作
   */
  onPrevious: function () {
    this._setClassic('previous')
  },
  /**
   * 设置当前期刊信息
   * @param {*} direction 点击方向 
   */
  _setClassic: function (direction) {
    let index = this.data.classicData.index;
    classicModel.getClassic(index, direction, (res) => {
      this.setData({
        classicData: res,
        first: classicModel.isFirst(res.index),
        latest: classicModel.isLaster(res.index)
      });
      this._setClassicLikeState(res.id,res.type);
    })
  },
  _setClassicLikeState: function (artid, category) {
    likeModel.getClassicLikeStatus(artid, category, (res) => {
      this.setData({
        likeCount: res.fav_nums,
        likeState: res.like_status == 0 ? true : false
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

  }
})