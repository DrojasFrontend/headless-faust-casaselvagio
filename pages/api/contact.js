import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { 
      nombre, 
      apellidos, 
      email, 
      instagram, 
      celular,
      comoNosConociste,
      accountType,
      experienciaViaje,
      valorCalidad,
      ritualPersonal,
      importanciaCompartir,
      filosofiaViaje
    } = req.body;

    console.log('Datos del formulario recibidos:', {
      nombre,
      apellidos,
      email,
      instagram,
      celular,
      comoNosConociste,
      accountType
    });

    console.log('Configuración SMTP:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL
    });

    // Configurar el transporte de correo (Mailtrap para desarrollo, SMTP real para producción)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    
    // Verificar la conexión
    try {
      await transporter.verify();
      console.log('Conexión SMTP verificada exitosamente');
    } catch (verifyError) {
      console.error('Error al verificar la conexión SMTP:', verifyError);
      return res.status(500).json({ error: `Error en la conexión con el servidor de correo: ${verifyError.message}` });
    }

    // Construir el contenido del correo
    const mailData = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: 'Nuevo formulario de contacto',
      html: `
        <h1>Nuevo formulario de contacto</h1>
        <h2>Información de contacto:</h2>
        <p><strong>Nombre:</strong> ${nombre} ${apellidos}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Instagram:</strong> ${instagram || 'No proporcionado'}</p>
        <p><strong>Celular:</strong> ${celular ? `+${celular}` : 'No proporcionado'}</p>
        <p><strong>¿Cómo nos conociste?:</strong> ${comoNosConociste}</p>
        <p><strong>Tipo de cuenta:</strong> ${accountType}</p>
        
        <h2>Información adicional:</h2>
        <p><strong>¿Cuál fue la última experiencia de viaje verdaderamente transformadora que viviste en los últimos 12 meses?</strong><br>${experienciaViaje || 'No proporcionado'}</p>
        <p><strong>El valor de nuestras experiencias refleja su excepcionalidad. ¿Valoras la calidad por encima del precio en tus viajes?</strong><br>${valorCalidad || 'No proporcionado'}</p>
        <p><strong>¿Qué ritual personal nunca falta en tus viajes?</strong><br>${ritualPersonal || 'No proporcionado'}</p>
        <p><strong>¿Qué importancia tiene para ti compartir experiencias extraordinarias con personas que comparten tu visión de vida?</strong><br>${importanciaCompartir || 'No proporcionado'}</p>
        <p><strong>Si pudieras definir tu filosofía de viaje en tres palabras, ¿cuáles serían?</strong><br>${filosofiaViaje || 'No proporcionado'}</p>
      `,
    };

    // Agregar dirección de respuesta con el email del usuario
    if (email) {
      mailData.replyTo = email;
    }

    console.log('Enviando correo a:', mailData.to);
    
    // Enviar el correo
    try {
      const info = await transporter.sendMail(mailData);
      console.log('Correo enviado correctamente:', info.messageId);
      return res.status(200).json({ success: true, messageId: info.messageId });
    } catch (sendError) {
      console.error('Error al enviar el correo:', sendError);
      return res.status(500).json({ error: `Error al enviar el correo: ${sendError.message}` });
    }
  } catch (error) {
    console.error('Error general:', error);
    return res.status(500).json({ error: `Error en el servidor: ${error.message}` });
  }
} 