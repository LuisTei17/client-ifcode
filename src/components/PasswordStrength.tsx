import React from 'react';

interface PasswordStrengthProps {
  password: string;
}

const getStrength = (password: string) => {
  let score = 0;
  if (/[a-z]/.test(password)) score++; // letra minúscula
  if (/[A-Z]/.test(password)) score++; // letra maiúscula
  if (/[^A-Za-z0-9]/.test(password)) score++; // caractere especial
  if (/[0-9]/.test(password)) score++; // número

  switch (score) {
    case 1:
      return { label: 'Fraca', color: '#e74c3c' };
    case 2:
      return { label: 'Média', color: '#f39c12' };
    case 3:
      return { label: 'Forte', color: '#2e86de' };
    case 4:
      return { label: 'Muito forte', color: '#27ae60' };
    default:
      return { label: '', color: 'transparent' };
  }
};

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const { label, color } = getStrength(password);
  if (!password) return null;
  return (
    <div style={{ marginTop: 4 }}>
      <span style={{ color, fontWeight: 'bold' }}>Força da senha: {label}</span>
    </div>
  );
};

export default PasswordStrength;
