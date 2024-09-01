import {CreateColumnDefinition} from "@/types/SQL";
import {PluginType} from "@/utils/Plugins";


export const FieldSetting:PluginType = {
    name: "FieldSetting",
    run(FieldData: CreateColumnDefinition[],data): any {
        let Temp = FieldData
        console.log(data)
        // field Name Setting
        if(data.field){
            data.field.forEach((x:any) => {
                for (let i = FieldData.length - 1; i >= 0; i--) {
                    // console.log(FieldData[i].column.column);
                    if(FieldData[i].column.column === x.field){
                        Temp[i].column.column = x.name
                    }
                }
            })
        }

        //field Hide
        if(data.hide){
            data.hide.forEach((x:any) => {
                for (let i = FieldData.length - 1; i >= 0; i--) {
                    if (FieldData[i].column.column === x) {

                    }
                }
            })
        }
        FieldData = Temp
        return {}
    },
}