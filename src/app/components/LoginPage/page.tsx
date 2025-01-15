'use client';

import React, { useState } from 'react';
import * as S from './styles';
import { Form, Input, Button, Typography, AutoComplete, message } from 'antd';
import { useEmailAutocomplete } from '../../utils/useEmailAutocomplete';
import { login } from '../../services/authService';
import { useRouter } from 'next/navigation';

const { Link } = Typography;

interface LoginPageProps {
  linkName: string;
}

const LoginPage: React.FC<LoginPageProps> = ({ linkName }) => {
  const [email, setEmail] = useState('');
  const { suggestions, handleEmailChange } = useEmailAutocomplete();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await login(linkName, values.email, values.password);
      console.log('Resposta da API de login:', response);
      sessionStorage.setItem('authToken', response.access_token);
      sessionStorage.setItem('userType', response.user_type);

      message.success('Login realizado com sucesso!');

      // Redirecionar com base no user_type
      if (response.user_type === 'consignador') {
        router.push('/consignador');
      } else {
        router.push('/dashboard');
      }
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
            <Button type="primary" htmlType="submit" block loading={loading}>
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
