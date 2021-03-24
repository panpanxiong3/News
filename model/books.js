import {
  HTTP
} from "../util/http-p"

class Books extends HTTP {
  getBooks() {
    return this.request({
      url: 'book/hot_list'
    })
  }

  getBooksCount() {
    return this.request({
      url: 'book/favor/count'
    })
  }
  /**
   * 获取书籍信息
   * @param {*} bid 书籍ID
   */
  getBooksDetail(bid) {
    return this.request({
      url: `book/${bid}/detail`
    })
  }
  /**
   * 获取书籍点赞数量
   * @param {*} bid 书籍ID
   */
  getBooksLikeStatus(bid) {
    return this.request({
      url: `book/${bid}/favor`
    })
  }
  /**
   * 获取书籍短评
   * @param {*} bid 书籍ID
   */
  getBooksShortComment(bid) {
    return this.request({
      url: `book/${bid}/short_comment`
    })
  }

  postTagContent(bid,content){
    return this.request({
      url:'book/add/short_comment',
      method:'POST',
      data:{
        book_id:bid,
        content:content
      }
    })
  }
}

export {
  Books
};