import api from "../components/api/api";

interface LoginResponse {
  user_type: string;
  access_token: string;
  nome: string;
}

interface ServidorLoginResponse {
  message: string;
  servidor: {
    id: string;
    nome: string;
    matricula: string;
    email: string;
    cargo: string;
    governo_id: string;
  };
}

export const servidorLogin = async (linkName: string, matricula: string, password: string): Promise<ServidorLoginResponse> => {
  const response = await api.post(`/${linkName}/servidor/login`, { matricula, password });
  return response.data;
}
export const login = async (linkName: string, email: string, password: string): Promise<LoginResponse> => {
  const response = await api.post(`/auth/login/${linkName}`, { email, password });

  sessionStorage.setItem('authToken', response.data.access_token);

  sessionStorage.setItem(
    'user',
    JSON.stringify({
      nome: response.data.nome,
      user_type: response.data.user_type,
    })
  );

  return response.data;
};
