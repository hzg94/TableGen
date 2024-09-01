import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';

type TableItem = {
    order_code:string
    order_total:number
    order_type:boolean
    actual_total:number
    reject_ratio:number
    status:boolean
    worker_cost:number
    worker_unit_cost:number
    worker_count:number
    file_md5:string
    client_id:number
    client_name:string
    create_time:Date
};

const columns: ProColumns<TableItem>[] = [
    {
        title: '订单编号',
        dataIndex: 'order_code',
    },
    {
        title: '订单总数',
        dataIndex: 'order_total',
    },
    {
        title: '订单类型(0为计件，1为计时)',
        dataIndex: 'order_type',
    },
    {
        title: '实收总数',
        dataIndex: 'actual_total',
    },
    {
        title: '不良品数',
        dataIndex: 'reject_ratio',
    },
    {
        title: '订单状态(0为未完成，1为完成)',
        dataIndex: 'status',
    },
    {
        title: '工人总费用',
        dataIndex: 'worker_cost',
    },
    {
        title: '工人每件/每小时费用',
        dataIndex: 'worker_unit_cost',
    },
    {
        title: '工人总数',
        dataIndex: 'worker_count',
    },
    {
        title: '文件md5',
        dataIndex: 'file_md5',
    },
    {
        title: '客户id',
        dataIndex: 'client_id',
    },
    {
        title: '客户名',
        dataIndex: 'client_name',
    },
    {
        title: '创建时间',
        dataIndex: 'create_time',
    },
];

export default () => {
    const actionRef = useRef<ActionType>();

    return (
        <ProTable<TableItem>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async (params, sort, filter) => {
                console.log(sort, filter);
                return request<{
                    data: TableItem[];
                }>('/api/demo/GetQuery', {
                    params,
                });
            }}
            editable={{
                type: 'multiple',
            }}
            columnsState={{
                persistenceKey: 'pro-table-singe-demos',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
            }}
            rowKey="id"
            search={{
                labelWidth: 'auto',
            }}
            options={{
                setting: {
                    listsHeight: 400,
                },
            }}
            pagination={{
                pageSize: 5,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"
            headerTitle="高级表格"
            toolBarRender={() => [
                <Button
                    key="button"
                    icon={<PlusOutlined />
                    }
                    onClick={() => {
                        actionRef.current?.reload();
                    }}
                    type="primary"
                >
                    新建
                </Button>,
            ]}
        />
    );
};