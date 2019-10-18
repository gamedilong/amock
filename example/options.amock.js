amock([{
    path:"/testOptions", //[GET,...,All] /options/v1/testOptions
    response:{
        someProp:"some prop"
    },
    filter:function(req,res){
        /**
         * res {
         *       somethingCodes:"200", 
         *       somethingMsgs:"this is some msg" 
         *       data:{
         *          someProp:"some prop"
         *       } 
         * }
         */
        return res;
    }
}],{
    fileNameAsPathPerfix: true, // if exists the sametime.it will before urlPrefix
	urlPrefix:'/v1',
    commonResHandle:{ // need set prop handle
      handle: "data", // this is required, mock unit respone will set in this prop
      somethingCodes:"200", 
      somethingMsgs:"this is some msg"  
    }
})

/**
 * request http://localhost:3000/options/v1/testOptions  [port-> should be your ./amock/settings.json config]
 * respsone
 * {
        "somethingCodes": "200",
        "somethingMsgs": "this is some msg",
        "data": {
            "someProp": ""
        }
    }
 */