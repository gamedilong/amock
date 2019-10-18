// [GET,...,All] /unit
amock({
    path:"/unit",
    response:{
        code:"1",
        msg:"success",
        data:"hello amock"
    },
    filter:function(req,req){
        return req;
    }
})