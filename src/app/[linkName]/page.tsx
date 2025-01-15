'use client';

import React, { use } from 'react';
import LoginPage from '../components/LoginPage/page';

const LoginRoute = ({ params }: { params: Promise<{ linkName: string }> }) => {
  const { linkName } = use(params); // Desembrulha a Promise `params`

  return <LoginPage linkName={linkName} />;
};

export default LoginRoute;
