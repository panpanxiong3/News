import {
  config
} from '../config.js'
class HTTP {
  requst(params) {
    if (!params.method) {
      params.method = "GET";
    }
    wx.request({
      url: config.api_base_url + params.url,
      complete: (res) => {},
      data: params.data,
      fail: (res) => {},
      header: {
        'appkey': config.appkey,
        'content-type': 'application/json'
      },
      method: params.method,
      success: (result) => {
        let code = result.statusCode.toString();
        if (code.startsWith('2')) {
           params.success(result);
        } else {

        }
      },
    })
  }
}

export {
  HTTP
};