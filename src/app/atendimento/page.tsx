'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import * as S from './styles'; // Adicione estilos personalizados aqui
import { Card, Button, Spin } from 'antd';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import ProtectedLayout from '../components/ProtectedLayout/page';

const AtendimentoPage: React.FC = () => {
    const searchParams = useSearchParams();
    const nomeQuery = searchParams.get('nome') || 'Servidor';
    const router = useRouter();
    const [servidor, setServidor] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedServidor = sessionStorage.getItem('servidorSelecionado');
        if (storedServidor) {
            const servidorData = JSON.parse(storedServidor);
            setServidor(servidorData[0]); // Acessa o primeiro elemento do array
        } else {
            router.push('/consignador'); // Redireciona se não houver dados
        }
        setLoading(false);
    }, [router]);

    const handleOptionClick = (path: string) => {
        router.push(path);
    };

    const handleBack = () => {
        router.push('/consignador'); // Caminho para a página de pesquisa
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Spin size="large" />
            </div>
        );
    }

    const data = [
        { name: 'Bruto', value: parseFloat(servidor?.salario_bruto || '0') },
        { name: 'Descontos', value: parseFloat(servidor?.descontos || '0') },
        { name: 'Líquido', value: parseFloat(servidor?.salario_liquido || '0') },
    ];

    const COLORS = ['#0088FE', '#FF8042', '#00C49F'];

    return (
        <ProtectedLayout>
            <S.Container>
                <Button type="default" onClick={handleBack} style={{ marginBottom: '20px' }}>
                    Voltar para Pesquisa
                </Button>
                <h1>Saude financeira:</h1>
                <div style={{ margin: '20px auto', maxWidth: '500px', textAlign: 'center' }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={80}
                                outerRadius={120}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, value }) => `${name}: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                                labelLine
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div style={{ position: 'absolute', top: '43%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'green' }}>
                        <h3 style={{ margin: 0 }}>Margem <br/> Disponível</h3>
                        <strong style={{ fontSize: '18px' }}>
                            {parseFloat(servidor?.margem_consignavel_disponivel || '0').toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                            })}
                        </strong>
                    </div>
                </div>
                <h1>Como você deseja atender {servidor?.nome || nomeQuery}?</h1>

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
        </ProtectedLayout>
    );
};

export default AtendimentoPage;
