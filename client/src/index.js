import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
        <ConfigProvider componentSize="middle">
            <App />
        </ConfigProvider>
    </BrowserRouter>,
  document.getElementById('root')
);
