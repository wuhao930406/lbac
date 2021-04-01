import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Card, Switch, Button, Modal, message, Popconfirm } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm from '@/components/InitForm'
import { deleterole, menu, getrole } from '@/services/basic'
import { connect,useRequest } from 'umi'

// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 

let defaultFields = {
    name: {
        value: null,
        type: 'input',
        title: '角色名称',
        name: ['name'],
        required: true,
    },
    description: {
        value: null,
        type: 'textarea',
        title: '备注',
        name: ['description'],
        required: false,
        //serverURL: "https://www.mocky.io/v2/5cc8019d300000980a055e76"//替换为自己的上传地址 富文本图片/附件
        col: { span: 24 },//栅格布局 默认 12
    },
}, quan = [
    {
        path: '/basic',
        name: '系统基础管理',
        icon: 'setting',
        routes: [
            {
                path: '/basic/user',
                name: '用户管理',
                component: './Basic/User',
            },
            {
                path: '/basic/role',
                name: '角色管理',
                component: './Basic/Role',
            },
            {
                path: '/basic/menu',
                name: '菜单权限',
                component: './Basic/Menu',
            },
        ],
    },
    {
        path: '/weapp',
        name: '公众号信息管理',
        icon: 'wechat',
        routes: [
            {
                path: '/weapp/member',
                name: '会员管理',
                component: './Weapp/Member',
            },
            {
                path: '/weapp/customer',
                name: '客服管理',
                component: './Weapp/Customer',
            },

            {
                path: '/weapp/store',
                name: '门店管理',
                component: './Weapp/Store',
            },
            {
                path: '/weapp/factory',
                name: '工厂管理',
                component: './Weapp/Factory',
            },
            {
                path: '/weapp/train',
                name: '车次管理',
                component: './Weapp/Train',
            },
            {
                path: '/weapp/keyword',
                name: '招聘岗位关键词',
                component: './Weapp/Keyword',
            },
            {
                path: '/weapp/classify',
                name: '招聘岗位分类',
                component: './Weapp/Classify',
            },
            {
                path: '/weapp/recruit',
                name: '招聘岗位管理',
                component: './Weapp/Recruit',
            },
            {
                path: '/weapp/enroll',
                name: '报名信息管理',
                component: './Weapp/Enroll',
            },
            {
                path: '/weapp/banner',
                name: '公众号轮播图',
                component: './Weapp/Banner',
            },
        ],
    }]


function Role(props) {
    const [vs, cvs] = useState(false),//表单显/隐
        [fields, cf] = useState(defaultFields),
        [iftype, ciftype] = useState({});

    const actionRef = useRef();
    const columns = [
        {
            title: '角色名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '角色类型',
            dataIndex: 'role_type',
            key: 'role_type',
            search: false,
            render: (_, record) => <span>{record.role_type == 0 ? "自定义角色" : "系统角色"}</span>
        },
        {
            title: '备注',
            dataIndex: 'description',
            key: 'description',
            search: false,
        },
        {
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a onClick={() => {
                    getrole(record.id).then(res=>{
                        let menu_ids = res.data.menu_ids;
                        let defaultval =  menu_ids?menu_ids.map((it)=>{
                            let res = data.filter((item)=>item.id==it);
                            return res?res[0].path:''
                        }) :[]  
                        

                        cf({
                            menu_ids: {
                                value: defaultval?defaultval:[],
                                type: 'treeselect',
                                title: '菜单权限',
                                name: ['menu_ids'],
                                required: true,
                                options:quan,
                                multiple:true,
                                treeCheckable: true,
                                formart:{
                                    title:"name",
                                    key:"path",
                                    children:"routes"
                                },
                                col:{span:24}
                            }
                        })

                        
                    })
                    
                    cvs(true);
                    ciftype({
                        val: "quan",
                        title: "角色赋权",
                        id: record.id
                    })
                }}>
                    角色赋权
                </a>,
                <a
                    disabled={record.role_type != 0}
                    style={{ color: record.role_type != 0 ? "#999" : "auto" }}
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
                            title: "编辑角色",
                            id: record.id
                        })
                    }}
                >
                    编辑
                </a>,
                <Popconfirm
                    placement="bottom"
                    title={"确认删除该角色？"}
                    onConfirm={() => {
                        deleterole(record.id).then(res => {
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

    let {data,loading} = useRequest(()=>{
        return menu({})
    })

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
                title: "新增角色"
            })
        }}>新增</Button>
    </div>)


    let saveData = (values) => {
        let { dispatch } = props;
        console.log(values)
        if (iftype.val == "add") {
            dispatch({
                type: 'basic/addrole',
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
                type: 'basic/editrole',
                payload: { ...values, id: iftype.id }
            }).then(res => {
                if (res.code == 0) {
                    message.success("操作成功");
                    actionRef.current.reload();
                    cvs(false)
                }
            })
        }else if(iftype.val == "quan"){
            values.menu_ids = values.menu_ids.map((it)=>{
                console.log(data,it)
                let res = data.filter((item)=>item.path == it);
                return res?res[0].id:''
            })
            console.log(values.menu_ids)
            dispatch({
                type: 'basic/rolemenu',
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
                path="/api/role"
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
                        props.loading.effects['basic/addrole'] || !vs
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
}))(Role)