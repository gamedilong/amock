# AMock README [English](README.md)|中文

该项目是一个基于express的轻量级的 mock 服务插件. 只需5分钟就可以轻松熟练的使用. 对用VScode开发的前端应用非常有用[github](https://github.com/gamedilong/amock).
## 功能
* 启动 AMock 服务
* 重载 AMock 服务
* 停止 AMock 服务
* 配置 AMock 单元
* 配置 AMock 服务
  
## 使用方法
* `安装Amock Server插件`*: 在vscode 插件搜索窗口搜索 `amock` 然后按照即可.
* `配置 AMock 服务`:当打开你的项目时 ,该插件会创建一个默认的`.amock` 文件夹 和 `./amock/setting.json`文件在你的workpace. `Setting.json` 是服务配置项, 可以按需设置.
* `配置 AMock 单元`: 你可以新增amock配置在 `./amock` floder. Amock 单元配置文件名必须按这个规则来 `*.amock.js`.
* `启动 AMock 服务`: 在VS Code的explorer最下方找到点击AMock项, 然后点击启动服务按钮 启动。当Amock output控制台启动成功，即可开始使用。可直接在 `前端工程`使用 或者用`浏览器` or `postman`等接口测试工具测试.
* `重载 Amock 服务`: 当你修改或者保存 settings.json or *.amock.js 文件. 可以在VS Code的exploer最下方的AMock项点击`重载`按钮，使修改生效

## 配置说明
* `settgin.json`: 
    ```
    {
        name:"servername",
        port:3000 // default port 3000
    }
    ```
* `*.amock.js`: 配置内容格式如下
    ```
        amock(unit| unit[], options?)
    ```
    [amock(unit) 示例](example/unit.amock.js)

    [amock(unit[],options) 示例](example/arr.amock.js)
    ### amock 单元属性说明
    prop | type | desc | required |  
    -|-|-|-
    path | string | 请求路径 | true |
    method|string|支持方式有 'all','delete','get','put','post'. 默认 'all'|false|
    response | object | 没有响应拦截器配置时返回的默认值 | true |
    filter | function | 如果需要根据不同的参数响应不同的返回值可以配置该方法 | false |

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
* `amock unit.path` : AMock 服务基于 express 4. 该path属性支持所有express支持的配置方式  [express.4 path](http://www.expressjs.com.cn/4x/api.html#path-examples).    
* `amock unit.filter`:filter方法是在返回响应值前的链接器. 该方法的 request 参数包含所有express4支持的属性 [express.4-request](http://www.expressjs.com.cn/4x/api.html#req).

* `options`: 你可以设置一个统一的响应值格式或者url前缀通过该options配置项.
 #### options prop [examples](example/options.amock.js)
prop | type | desc | required |  
-|-|-|-
fileNameAsPathPerfix | boolean | 该值为true时会默认用文件名作为接口请求的一个前缀. 默认 false| false |
urlPrefix|string|一个更灵活的设置前缀的方式|false|
commonResHandler|object|设置通用格式，uint里面的响应值会包含再handle对应的值下面 |false|
 #### commonResHandler prop [examples](example/options.amock.js)
prop | type | desc | required |  
-|-|-|-
handle|string|如果使用通用响应配置该属性必须设置,这个属性对应的值将会包含unit单元的响应值|true|
*|any|其他属性可以任意设置|false

  
## Issues

这个插件是一个很初始版如果发现了任何的bug或者有任何建议, 请提交 [issues](https://github.com/gamedilong/amock/issues) to 到GitHub Repo. 或者可以直接邮件到 1104238614@qq.com.