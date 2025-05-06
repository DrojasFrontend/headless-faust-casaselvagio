import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { 
      nombre, 
      email, 
      ocupacion, 
      celular,
      servicios,
      mensaje
    } = req.body;

    let transporter = nodemailer.createTransport({
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
    } catch (verifyError) {
      return res.status(500).json({ error: `Error en la conexión con el servidor de correo: ${verifyError.message}` });
    }

    // Construir el contenido del correo
    const mailData = {
      from: process.env.SMTP_FROM_EMAIL,
      to: process.env.SMTP_TO_EMAIL,
      subject: '✅ Nuevo formulario de contacto',
      html: `
        <h1>✅ Nuevo formulario de contacto</h1>
        <h2>Información de contacto:</h2>
        <p><strong>👤 Nombre:</strong> ${nombre}</p>
        <p><strong>📩 Email:</strong> ${email}</p>
        <p><strong>💼 Ocupación:</strong> ${ocupacion || 'No especificado'}</p>
        <p><strong>📞 Celular:</strong> ${celular ? `+${celular}` : 'No proporcionado'}</p>
        <p><strong>🛎️ Servicios:</strong> ${servicios || 'No especificado'}</p>
        <h2>📝 Mensaje:</h2>
        <p>${mensaje || 'No proporcionado'}</p>
      `,
    };

    // Agregar dirección de respuesta con el email del usuario
    if (email) {
      mailData.replyTo = email;
    }

    // Enviar el correo
    try {
      const info = await transporter.sendMail(mailData);
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