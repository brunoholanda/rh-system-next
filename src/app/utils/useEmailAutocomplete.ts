import { useState } from 'react';

// Lista de domínios populares
const emailProviders = [
  'gmail.com',
  'outlook.com',
  'yahoo.com',
  'hotmail.com',
  'live.com',
  'icloud.com',
];

export const useEmailAutocomplete = () => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleEmailChange = (value: string) => {
    const [localPart, domainPart] = value.split('@');
    
    if (domainPart === undefined) {
      // Sem '@', não há sugestões
      setSuggestions([]);
      return;
    }

    // Filtra os provedores que começam com o que o usuário digitou após '@'
    const filteredProviders = emailProviders.filter((provider) =>
      provider.startsWith(domainPart)
    );

    // Cria sugestões completas de email
    const emailSuggestions = filteredProviders.map(
      (provider) => `${localPart}@${provider}`
    );

    setSuggestions(emailSuggestions);
  };

  return { suggestions, handleEmailChange };
};
