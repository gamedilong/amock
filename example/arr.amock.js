/***
 * methods supported: get,post,delete,put,all
 */
amock([{
    path:"/withoutFilter", // [GET,...,All] /withoutFilter
    response:{
        code:"200",
        msg:"success",
        data:"without filter" // or other object
    }
},{
    path:"/params/:type", // [GET,...,All]  /params/1
    response:{
        code:"200",
        msg:"success",
        data:"hello amock"
    },
    filter:function(req,res){
        if(req.params.type == 1){
            res.data = `your data is ${req.params.type}`
        }else{
            res.data = `other`
        }
        return res;
    }
},{
    path:"/query", // [GET,...,All]  /query?p=xxx&q=xxx&r[a]=11&r[b]=xx
    response:{
        code:"200",
        msg:"success",
        data:"hello query"
    },
    filter:function(req,res){
        res.data = {
            p:req.query.p,
            q:req.query.q,
            r:req.query.r
        }
        return res;
    } 
},{
    path:"/query", // [GET,...,All]  /query?p=xxx&q=xxx&r[a]=11&r[b]=xx
    response:{
        code:"200",
        msg:"success",
        data:"hello query"
    },
    filter:function(req,res){
        res.data = {
            p:req.query.p,
            q:req.query.q,
            r:req.query.r
        }
        return res;
    } 
},{
    path:"/post", // only POST application/json | application/x-www-form-urlencoded
    methods:"post",
    response:{
        code:"200",
        msg:"success"
    },
    filter:function(req,res){
        res.body = req.body; // application/x-www-form-urlencoded | application/json
        res.query = req.query;
        res.cookies = req.cookies;
        res.headers = {  // Get yourself defined header to do mock data logic.
           contentType : req.get('Content-Type'),
           Something: req.get('Something')
        }
        return res;
    } 
}])