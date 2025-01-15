'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, Row, Col, Typography } from 'antd';
import ProtectedLayout from '../components/ProtectedLayout/page';

const { Title } = Typography;

const ServidorDashboardPage: React.FC = () => {
  const router = useRouter();

  const handleCardClick = (path: string) => {
    router.push(`/servidor/${path}`);
  };

  return (
    <ProtectedLayout>
      <div style={{ padding: '20px' }}>
        <Title level={2} style={{ textAlign: 'center' }}>Área do Servidor</Title>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => handleCardClick('dados-pessoais')}
              style={{ textAlign: 'center' }}
            >
              <Title level={4}>Meus Dados Pessoais</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => handleCardClick('margens')}
              style={{ textAlign: 'center' }}
            >
              <Title level={4}>Minhas Margens</Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              onClick={() => handleCardClick('contratos')}
              style={{ textAlign: 'center' }}
            >
              <Title level={4}>Meus Contratos</Title>
            </Card>
          </Col>
        </Row>
      </div>
    </ProtectedLayout>
  );
};

export default ServidorDashboardPage;
