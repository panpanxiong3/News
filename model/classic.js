import { HTTP } from "../util/http";

class Classic extends HTTP {
    getLates(sCoadBack){
      this.request({
        url: 'classic/latest',
        success: (res) => {
          sCoadBack(res);
        }
      });
    }
}

export {Classic};