'use client';

import React, { useEffect } from 'react';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, message, Spin } from 'antd';
import ProtectedLayout from '../components/ProtectedLayout/page';
import * as S from './styles';

const ConsignadorPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || user.user_type !== 'consignador') {
        message.error('Acesso negado!');
        router.push('/');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  const handleSearch = () => {
    // Lógica de pesquisa
  };

  return (
    <ProtectedLayout>

    <S.ConsignadorContainer>
      <h1>Pesquise um servidor para consultar a margem disponível e contratos...</h1>
      <Form layout="vertical" onFinish={handleSearch}>
        <Form.Item label="Matrícula">
          <Input placeholder="Digite a matrícula" />
        </Form.Item>

        <Form.Item label="CPF">
          <Input placeholder="Digite o CPF" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Pesquisar
          </Button>
        </Form.Item>
      </Form>
    </S.ConsignadorContainer>
    </ProtectedLayout>
  );
};

export default ConsignadorPage;
