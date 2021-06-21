import React from 'react';
import  {Link } from 'react-router-dom';
import { Pie,Column  } from '@ant-design/charts';
import { Card } from 'antd';

import {ShoppingOutlined,AimOutlined,GlobalOutlined } from '@ant-design/icons';

import './Home.css';
import Layout from '../LayoutTM/LayoutTM';

const Home = () => {
    


  var data1 = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];


  var config1 = {
    appendPadding: 10,
    data: data1,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: { type: 'outer' },
    interactions: [{ type: 'element-active' }],
  };

  var data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];
  var config = {
    data: data,
    xField: 'type',
    yField: 'sales',
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: { alias: '类别' },
      sales: { alias: '销售额' },
    },
  };

    return (
      <Layout title="DASHBOARD">
    <div className="site-card-wrapper">

      
    <Card loading={false}   className="site-card">
         <div className="chartCard">
        <div className="chartTop">
          <div className="avatar">11</div>
          <div className="metaWrap">
            <div className="meta">
              <span className="title">{'Total'}</span>
              <span className="action"><Link to="/">Ver mas</Link></span>
            </div>
            <div className="total">{"Municipios"}</div>
          </div>
        </div>
          <div className="content" style={{ height: '200' || 'auto', width:"200"} }>
            <div className="contentHeight">{new Date().toUTCString()}</div>
          </div>
        
         <div className="footer">
         <GlobalOutlined /> Municipios registrados dentro de la aplicacion
         </div>
      </div>
        </Card>

        
        <Card loading={false}   className="site-card">
         <div className="chartCard">
        <div className="chartTop">
          <div className="avatar">120</div>
          <div className="metaWrap">
            <div className="meta">
              <span className="title">{'Total'}</span>
              <span className="action"><Link to="/">Ver mas</Link></span>
            </div>
            <div className="total">{"Lugares"}</div>
          </div>
        </div>
          <div className="content" style={{ height: '200' || 'auto', width:"200"} }>
            <div className="contentHeight">{new Date().toUTCString()}</div>
          </div>
        
         <div className="footer">
         <AimOutlined /> Lugares registrados dentro de la aplicacion
         </div>
      </div>
        </Card>

        
        <Card loading={false}   className="site-card">
         <div className="chartCard">
        <div className="chartTop">
          <div className="avatar">200</div>
          <div className="metaWrap">
            <div className="meta">
              <span className="title">{'Total'}</span>
              <span className="action"><Link to="/">Ver mas</Link></span>
            </div>
            <div className="total">{"Comercios"}</div>
          </div>
        </div>
          <div className="content" style={{ height: '200' || 'auto', width:"200"} }>
            <div className="contentHeight">{new Date().toUTCString()}</div>
          </div>
        
         <div className="footer">
         <ShoppingOutlined /> Comercios registrados dentro de la aplicacion
         </div>
      </div>
        </Card>
    </div>

    <div className="grafics">
    <div className="grf">
   <Pie {...config1} />
    </div>  
    <div className="grf">
    <Column {...config} />   
    </div>  
    </div>


      </Layout>
    );

}

export default Home;