// components/search/index.js

import {
  keyWordsModel
} from "../../model/keywords";

import {
  Books
} from "../../model/books";
import {
  paginationBev
} from "../behavior/index"
const keywordsModel = new keyWordsModel();
const booksModel = new Books();
Component({
  behaviors: [paginationBev],
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer: 'listen_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    words: '', //搜索关键字
    historyWords: [], //历史搜索数据
    hotKeyWords: [], //热门搜索数据
    // searchWords: [], //搜索获得数据
    searching: false, //是否在搜索
    loading: false, //是否在加载数据
    loadingCent: false //loading动画是否加载
  },

  attached: function () {
    this.setHistory(); //设置历史数据
    keywordsModel.getHot().then(res => {
      let hotKeyWords = res.hot;
      this.setData({
        hotKeyWords
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onCancel() {
      this.triggerEvent('cancel', {
        cancel: true
      }, {});
    },
    onDelete() {
      this.emptyData();
      this.setData({
        searching: false
      })
    },
    /**
     * 展示搜索结果
     * @param {*} event 搜索关键字
     */
    onConfirm(event) {
      this.setData({
        searching: true
      })
      let keyword = event.detail.value || event.detail.content;
      this.emptyData(); //搜索前将搜索记录清空
      this._showLoadingCent(); //加载动画
      booksModel.searchWord(0, keyword).then(res => {
        keywordsModel.addHistory(keyword); //添加历史搜索
        this.setData({
          words: keyword,
        });
        this.setMoreWords(res.books); //设置搜索数据
        this.setTotal(res.total); //设置搜索数据总数
        this._hideLoadingCent(); //隐藏搜索动画
      })
    },
    /**
     * 设置历史搜索数据
     */
    setHistory() {
      let historyWords = keywordsModel.getHistory();
      this.setData({
        historyWords
      })
    },
    /**
     * 监听是否上拉是否到达底部
     */
    listen_more() {
      let keyWords = this.data.words;
      let length = this.data.searchWords.length;
      if (this.hasMore()) { //是否需要加载更多数据
        this._showLoading(); //展示动画
        booksModel.searchWord(length, keyWords).then(res => {
          if (!keyWords) return;
          this._showLoading() //设置正在加载，避免重复加载
          let newWords = res.books;
          let newSearchWords = this.data.searchWords.concat(newWords);
          this.setData({
            searchWords: newSearchWords, //设置最新的搜索数据
            loading: false //加载完成，允许再次加载数据
          })
        }, () => {
          this._hideLoading()//获取数据失败，仍然允许加载数据
        })
      }
    },
    /**
     * 私有方法：展示loading加载
     */
    _showLoadingCent() {
      this.setData({
        loadingCent: true
      })
    },
    /**
     * 私有方法：隐藏loading加载
     */
    _hideLoadingCent() {
      this.setData({
        loadingCent: false
      })
    },
    /**
     * 私有方法：展示loading加载
     */
    _showLoading() {
      this.setData({
        loading: true
      })
    },
    /**
     * 私有方法：隐藏loading加载
     */
    _hideLoading() {
      this.setData({
        loading: false
      })
    },
  }
})