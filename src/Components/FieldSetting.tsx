import {CreateColumnDefinition} from "@/types/SQL";
import {Input, Switch} from "antd";


export const FieldSetting = (props: {
    columns: CreateColumnDefinition;
}) => {
    return (
        <div>
            Field: <Input onChange={(e) => {
            let data: Array<any> = window.plugins.getPluginData('FieldSetting')['field'] || []
            // data
            data.push({
                name: e.target.value,
                field: props.columns.column.column
            })
            window.plugins.addPluginData('FieldSetting', {
                'field': data
            })
        }} defaultValue={props.columns.column.column as string} style={{width: "50%"}}/>

            Hide: <Switch onChange={(checked) => {
            let data: Array<any> = window.plugins.getPluginData('FieldSetting')['hide'] || []
            if (checked) {
                data.push(props.columns.column.column)
                window.plugins.addPluginData('FieldSetting', {
                    'hide': data
                })
            } else {
                let TempData = []
                data.forEach(x => {
                    if(x !== props.columns.column.column){
                        TempData.push(x)
                    }
                })
                window.plugins.addPluginData('FieldSetting', {
                    'hide': data
                })
            }
        }} defaultValue={false}/>
        </div>
    )
}