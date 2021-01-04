import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Card, Switch,Button,Modal  } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm  from '@/components/InitForm'
import { setenable } from '@/services/basic'
import { connect } from 'umi'

// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 

let defaultFields = {
    equipmentNo: {
        value: null,
        type: 'select',
        title: '设备编号',
        name: ['equipmentNo'],
        required: true,
        options: [
            {
                label: "隐藏设备名称",
                value: "1"
            },
            {
                label: "正常option",
                value: "2"
            }
        ],
        //下拉框通过接口获取
        // options:{
        //   database:fetchPromise,//fetchPromise fetch(接口地址)
        //   params:{} //参数
        // }
        linked: true,//声明该formitem为联动
    },
    equipmentName: {
        value: null,
        type: 'select',
        title: '设备名称',
        name: ['equipmentName'],
        required: true,
        options: [
            {
                label: "test1",
                value: "1"
            }
        ],
        belinked: {//声明该formitem为被联动
            hides: [ //可以多个条件并存 数组内添加即可
                {
                    name: "equipmentNo", //联动的是哪个formitem
                    equalvalue: "1", //这个formitem值为多少 hide
                    //unequalvalue:"",//这个formitem值不是多少 hide  equalvalue与unequalvalue只存在1个
                    required: true
                }
            ],
            // options:{ //声明联动下拉 使用场景多级联动 ex: 省、市、区
            //   database:fetchPromise,//fetchPromise fetch(被联动时调用的接口地址) 
            //   params:{
            //    equipmentNo:"linked" //key为需要联动的formitem ，value是linked表示根据该key联动 否则使用自己填写的key传入
            //   } //参数
            // }
        }

    },
    positionNo: {
        value: null,
        type: 'input',
        title: '设备位置号',
        name: ['positionNo'],
        required: false,
    },
    date: {
        value: null,
        type: 'datepicker',
        title: '购入日期',
        name: ['date'],
        format: "YYYY-MM-DD",//返回的date格式
        required: false,
    },
    daterange: {
        value: null,
        type: 'daterange',
        title: '预计寿命',
        name: ['daterange'],
        format: "YYYY",//返回的date格式
        required: false,
    },
    remark: {
        value: null,
        type: 'editor',
        title: '备注',
        name: ['remark'],
        required: false,
        //serverURL: "https://www.mocky.io/v2/5cc8019d300000980a055e76"//替换为自己的上传地址 富文本图片/附件
        col: { span: 24 },//栅格布局 默认 12
    },
    pictureUrl: {
        value: null,
        type: 'upload',
        title: '设备图片',
        name: ['pictureUrl'],
        required: false,
        listType: "img",//上传展示类型
        limit: 1, //限制图片上传数量
        col: { span: 24 },

    },
}


function User(props) {
    const [vs, cvs] = useState(false),//表单显/隐
        [fields, cf] = useState(defaultFields),
        [iftype, ciftype] = useState({});

    const actionRef = useRef();
    const columns = [
        {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            search: false
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            search: false
        },
        {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
            search: false
        },
        {
            title: '是否启用',
            dataIndex: 'enable',
            key: 'enable',
            search: false,
            render: (_, record) => {
                return <Switch checkedChildren="启用" unCheckedChildren="停用" checked={record.enable} onChange={() => {
                    setenable({ id: record.id, enable: !record.enable }).then(res => {
                        res.code == 0 && actionRef.current.reload();
                    })
                }}></Switch>
            }
        },
        {
            title: '是否是管理员',
            dataIndex: 'is_admin',
            key: 'is_admin',
            search: false,
            render: (_, record) => {
                return record.is_admin ? "是" : "否"
            }
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
                title: "新增人员"
            })
        }}>新增</Button>
    </div>)


    return (
        <Card title={props.route.name} extra={extrarender}>
            <AutoTable
                columns={columns}
                actionRef={actionRef}
                path="/api/user"
            ></AutoTable>

            <Modal 
                maskClosable={false}
                title={iftype.title}
                visible={vs}
                onCancel={() => cvs(false)}
                footer={false}
                width={1000}
                style={{top:20}}
                destroyOnClose={true}
            >
                <InitForm
                    fields={fields}
                    submitData={(values, fn) => {
                        saveData(values, fn)
                    }}
                    onChange={(changedValues, allValues) => {
                        //联动操作


                    }}
                    submitting={
                        props.loading.effects['basic/groupsave'] || !vs
                    }
                >
                </InitForm>


            </Modal>

        </Card>
    )
}

export default connect(({ basic, loading }) => ({
    basic,
    loading,
  }))(User)