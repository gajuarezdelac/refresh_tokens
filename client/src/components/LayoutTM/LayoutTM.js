import React, { useState,Fragment } from 'react';
import { Layout, Menu, Button, Avatar,Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as LoginActions from '../../redux/actions/UserAction';

import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    LoginOutlined
} from '@ant-design/icons';

import './LayoutTM.css'

const { Header, Sider, Content } = Layout;

const LayoutTM = (props) => {

    const [collapsed, setCollapsed] = useState(false)
    const dispatch = useDispatch()

    const toggle = () => {
        setCollapsed(!collapsed)
    }

    const closeSesion = () => {
        //console.log("whaaaat get out here")
        dispatch(LoginActions.logoutUser())
    }

    
    const {
      userInfo
   } = useSelector(state => state.LoginReducer)

    return  (
        <Layout  style={{ height: "100vh"}}  >
        <Sider  trigger={null} collapsible collapsed={collapsed}>
       
        <div className="container-logo-interna">
        <h2 className="logo">TurisCamp</h2>     
        </div>
            
          <Menu theme="dark" mode="inline">
            <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/" > Dashboard </Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            <Link to="/" > Comercios </Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link to="/" > Productos </Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<VideoCameraOutlined />}>
            <Link to="/" > Lugares </Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link to="/" > Municipios </Link>
            </Menu.Item>    
          </Menu>
        </Sider>
        <Layout className="site-layout">
        <Header className="site-layout-background flex" style={{ padding: 0, background: '#efecec', margin: '0px 0px 0px 0px', paddingRight: '50px' }}>

       <div className="flex">
       {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
         className: 'trigger',
         onClick: toggle,
       })}
       <span className="titulo-seccion">{props.title}</span>
       </div>

       <div>
         {
           userInfo && <Fragment>
           <strong>{userInfo.name}</strong> 
          <Avatar src={userInfo && userInfo.avatar} >  </Avatar>
           </Fragment>
         }
       <Tooltip title="Salir" >
       <Button type="primary" style={{  marginLeft: '10px',marginRight: "10px" }} onClick={closeSesion} danger shape="circle" icon={<LoginOutlined />} />
      </Tooltip>
       </div>

      </Header>
      <Content
      className="site-layout-background"
      style={{
      margin: '0px 16px',padding: 24,minHeight: 280, }}>
      {props.children}
      </Content>
        </Layout>
      </Layout>
    );
}

export default LayoutTM;
