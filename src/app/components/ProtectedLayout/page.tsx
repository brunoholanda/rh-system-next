'use client';

import React from 'react';
import { Layout, Menu, Dropdown, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/authContext';

const { Header, Content, Footer } = Layout;

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'logout') {
      sessionStorage.clear();
      setUser(null);
      router.push('/');
    } else if (key === 'profile') {
      message.info('Exibindo seus dados');
    } else if (key === 'change-password') {
      message.info('Redirecionando para alterar senha');
    }
  };

  const menu = (
    <Menu
      onClick={handleMenuClick}
      items={[
        { label: 'Meus Dados', key: 'profile' },
        { label: 'Alterar Senha', key: 'change-password' },
        { label: 'Sair', key: 'logout' },
      ]}
    />
  );

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Header */}
      <Header style={{ background: '#001529', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ color: '#fff', fontSize: '16px' }}>Olá, {user?.nome}</div>
        <Dropdown overlay={menu} placement="bottomRight" arrow>
          <UserOutlined style={{ fontSize: '20px', cursor: 'pointer' }} />
        </Dropdown>
      </Header>

      {/* Content */}
      <Content style={{ padding: '20px' }}>{children}</Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>Isis Consig ©2025</Footer>
    </Layout>
  );
};

export default ProtectedLayout;
