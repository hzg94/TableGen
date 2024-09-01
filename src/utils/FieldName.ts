import {CreateColumnDefinition} from "@/types/SQL";
import {PluginType} from "@/utils/Plugins";



export const FieldName:PluginType = {
    name: 'field',
    run(FieldData: CreateColumnDefinition[]):any {
        let Result = []
        for (let field of FieldData) {
            Result.push({
                dataIndex: field.column.column,
                //@ts-ignore
                title: field.comment ? field.comment.value.value : field.column.column
            })
        }
        return Result
    }
}
