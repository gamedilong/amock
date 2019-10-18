# AMock README

It's a lightweight mock server plugin based on express. No more than 5 minutes of skilled use. It's useful when you develop frontend applications with VS Code [github](https://github.com/gamedilong/amock).
Document [中文](README.cn.md)
## Features
* Start AMock Server
* Reload AMock Server
* Stop AMock Server
* Config AMock Unit
* Config AMock Server
  
## Usage
* `Install Amock Server`*: Search `amock` in vscode exstention exploer and install it.
* `Config AMock Server`: When you open workspace ,this plugin while create a default `.amock` floder and `./amock/setting.json` in your workspace. `Setting.json` is the server config, you can modify it to adapt your requirements.
* `Config AMock Unit`: You can add amock unit config in `./amock` floder. Amock unit config file name must like `*.amock.js`.
* `Run AMock Server`: To start AMock Server. In Explorer of VS Code,click "AMock" in the bottom left corner, then click the start button to run amock server.When start success, you can use it in your `frontend project` or test it with `browser` or `postman`.
* `Reload Amock Server`: When you modify and save settings.json or *.amock.js files. in Explorer of VS Code in the bottom left corner , then click the reload button to reload config

## Setting
* `settgin.json`: 
    ```
    {
        name:"servername",
        port:3000 // default port 3000
    }
    ```
* `*.amock.js`: .amock.js config like this 
    ```
        amock(unit| unit[], options?)
    ```
    [amock(unit) Example](example/unit.amock.js)

    [amock(unit[],options) Example](example/arr.amock.js)
    ### amock unit prop description 
    prop | type | desc | required |  
    -|-|-|-
    path | string | The request path | true |
    method|string|Suported 'all','delete','get','put','post'. Default 'all'|false|
    response | object | This is the default res when there are no filter | true |
    filter | function | If need return different res with different request can use this filter, it has two param and should return a new response. | false |

    ```
    amock({
        path:"/hello",
        response:{
            code:1,
            msg:"success",
            data:{
                hello: "amock"
            }
        },
        filter:function(request,response){
            return response;
        }
    })
    ```
* `amock unit.path` : AMock Server is based on express 4. The path have all features [express.4 path](http://www.expressjs.com.cn/4x/api.html#path-examples) supported.    
* `amock unit.filter`: Filter is a call back function before server send response. The request param have all props [express.4-request](http://www.expressjs.com.cn/4x/api.html#req) supported.

* `options`: You can set common reponse format, url perfixed with options.
 #### options prop [examples](example/options.amock.js)
prop | type | desc | required |  
-|-|-|-
fileNameAsPathPerfix | boolean | If set true, current amock config name will be urlprefix. default is false| false |
urlPrefix|string|set a editable url prefix|false|
commonResHandler|object|when you set this prop,response will hanbled by this handle |false|
 #### commonResHandler prop [examples](example/options.amock.js)
prop | type | desc | required |  
-|-|-|-
handle|string|it must be set when you use commHandler,this value will be prop container amock unit response|true|
*|any|you can set anything you common repsone should have|false

  
## Issues

Currently, the extension is in the very initial phase. If you find any bug or have any suggestion/feature request, please submit the [issues](https://github.com/gamedilong/amock/issues) to the GitHub Repo. Or you can send email to 1104238614@qq.com.
