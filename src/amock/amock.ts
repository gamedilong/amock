import * as express from "express";
import *  as bodyParser from "body-parser";

import * as http from "http";
import * as vscode from "vscode";
import * as path from 'path';
import { FileUtil } from './fileUtil';
import { OutputChannel } from "./outputChannel";
import { DateUtil} from './dateUtil'

function isArray(o:any){
    return Object.prototype.toString.call(o)== '[object Array]';
}

export class AMock{
    constructor(
        public server:http.Server | null,
        private workspaceRoot: string | null,
        public app:express.Application | null
    ){
        let workspaces: vscode.WorkspaceFolder[] | undefined = vscode.workspace.workspaceFolders;
		if(workspaces){
			this.workspaceRoot = workspaces[0].uri.fsPath;
			if(!FileUtil.pathExists(path.join(this.workspaceRoot, '.amock'))) {
				FileUtil.createDefaultAMockFloder(this.workspaceRoot);
			}
		}
    }
    public start():void{
        this.app = express();
        if(this.workspaceRoot){
            this.app.use(bodyParser.json()); // for parsing application/json
            this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
            let mockConfig = FileUtil.getMockConfigList(this.workspaceRoot); 
            OutputChannel.appendLine(`Server starting in: ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")}.`);

            let port = 3000;
            if (mockConfig.defaultJSON) {
                port = mockConfig.defaultJSON.port;
            }
            this.app.all('*', function (req, res, next) {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Content-Type');
                res.header('Access-Control-Allow-Methods', '*');
                res.header('Content-Type', 'application/json;charset=utf-8');
                next();
            });
            if (mockConfig.configList && mockConfig.configList.length > 0) {
                mockConfig.configList.forEach( (item:any) =>{
                    let {data, fileName} =item
                    let {config, options} = data;
                    if (isArray(config)) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
                        // if config is array , iterate array and set each confg
                        config.forEach((c:any)=>{
                            this.setConfigItem(c, options, fileName);
                        })
                    }else if(config && typeof config === "object") {
                        // if config is object just parse and set config.
                        this.setConfigItem(config, options, fileName);
                    }
                })
            }
            this.app.all('/',function(req,res){
                OutputChannel.appendLine("Hello AMock Server");
                res.send('Hello AMock Server');
            });
            let server:any = this.app.listen(port,function(){
                OutputChannel.appendLine(`Server start success ${server.address().address} on port: ${port} in ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")} .`);
            });
            this.server = server;
        }else{
            vscode.window.showInformationMessage('before start mock server,please choose or create a workspace');
        }

    }
    private setConfigItem(config:any, options:any, fileName?:any){
        let method:any = ['all','delete','get','put','post'].indexOf(config.method) > -1 ? config.method : 'all';
        method = method.toLocaleLowerCase();
        let path:string = "";
            path = options && options.urlPrefix? `${options.urlPrefix}${config.path}`: config.path;
            path = options && options.fileNameAsPathPerfix ? `/${fileName}${path}`: path;
        let app:any = this.app;
        app[method](path,function(req:any, res:any){
            OutputChannel.appendLine(`${req.method} ${req.originalUrl} from ${req.ip}`);
            if(config.filter && typeof config.filter === "function"){
                if(options && options.commonResHandle && options.commonResHandle.handle){
                    options.commonResHandle[options.commonResHandle.handle]=config.response;
                    config.response = options.commonResHandle;
                    delete  config.response.handle;
                }
                config.response = config.filter(req,config.response) || {msg:"error: pelease return some data in you mock cofnig filter function!"};
            }
            res.send(config.response);
        });
    }
    public stop(): void{
        OutputChannel.appendLine(`Server stopping in ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")} .`);
        this.server && this.server.close();
        OutputChannel.appendLine(`Server stopped in ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")} .`);
    }
    public reload(): void{
        OutputChannel.appendLine(`Server start reload in ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")}.`);
        this.stop();
        this.start();
        OutputChannel.appendLine(`Server reload success in  ${DateUtil.formatDate(new Date(),"YYYY-MM-DD HH:mm:ss")}.`);
    }
}