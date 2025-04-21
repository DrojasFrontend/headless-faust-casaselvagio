import React from 'react';
import { MultiStepForm, Video } from '../components';

export default function PagePassword() {
  // Datos para el componente Video utilizando un archivo local
  const videoData = {
    videoSrc: "/video.mp4", // Archivo en la carpeta public
    autoplay: true,
    controls: true,
    loop: true,
    muted: true
  };

  return (
    <div>
      <Video data={videoData} />
      <div>
        <MultiStepForm 
          title="Formulario de Contacto" 
          subtitle="Complete los siguientes campos para enviar su información" 
        />
      </div>
    </div>
  );
}
