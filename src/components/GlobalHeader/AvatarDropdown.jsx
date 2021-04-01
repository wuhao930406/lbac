import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin, Modal, Input, message } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { editpwd } from '@/services/basic'

class AvatarDropdown extends React.Component {
  state={
    pwd:"",
    cfpwd:"",
  }

  onMenuClick = (event) => {
    const { key } = event;
    const { dispatch } = this.props;

    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    } else if (key === "settings") {
      let _it = this;
      Modal.confirm({
        title: "修改密码",
        content: <div style={{padding:"12px 0"}}>
          <Input.Password style={{marginBottom:12}} placeholder="输入新密码" defaultValue="" onChange={(e)=>{
            this.setState({
              pwd:e.target.value
            })
          }}></Input.Password>
          <Input.Password placeholder="确认新密码" defaultValue="" onChange={(e)=>{
            this.setState({
              cfpwd:e.target.value
            })
          }}></Input.Password>
        </div>,
        onOk:()=>{
          let { pwd, cfpwd } = _it.state;
          if(!pwd || !cfpwd || pwd!=cfpwd){
            message.warn("信息未补全或两次密码不一致")
            return
          }
          editpwd({ id: _it.props.currentUser.id,password:pwd}).then(res=>{
            if(res.code==0){
              if (dispatch) {
                dispatch({
                  type: 'login/logout',
                }).then(()=>{
                  message.success("密码修改成功")
                });
              }
            }else{
              message.warn(res?.message)
            }
          })

        }
      })



    }

  };

  render() {
    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        <Menu.Item key="settings">
          <SettingOutlined />
            修改密码
          </Menu.Item>

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" style={{ backgroundColor: '#40a9ff', color: "#fff" }} className={styles.avatar} alt="avatar" >{currentUser?.name.substr(0, 1)}</Avatar>
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
