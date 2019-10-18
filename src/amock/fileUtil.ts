import * as fs from 'fs';
import * as path from 'path';
import * as vm from 'vm';
import { OutputChannel } from "./outputChannel";
import { ConfigTemplate } from "./configTemplate";

function evalMock(amockConfig:string):any{
    const sandbox = {
        amock: function(d:any,options?:any){
            sandbox.res = d;
            sandbox.options = options
        },
        res: null,
        options: null
    };
    vm.createContext(sandbox);
    try{
        vm.runInContext(amockConfig, sandbox);
    }catch(err){
        OutputChannel.appendLine(err);
    }
    return { config: sandbox.res , options: sandbox.options};
}
export class FileUtil{
    public static createDefaultAMockFloder(rootPath:string){
        OutputChannel.appendLine(`Ready to create ${path.join(rootPath, '.amock')}`);
        fs.mkdirSync(path.join(rootPath, '.amock'));
        OutputChannel.appendLine(`Create ${path.join(rootPath, '.amock')} success`);
        fs.writeFileSync(
            path.join(rootPath, '.amock','setting.json'),
            ConfigTemplate.getDefaultAMockConfigTemplate({
                name: "amock server"
            })
        );
    }
    public static getMockConfigFileList(rootPath:string):any{
        OutputChannel.appendLine(`Ready to get usefull mock config from : ${path.join(rootPath, '.amock')} floder.`);
        let mockFiles:string[] = fs.readdirSync(path.join(rootPath, '.amock'));
        let usefullMockFiles:string[] = new Array<string>();
        mockFiles && mockFiles.forEach((mockFile)=>{
            let fileStats:fs.Stats = fs.statSync(path.join(rootPath, '.amock', mockFile));
            if(fileStats.isFile()){
                usefullMockFiles.push(mockFile);
            }
        })
        OutputChannel.appendLine(`Get usefull mock config from : ${path.join(rootPath, '.amock')} success`);
        return usefullMockFiles;
    }

    public static getMockConfigList(rootPath:string): any{
        OutputChannel.appendLine(`Ready to get mock config from : ${path.join(rootPath, '.amock')} floder.`);
        let mockFiles:string[] = fs.readdirSync(path.join(rootPath, '.amock'));
        let mockConfig:any = {
            defaultJSON: null,
            configList:[]
        }
        mockFiles && mockFiles.forEach((mockFile)=>{
            let fileStats:fs.Stats = fs.statSync(path.join(rootPath, '.amock', mockFile));
            if(fileStats.isFile()){
                let config:string = fs.readFileSync(path.join(rootPath, '.amock', mockFile),'utf8');
                if(mockFile == "setting.json"){
                    mockConfig.defaultJSON = JSON.parse(config);
                }else if(mockFile.indexOf(".amock") > -1){
                    mockConfig.configList.push({data:evalMock(config),fileName:mockFile.replace(".amock.js","")}); 
                }
            }
        })
        OutputChannel.appendLine(`Get mock config from : ${path.join(rootPath, '.amock')} success`);
        return mockConfig;
    }
    public static pathExists(p: string): boolean {
		try {
			fs.accessSync(p);
		} catch (err) {
			return false;
		}

		return true;
	}   
}