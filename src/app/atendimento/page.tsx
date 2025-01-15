'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as S from './styles'; // Adicione estilos personalizados aqui
import { Card } from 'antd';

const AtendimentoPage: React.FC = () => {
  const searchParams = useSearchParams();
  const nome = searchParams.get('nome') || 'Servidor';
  const router = useRouter();

  const handleOptionClick = (path: string) => {
    router.push(path);
  };

  return (
    <S.Container>
      <h1>Como você deseja atender {nome}?</h1>
      <S.CardsContainer>
        <Card hoverable onClick={() => handleOptionClick('/dados-pessoais')}>
          Ver dados pessoais
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/contratos')}>
          Ver contratos
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/reservar-margem')}>
          Reservar margem
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/averbar-contrato')}>
          Averbar contrato
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/refinanciamento')}>
          Refinanciamento
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/quitacao')}>
          Quitação
        </Card>
        <Card hoverable onClick={() => handleOptionClick('/portabilidade')}>
          Portabilidade
        </Card>
      </S.CardsContainer>
    </S.Container>
  );
};

export default AtendimentoPage;
