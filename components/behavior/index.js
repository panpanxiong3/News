const paginationBev = Behavior({
  data: {
    searchWords: [], //搜索获得数据
    total: null, //获取搜索数据总数
    total: null, //获取搜索数据总数
    noneResult:false //是否有返回搜索数据
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
      this.data.total = data;
      if(this.data.total == 0){
        this.setData({
          noneResult:true
        })
      }
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
      this.setData({
        noneResult:false,
        words:''
      })
    },

     /**
     * 私有方法：展示loading加载
     */
    showLoadingCent() {
      this.setData({
        loadingCent: true
      })
    },
    /**
     * 私有方法：隐藏loading加载
     */
    hideLoadingCent() {
      this.setData({
        loadingCent: false
      })
    },
    /**
     * 私有方法：展示loading加载
     */
    showLoading() {
      this.setData({
        loading: true
      })
    },
    /**
     * 私有方法：隐藏loading加载
     */
    hideLoading() {
      this.setData({
        loading: false
      })
    }
  }
})

export {
  paginationBev
}