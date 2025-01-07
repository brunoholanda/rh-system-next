'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { Form, Input, Button, Typography, AutoComplete, message } from 'antd';
import { useAuth } from '@/context/authContext';
import api from '@/app/components/api/api';
import { useEmailAutocomplete } from '../utils/useEmailAutocomplete';

const { Link } = Typography;

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const { suggestions, handleEmailChange } = useEmailAutocomplete();
  const { updateAuthData } = useAuth(); // Hook do contexto de autenticação

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/login', values); // Requisição para a API de login
      const { token } = response.data;

      // Atualiza o contexto de autenticação com o token
      updateAuthData({ authToken: token, userID: null, companyID: null, userName: null, companyName: null, userType: [] });

      message.success('Login realizado com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      message.error('Falha ao realizar login. Verifique suas credenciais.');
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <S.Container>
      <S.FormWrapper>
        <Form
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <h1 style={{ color: 'var(--cinza-texto)' }}>
            Bem vindo ao <span style={{ color: 'var(--azul-claro)' }}>LOGIN</span>
          </h1>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Por favor, insira seu email!' }]}
          >
            <AutoComplete
              options={suggestions.map((suggestion) => ({ value: suggestion }))}
              onChange={(value) => {
                setEmail(value);
                handleEmailChange(value);
              }}
              placeholder="Digite seu email"
              value={email}
            >
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            label="Senha"
            name="password"
            rules={[{ required: true, message: 'Por favor, insira sua senha!' }]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Entrar
            </Button>
          </Form.Item>

          <S.ForgotPasswordLink>
            <Link href="#">Esqueci minha senha</Link>
          </S.ForgotPasswordLink>
        </Form>
      </S.FormWrapper>
      <div className="bg-left-bottom"></div>
    </S.Container>
  );
};

export default LoginPage;
