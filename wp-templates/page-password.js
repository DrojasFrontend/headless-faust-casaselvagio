import React from 'react';
import { MultiStepForm } from '../components';

export default function PagePassword() {
  return (
    <div style={{ padding: '40px 20px' }}>
      <MultiStepForm 
        title="Formulario de Contacto" 
        subtitle="Complete los siguientes campos para enviar su información" 
      />
    </div>
  );
}
