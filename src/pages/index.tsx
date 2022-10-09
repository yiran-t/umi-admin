import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Button, Form, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import './index.less'
const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];
// 造菜单数据方法
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 1', '1', <PieChartOutlined />),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  // 菜单列表
  const [menuList, setMenuList] = useState(items);
  // 选择的菜单id
  const [menuId, setMenuId] = useState('1')
  // form表单提交 并修改菜单label
  const onFinish = ({menuName}: any) => {
    console.log('Success:', menuName);
    const newMenuList =  menuList.map((item:any) => {
      if (item.children) {
        item.children.forEach((ite: { key: string; label: string; }) => {
          if(ite.key === menuId){
            ite.label = menuName
          }
        });
      } else {
        if(item.key === menuId){
          item.label = menuName
        }
      }
      return item;
    })
    setMenuList(newMenuList)
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  // 选择菜单的方法 并更新 form表单值
  const selectMenu = (val: any) => {
    setMenuId(val.key)
    let menuName = ''
    menuList.forEach((item:any) => {
      if (item.children) {
        item.children.forEach((ite: { key: string; label: string; }) => {
          if(ite.key === val.key){
            menuName = ite.label
          }
        });
      } else {
        if(item.key === val.key){
          menuName = item.label
        }
      }
    })
    form.setFieldsValue({
      menuName,
    });
  }
  useEffect(()=>{
    selectMenu({key: menuId})
  },[])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={menuList} onSelect={selectMenu} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Form
              name="basic"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 8 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="菜单名字"
                name="menuName"
                rules={[
                  { required: true, message: '请选择菜单' }
                ]}
              >
                <Input placeholder='请选择菜单' />
              </Form.Item>
              <Form.Item wrapperCol={{ offset: 2, span: 8 }}>
                <Button type="primary" htmlType="submit">
                  保存
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default App;