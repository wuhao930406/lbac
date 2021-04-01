import React, { useState, useRef, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { Card, Tabs, Button, Modal, Radio, Tag, message, Avatar } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm from '@/components/InitForm'
import { connect, useRequest } from 'umi'
import { member, attention, updatemember, getagentpromo } from '@/services/weapp'

import RenderClickImg from '@/components/RenderClickImg'

// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 
const { TabPane } = Tabs;
const tabList = [
    {
        key: 'agent',
        tab: '经纪人',
    },
    {
        key: 'promoter',
        tab: '推广员',
    },
    {
        key: 'user',
        tab: '普通用户',
    },
], colorList = ["#ffa201", "#d7d7d7", "#ca8345"]

function Member(props) {
    const [vs, cvs] = useState(false),//表单显/隐
        [iftype, ciftype] = useState({
        }),
        [fields, cf] = useState({}),
        [show, setshow] = useState(true),
        [activekey, setactivekey] = useState("agent"),
        [promo_num, cp] = useState("asc");

    const actionRef = useRef();
    let { data } = useRequest(() => attention())

    const [value, setValue] = useState("agent");
    const onChange = e => {
        setValue(e.target.value);
    };

    let nextperson = activekey == "user" ? {
        title: '直属下限人数',
        dataIndex: 'promo_num',
        key: 'promo_num',
        search: false,
        render: (_, record) => { //record.is_member
            return <a onClick={() => {
                cvs(true);
                member({ id: record.id, promo_type: 1 }).then(res => {
                    ciftype({
                        title: record.name + "的下限",
                        list: res.data?.promos
                    })
                })

            }}>{record.promo_num}</a>
        }
    } : {
            title: '全部下限人数',
            dataIndex: 'recursion_promo_num',
            key: 'recursion_promo_num',
            search: false,
            render: (_, record) => { //record.is_member
                return <a onClick={() => {
                    cvs(true);
                    member({ id: record.id, promo_type: 2 }).then(res => {
                        ciftype({
                            title: record.name + "的下限",
                            list: res.data?.promos
                        })
                    })

                }}>{record.recursion_promo_num}</a>
            }
        };

    const columns = [
        {
            title: '排名',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
            render: (_, record) => {
                return <Avatar style={{ backgroundColor: colorList[record?.index - 1] }}>{record?.index ? record?.index : "-"}</Avatar>
            }
        },
        {
            title: '头像',
            dataIndex: 'head_image',
            key: 'head_image',
            search: false,
            render: (_, record) => {
                return <div className="center">
                    <RenderClickImg url={record.head_image} style={{ margin: "0 2px 2px 0" }}></RenderClickImg>
                </div>
            }
        },
        {
            title: '会员名称',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex',
            search: false,
        },
        {
            title: '手机号',
            dataIndex: 'phone',
            key: 'phone',
            search: false,
        },
        {
            title: '是否关注',
            dataIndex: 'is_attention',
            key: 'is_attention',
            search: false,
            render: (_, record) => {
                return <Tag color={!record.is_attention ? "grey" : "red"}>{!record.is_attention ? "未关注" : "已关注"}</Tag>
            }
        },
        {
            title: '是否为会员',
            dataIndex: 'is_member',
            key: 'is_member',
            search: false,
            render: (_, record) => { //record.is_member
                return <Tag color={!record.is_member ? "grey" : "red"}>{!record.is_member ? "非会员" : "会员"}</Tag>
            }
        },
        nextperson,
        {
            title: '推广码',
            dataIndex: 'promo_code_url',
            key: 'promo_code_url',
            search: false,
            render: (_, record) => {
                return <div className="center">
                    <RenderClickImg url={record.promo_code_url} style={{ margin: "0 2px 2px 0" }}></RenderClickImg>
                </div>
            }
        },
        {
            title: '操作',
            valueType: 'option',
            width: activekey == "agent" ? 240 : 120,
            render: (text, record, _, action) => [
                activekey == "agent" ? <a onClick={() => {
                    ciftype({
                        ...iftype,
                        title: <span><b style={{ color: "#f50" }}>{record.name}</b> 的推广员(勾选的为该经纪人的推广员)</span>,
                        type: "fenp",
                        id: record.id
                    })
                    getagentpromo({ member_id: record.id }).then(res => {
                        let defaultvalue = res?.data?.dataList ? res?.data?.dataList.map((it) => it.id) : []
                        cf({
                            ids: {
                                value: defaultvalue,
                                type: 'table',
                                title: <span>给 <b style={{ color: "#f50" }}>{record.name}</b> 分配推广员</span>,
                                name: ['ids'],
                                columns: [
                                    {
                                        title: '头像',
                                        dataIndex: 'head_image',
                                        key: 'head_image',
                                        search: false,
                                        render: (_, record) => {
                                            return <div className="center">
                                                <RenderClickImg url={record.head_image} style={{ margin: "0 2px 2px 0" }}></RenderClickImg>
                                            </div>
                                        }
                                    },
                                    {
                                        title: '会员名称',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                    {
                                        title: '性别',
                                        dataIndex: 'sex',
                                        key: 'sex',
                                        search: false,
                                    },
                                    {
                                        title: '手机号',
                                        dataIndex: 'phone',
                                        key: 'phone',
                                        search: false,
                                    },
                                ],
                                path: "/api/agent/" + record.id,
                                required: true,
                                rowKey: "id",
                                rowName: "name",
                                col: { span: 24 }
                            }
                        })
                        cvs(true)
                    })

                }}>
                    查看/分配推广员
                </a> : null,
                <a onClick={() => {
                    ciftype({
                        ...iftype,
                        title: "修改角色",
                        type: "edit",
                        curitem: record
                    })
                    cvs(true)
                }}>
                    修改角色
                </a>
            ]
        }
    ]

    let pagination = activekey == "agent" ? { pagination: "false" } : {};

    let saveData = (values) => {
        props.dispatch({
            type: 'weapp/agentpromo',
            payload: { ...values, id: iftype.id }
        }).then(res => {
            if (res.code == 0) {
                message.success("操作成功");
                actionRef.current.reload();
                cvs(false)
            }
        })
    }

    useMemo(() => {
        setshow(false);
        setTimeout(() => {
            setshow(true);

        }, 1)
    }, [activekey])

    return (
        <Card title={<a style={{ fontSize: 18, paddingLeft: 6, color: "#333" }}>{props.route.name}</a>} tabProps={{ type: "card" }} tabList={tabList} activeTabKey={activekey} onTabChange={key => {
            setactivekey(key)
        }} extra={<a style={{ color: "#f50" }}>共 <b style={{ fontSize: 24, padding: "0 4px" }}>{data}</b>人关注公众号</a>} tabBarExtraContent={<a style={{ display: activekey == "user" ? "none" : "block" }} onClick={() => {
            cp((promo_num) => {
                if (promo_num == "asc") {
                    return "desc"
                } else {
                    return "asc"
                }
            })
        }}>排名{promo_num == "desc" ? "正序" : "倒序"}</a>}>
            {
                show && <AutoTable
                    columns={columns}
                    actionRef={actionRef}
                    extraparams={{ identity: activekey, recursion_promo_num: promo_num, pageIndex: 1 }}
                    path="/api/member"
                    {...pagination}
                ></AutoTable>
            }

            <Modal
                maskClosable={false}
                title={iftype.title}
                visible={vs}
                onCancel={() => cvs(false)}
                footer={iftype.type == "edit" ? [
                    <Button type='primary' onClick={() => {
                        updatemember({ id: iftype.curitem.id, identity: value }).then(res => {
                            if (res.code == 0) {
                                actionRef.current.reload();
                                message.success("操作成功！");
                                cvs(false)
                            }
                        })
                    }}>修改</Button>
                ] : false}
                width={1000}
                style={{ top: 20 }}
                destroyOnClose={true}
            >
                {
                    iftype.type == "edit" ?
                        <div style={{ padding: 12 }}>
                            <Radio.Group onChange={onChange} defaultValue={iftype.curitem.identity}>
                                <Radio value={"agent"}>经纪人</Radio>
                                <Radio value={"promoter"}>推广员</Radio>
                                <Radio value={"user"}>普通用户</Radio>
                            </Radio.Group>
                        </div> :
                        iftype.type == "fenp" ?
                            <InitForm
                                fields={fields}
                                submitData={(values) => {
                                    saveData(values)
                                }}
                                onChange={(changedValues, allValues) => {
                                    //联动操作
                                }}
                                submitting={
                                    props.loading.effects['weapp/agentpromo'] || !vs
                                }
                            >
                            </InitForm>
                            : <AutoTable
                                columns={[
                                    {
                                        title: '头像',
                                        dataIndex: 'head_image',
                                        key: 'head_image',
                                        search: false,
                                        render: (_, record) => {
                                            return <div className="center">
                                                <RenderClickImg url={record.head_image} style={{ margin: "0 2px 2px 0" }}></RenderClickImg>
                                            </div>
                                        }
                                    },
                                    {
                                        title: '会员名称',
                                        dataIndex: 'name',
                                        key: 'name',
                                    },
                                ]}
                                dataSource={iftype.list}
                            ></AutoTable>

                }
            </Modal>



        </Card>
    )
}

export default connect(({ weapp, loading }) => ({
    weapp,
    loading,
}))(Member)