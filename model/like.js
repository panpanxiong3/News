const { HTTP } = require("../util/http");

class Like extends HTTP {
      like(behavior,artid,type){
         let url = behavior == 'like' ? 'like':'like/cancel'
         this.requst({
           url: url,
           method:'POST',
           data:{
            type:type,
            art_id:artid,
           }
         })
      }
}

export {Like};