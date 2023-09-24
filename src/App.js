import logo from './logo.svg';
import './App.css';
import Layout from './layouts/Layout';
import './assets/style/style.css'
import { ConfigProvider } from 'antd';
import vi_VN from 'antd/lib/locale/vi_VN'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useContext, useEffect, useState } from 'react';
import { createContext } from 'react';


function App() {
  
  return (
    <ConfigProvider locale={vi_VN}
      theme={{
        token: {
          colorPrimary: '#1677ff',
        },
      }}
    >
        <div className="App">
          <Layout></Layout>
        </div>
    </ConfigProvider>
  );
}

export default App;
