import React, { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Card, Switch, Button, Modal, message, Popconfirm,Tag } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm from '@/components/InitForm'
import { deletetrainrecord, } from '@/services/weapp'
import { connect } from 'umi'
import moment from 'moment';


// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 



function Trainrecord(props) {
    const { weapp: { stations }, dispatch } = props;
    const [vs, cvs] = useState(false),//表单显/隐
        [fields, cf] = useState(),
        [iftype, ciftype] = useState({});
    const actionRef = useRef();
    const columns = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            search: false,
        },
        {
            title: '乘车状态',
            dataIndex: 'status',
            key: 'status',
            search: false,
            render(_,record){
                return <Tag color={record.status!=='waiting'?"grey":"green"}>{record.status!=='waiting'?"已发车":"未发车"}</Tag>
            }
        },
        {
            title: '出发时间',
            dataIndex: 'start_time',
            key: 'start_time',
            search: false,
            render: (_, record) => record.train.start_time ? moment(record.train.start_time).format("YYYY-MM-DD HH:mm") : "_"
        },
        {
            title: '出发地点',
            dataIndex: 'start_place',
            key: 'start_place',
            search: false,
            render: (_, record) => record.train.start_place
        },
        {
            title: '核载人数',
            dataIndex: 'max_people',
            key: 'max_people',
            search: false,
            render: (_, record) => record.train.max_people
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    disabled={record.status!=='waiting'} style={{ color:record.status!=='waiting'?"#999": "#1890ff" }}
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
                        deletetrainrecord(record.id).then(res => {
                            if (res.code == 0) {
                                message.success("操作成功");
                                actionRef.current.reload();
                            }
                        })
                    }}
                    okText="删除"
                    onCancel="取消"
                >
                    <a disabled={record.status!=='waiting'} style={{ color:record.status!=='waiting'?"#999": "#f50" }}>
                        删除
                    </a>
                </Popconfirm>
                ,

            ],
        },
    ]

    useMemo(() => {
        dispatch({
            type: 'weapp/stations',
        })
    }, [vs])


    let extrarender = (<div>
        <Button size={"middle"} type="primary" onClick={() => {
            cvs(true);
            cf(fields => {
                for (let i in fields) {
                    fields[i].value = undefined;
                    if (i == "end_station" || i == "start_station") {
                        fields[i].options = props.weapp.stations;
                    }
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
        if (iftype.val == "add") {
            dispatch({
                type: 'weapp/addtrainrecord',
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
                type: 'weapp/edittrainrecord',
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
        <Card title={props.route.name}>
            <AutoTable
                columns={columns}
                actionRef={actionRef}
                path="/api/train_record"
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
                        props.loading.effects['weapp/edittrainrecord'] || props.loading.effects['weapp/addtrainrecord'] || !vs
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
}))(Trainrecord)