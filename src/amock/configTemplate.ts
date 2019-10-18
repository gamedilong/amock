export class ConfigTemplate{
    public static getDefaultAMockConfigTemplate(config:any):string{
        return `
{
    "name": "${config.name}",
    "port":"${config.prot | 3000}"
}
        `
    }    
}