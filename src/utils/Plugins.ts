import {CreateColumnDefinition} from "@/types/SQL";

export interface PluginType {
    name: string,

    run: (Ast: CreateColumnDefinition[], data?: any) => any,

    configPage?: React.ReactNode
}

declare global {
    interface Window {
        plugins: PluginsType;
    }
}

interface PluginsType {
    resign: (Plugin: PluginType) => void,
    execute: (Ast: CreateColumnDefinition[]) => Map<string, any>
    getAllConfigPage: () => React.ReactNode,

    addPluginResult: (pluginName: string, pluginResult: any) => void,
    getPluginResult: (pluginName: string) => any

    addPluginData: (pluginName: string, pluginResult: any) => void,
    getPluginData: (pluginName: string) => any
}

export const Plugins = (): PluginsType => {
    let ArrayPlugins: PluginType[] = [];
    let PluginsResult = new Map()
    let PluginsData = new Map()

    return {
        resign: (Plugin: PluginType) => {
            ArrayPlugins.push(Plugin)
        },

        addPluginResult: (pluginName: string, pluginResult: any) => {
            PluginsResult.set(pluginName, pluginResult)
        },
        getPluginResult: (pluginName: string) => {
            return PluginsResult.get(pluginName)
        },

        addPluginData: (pluginName: string, pluginData: any) => {
            let data = PluginsData.get(pluginName)
            PluginsData.set(pluginName, {
                ...data,
                ...pluginData
            })
        },

        getPluginData: (pluginName: string) => {
            return PluginsData.get(pluginName) || {}
        },

        execute: (Ast: CreateColumnDefinition[]) => {
            let data = JSON.parse(JSON.stringify(Ast))
            ArrayPlugins.forEach(x => {
                PluginsResult.set(x.name, x.run(data, PluginsData.get(x.name)));
            })
            return PluginsResult
        },

        getAllConfigPage: () => {
            return ArrayPlugins.filter(p => p.configPage).map(x => x.configPage)
        }

    }

}