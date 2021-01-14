import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Card, Switch, Button, Modal, message, Popconfirm } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm from '@/components/InitForm'
import { deletetrain, role, train } from '@/services/weapp'
import { connect } from 'umi'
import moment from 'moment';


// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 

let defaultFields = {
    start_station: {
        value: null,
        type: 'input',
        title: '出发地',
        name: ['start_station'],
        required: true,
        col: { span: 24 },//栅格布局 默认 12
    },
    end_station: {
        value: null,
        type: 'input',
        title: '目的地',
        name: ['end_station'],
        required: true,
        col: { span: 24 },//栅格布局 默认 12
    },
    start_time: {
        value: null,
        type: 'datepicker',
        title: '出发时间',
        name: ['start_time'],
        format:"YYYY-MM-DD HH:mm:ss",
        showTime:true,
        required: true,
        col: { span: 24 },//栅格布局 默认 12
    },
    start_place: {
        value: null,
        type: 'input',
        title: '出发地址',
        name: ['start_place'],
        required: true,
        col: { span: 24 },//栅格布局 默认 12
    },
    max_people: {
        value: null,
        type: 'inputnumber',
        title: '核载人数',
        name: ['max_people'],
        required: true,
        min:0,
        col: { span: 24 },//栅格布局 默认 12
    },
}


function Train(props) {
    const [vs, cvs] = useState(false),//表单显/隐
        [fields, cf] = useState(defaultFields),
        [iftype, ciftype] = useState({});
    const actionRef = useRef();
    const columns = [
        {
            title: '出发地',
            dataIndex: 'start_station',
            key: 'start_station',
        },
        {
            title: '目的地',
            dataIndex: 'end_station',
            key: 'end_station',
            search: false,
        },
        {
            title: '出发时间',
            dataIndex: 'start_time',
            key: 'start_time',
            search: false,
            render: (_, record) => record.start_time ? moment(record.start_time).format("YYYY-MM-DD HH:mm:ss") : "_"

        },
        {
            title: '出发地点',
            dataIndex: 'start_place',
            key: 'start_place',
            search: false,
        },
        {
            title: '核载人数',
            dataIndex: 'max_people',
            key: 'max_people',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    onClick={() => {
                        cvs(true);
                        cf(fields => {
                            for (let i in fields) {
                                fields[i].value = record[i];
                            }
                            return { ...fields }
                        });
                        ciftype({
                            val: "edit",
                            title: "编辑车次",
                            id: record.id
                        })
                    }}
                >
                    编辑
                </a>,
                <Popconfirm
                    placement="bottom"
                    title={"确认删除该车次？"}
                    onConfirm={() => {
                        deletetrain(record.id).then(res => {
                            if (res.code == 0) {
                                message.success("操作成功");
                                actionRef.current.reload();
                            }
                        })
                    }}
                    okText="删除"
                    onCancel="取消"
                >
                    <a style={{ color: "#f50" }}>
                        删除
                    </a>
                </Popconfirm>
                ,

            ],
        },
    ]

    let extrarender = (<div>
        <Button size={"middle"} type="primary" onClick={() => {
            cvs(true);
            cf(fields => {
                for (let i in fields) {
                    fields[i].value = null;
                }
                return { ...fields }
            });
            ciftype({
                val: "add",
                title: "新增车次"
            })
        }}>新增</Button>
    </div>)


    let saveData = (values) => {
        let { dispatch } = props;
        if (iftype.val == "add") {
            dispatch({
                type: 'weapp/addtrain',
                payload: values
            }).then(res => {
                if (res.code == 0) {
                    message.success("操作成功");
                    actionRef.current.reload();
                    cvs(false)
                }
            })
        } else if (iftype.val == "edit") {
            dispatch({
                type: 'weapp/edittrain',
                payload: { ...values, id: iftype.id }
            }).then(res => {
                if (res.code == 0) {
                    message.success("操作成功");
                    actionRef.current.reload();
                    cvs(false)
                }
            })
        }
    }

    return (
        <Card title={props.route.name} extra={extrarender}>
            <AutoTable
                columns={columns}
                actionRef={actionRef}
                path="/api/train"
                pagination={"false"}
            ></AutoTable>

            <Modal
                maskClosable={false}
                title={iftype.title}
                visible={vs}
                onCancel={() => cvs(false)}
                footer={false}
                width={1000}
                style={{ top: 20 }}
                destroyOnClose={true}
            >
                <InitForm
                    fields={fields}
                    submitData={(values) => {
                        saveData(values)
                    }}
                    onChange={(changedValues, allValues) => {
                        //联动操作
                    }}
                    submitting={
                        props.loading.effects['weapp/edittrain'] ||  props.loading.effects['weapp/addtrain'] || !vs
                    }
                >
                </InitForm>


            </Modal>

        </Card>
    )
}

export default connect(({ weapp, loading }) => ({
    weapp,
    loading,
}))(Train)