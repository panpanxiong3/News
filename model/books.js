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
      url:'book/favor/count'
    })
  }
}

export {
  Books
};