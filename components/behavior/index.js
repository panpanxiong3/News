const paginationBev = Behavior({
  data: {
    searchWords: [], //搜索获得数据
    total: null //获取搜索数据总数
  },
  methods: {
    /**
     * 设置最新加载的搜索数据
     * @param {*} words 原先加载数据
     */
    setMoreWords(words) {
      let newWords = this.data.searchWords.concat(words);
      this.setData({
        searchWords: newWords
      })
    },

    getWordsLength() {
      return this.data.searchWords.length
    },

    setTotal(data) {
      this.data.total = data
    },

    hasMore() {
      let total = this.data.total; //数据总数
      let wordsLength = this.data.searchWords.length; //当前获取数据总数
      if (wordsLength >= total) {
        return false
      } else {
        return true
      }
    },
    /**
     * 清空搜索数据
     */
    emptyData() {
      this.data.searchWords = [];
      this.data.total = 0;
    }
  }
})

export {
  paginationBev
}