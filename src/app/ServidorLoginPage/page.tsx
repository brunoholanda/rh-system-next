'use client';

import React, { useState } from 'react';
import * as S from '../components/LoginPage/styles';
import { Form, Input, Button, message } from 'antd';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/authContext';
import { servidorLogin } from '../services/authService';

const ServidorLoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useAuth();

  const onFinish = async (values: { matricula: string; password: string }) => {
    setLoading(true);
    try {
      // Extrair o linkName da URL
      const linkName = window.location.pathname.split('/')[1];

      // Chamar a função de login para servidor
      const response = await servidorLogin(linkName, values.matricula, values.password);

      // Armazenar o token de autenticação e os dados do usuário
      sessionStorage.setItem('authToken', response.access_token);
      sessionStorage.setItem('user', JSON.stringify(response.servidor));
      setUser(response.servidor);

      message.success('Login realizado com sucesso!');

      // Redirecionar para a página inicial do servidor usando o linkName
      router.push(`/${linkName}/servidor/dashboard`);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      message.error('Falha ao realizar login. Verifique suas credenciais.');
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <Form
          name="servidor-login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 style={{ color: 'var(--cinza-texto)' }}>
            Bem vindo ao <span style={{ color: 'var(--azul-claro)' }}>LOGIN DO SERVIDOR</span>
          </h1>

          <Form.Item
            label="Matrícula"
            name="matricula"
            rules={[{ required: true, message: 'Por favor, insira sua matrícula!' }]}
          >
            <Input placeholder="Digite sua matrícula" />
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Entrar
            </Button>
          </Form.Item>
        </Form>
      </S.FormWrapper>
      <div className="bg-left-bottom"></div>
    </S.Container>
  );
};

export default ServidorLoginPage;
