'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/authContext';
import { useRouter } from 'next/navigation';
import { Input, Button, Form, message, Spin } from 'antd';
import ProtectedLayout from '../components/ProtectedLayout/page';
import * as S from './styles';
import api from '../components/api/api';

const ConsignadorPage: React.FC = () => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [servidores, setServidores] = useState([]);

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

  const handleSearch = async (values: { matricula: string; cpf: string }) => {
    try {
      const linkName = window.location.pathname.split('/')[1];
      const token = sessionStorage.getItem('authToken'); // Recupera o token do armazenamento
  
      const response = await api.get(`/servidor/search`, {
        params: { matricula: values.matricula, cpf: values.cpf },
        headers: {
          Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          linkName, // Inclui o linkName se necessário
        },
      });
  
      const servidor = response.data; // Supondo que os dados do servidor sejam retornados
    
      // Redirecionar para a página de atendimento com o nome do servidor
      router.push(`/atendimento?nome=${encodeURIComponent(servidor.nome)}`);
      
      if (response.data.length === 0) {
        message.warning('Nenhum servidor encontrado com os critérios informados.');
      } else {
        setServidores(response.data);
        message.success('Servidores encontrados!');
      }
    } catch (error) {
      console.error('Erro ao pesquisar servidores:', error);
      message.error('Falha ao realizar a pesquisa. Tente novamente.');
    }
  };
  

  return (
    <ProtectedLayout>

      <S.ConsignadorContainer>
        <h1>Pesquise um servidor para consultar a margem disponível e contratos...</h1>
        <Form layout="vertical" onFinish={handleSearch}>
          <Form.Item label="Matrícula" name="matricula">
            <Input placeholder="Digite a matrícula" />
          </Form.Item>

          <Form.Item label="CPF" name="cpf">
            <Input placeholder="Digite o CPF" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Pesquisar
            </Button>
          </Form.Item>
        </Form>

        {/* Exibir resultados */}
        {servidores.length > 0 && (
          <div>
            <h2>Resultados:</h2>
            <ul>
              {servidores.map((servidor: any) => (
                <li key={servidor.id}>
                  <strong>Nome:</strong> {servidor.nome}, <strong>Matrícula:</strong> {servidor.matricula}, <strong>CPF:</strong> {servidor.cpf}
                </li>
              ))}
            </ul>
          </div>
        )}

      </S.ConsignadorContainer>
    </ProtectedLayout>
  );
};

export default ConsignadorPage;
