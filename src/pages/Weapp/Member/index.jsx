import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Card, Switch, Button, Modal, message, Tag } from 'antd'
import AutoTable from '@/components/AutoTable'
import InitForm from '@/components/InitForm'
import { connect,useRequest } from 'umi'
import { member,attention } from '@/services/weapp'

import RenderClickImg from '@/components/RenderClickImg'

// type 类型有 table treeselect upload inputnumber datepicker daterange radio select textarea autoinput editor password input 

function Member(props) {
    const [vs, cvs] = useState(false),//表单显/隐
        [iftype, ciftype] = useState({

        });
    const actionRef = useRef();
    let {data} = useRequest(()=>attention())


    const columns = [
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
            title: '是否为会员',
            dataIndex: 'is_member',
            key: 'is_member',
            search: false,
            render: (_, record) => { //record.is_member
                return <Tag color={!record.is_member ? "grey" : "red"}>{!record.is_member ? "非会员" : "会员"}</Tag>
            }
        },
        {
            title: '下限人数',
            dataIndex: 'promo_num',
            key: 'promo_num',
            search: false,
            render: (_, record) => { //record.is_member
                return <a onClick={() => {
                    cvs(true);
                    member(record.id).then(res=>{
                        ciftype({
                            title:record.name+"的下限",
                            list:res.data.promos
                        })
                    })
                    
                }}>{record.promo_num}</a>
            }
        },
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
    ]


    return (
        <Card title={props.route.name} extra={<a style={{color:"#f50"}}>共 <b style={{fontSize:24,padding:"0 4px"}}>{data}</b>人关注公众号</a>}>  
            <AutoTable
                columns={columns}
                actionRef={actionRef}
                path="/api/member"
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
                <AutoTable
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
            </Modal>

        </Card>
    )
}

export default connect(({ weapp, loading }) => ({
    weapp,
    loading,
}))(Member)