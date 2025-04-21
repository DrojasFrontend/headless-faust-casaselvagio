import React from 'react';

export function AuthReset() {
  const resetAuth = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('auth_global');
      console.log('Autenticación eliminada');
      // Refrescar la página
      window.location.reload();
    }
  };

  // Añadir estilos en línea para posicionar el botón en la esquina inferior derecha
  const buttonStyle = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: '#cc0000',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 9999,
    fontSize: '12px',
    opacity: 0.7
  };

  return (
    <button 
      onClick={resetAuth} 
      style={buttonStyle}
      title="Solo para pruebas"
    >
      Reset Auth
    </button>
  );
} 