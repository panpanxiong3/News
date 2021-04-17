// components/search/index.js

import {
  keyWordsModel
} from "../../model/keywords";

import {
  Books
} from "../../model/books"
const keywordsModel = new keyWordsModel();
const booksModel = new Books();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    more: {
      type: String,
      observer:'listen_more'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    words: '', //搜索关键字
    historyWords: [], //历史搜索数据
    hotKeyWords: [], //热门搜索数据
    searchWords: [], //搜索获得数据
    searching: false, //是否在搜索
    loading:false, //是否在加载数据
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
      this.setData({
        searching: false
      })
    },
    /**
     * 搜索框
     * @param {*} event 搜索关键字
     */
    onConfirm(event) {
      this.setData({
        searching: true
      })
      let keyword = event.detail.value || event.detail.content;
      booksModel.searchWord(0, keyword).then(res => {
        keywordsModel.addHistory(keyword); //添加历史搜索
        this.setData({
          searchWords: res.books,
          words: keyword
        })
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
      if(loading) return
      booksModel.searchWord(length,keyWords).then(res=>{
        if(!keyWords) return;
        this.data.loading = true; //设置正在加载，避免重复加载
        let newWords = res.books;
        let newSearchWords=this.data.searchWords.concat(newWords);
        this.setData({
          searchWords:newSearchWords, //设置最新的搜索数据
          loading:false //加载完成，允许再次加载数据
        })
      })
    }
  }
})