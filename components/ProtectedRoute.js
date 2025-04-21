import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/ProtectedRoute.module.css';

export function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // Helper para manejo de errores (silencioso en producción)
  const logError = (message, err) => {
    if (process.env.NODE_ENV === 'development') {
      console.error(message, err);
    }
  };

  // Rutas protegidas exactas (incluyendo la raíz)
  const restrictedPaths = [
    '',  // Raíz /
    'diario-selvaggio',
    'tours',
    'restaurante',
    'eco-villas',
    'contacto',
    'planes'
  ];

  // Función para verificar autenticación
  const checkAuth = () => {
    try {
      // Asegurarse de estar en el cliente
      if (typeof window === 'undefined') return;

      // Obtener la ruta actual sin la barra inicial
      const path = window.location.pathname.replace(/^\/+/, '');
      
      // Verificar si la primera parte de la ruta coincide con alguna ruta restringida
      const firstSegment = path.split('/')[0];
      
      // La raíz '/' tendrá firstSegment como string vacío
      const requiresAuth = restrictedPaths.includes(firstSegment);
      
      // console.log('Ruta actual:', path || 'raíz /');
      // console.log('¿Requiere autenticación?:', requiresAuth);
      
      if (!requiresAuth) {
        // No requiere autenticación
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Verificar autenticación guardada
      const isAuth = sessionStorage.getItem('auth_global') === 'true';
      // console.log('¿Está autenticado?:', isAuth);
      setIsAuthenticated(isAuth);
      setLoading(false);
    } catch (err) {
      logError('Error al verificar autenticación:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Verificar autenticación cuando se monta el componente
    checkAuth();

    // Añadir event listener para detectar cambios de URL directos
    const handleUrlChange = () => {
      // console.log('URL cambiada, verificando autenticación...');
      checkAuth();
    };

    // Escuchar cambios de URL
    window.addEventListener('popstate', handleUrlChange);

    // Limpieza
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
    };
  }, []);

  // Escuchar cambios de ruta desde el router de Next.js
  useEffect(() => {
    checkAuth();
  }, [router.asPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/passwords.json');
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const passwordData = await response.json();
      // console.log('Verificando contraseña...');
      
      // Pequeña demora para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (passwordData.global && passwordData.global.includes(password)) {
        // console.log('Contraseña correcta');
        sessionStorage.setItem('auth_global', 'true');
        setIsAuthenticated(true);
      } else {
        // console.log('Contraseña incorrecta');
        setError('Contraseña incorrecta. Por favor intente nuevamente.');
      }
      setIsSubmitting(false);
    } catch (error) {
      logError('Error en verificación:', error);
      setError('Error al verificar la contraseña. Por favor intente más tarde.');
      setIsSubmitting(false);
    }
  };

  // Mostrar indicador de carga
  if (loading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  // Mostrar formulario de login si no está autenticado
  if (!isAuthenticated) {
    return (
      <div className={styles.protectedContainer}>
        <div className={styles.loginBox}>
          <h2 className='heading--40'>Acceso Restringido</h2>
          <p>Por favor, ingrese la contraseña para acceder al sitio.</p>
          
          <form onSubmit={handleSubmit} className={styles.form}>
            <div>
              <label htmlFor="password" className={styles.label}>Contraseña</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
                className={styles.input}
                disabled={isSubmitting}
                autoFocus
              />
            </div>
            <button 
              type="submit" 
              className={styles.button}
              disabled={isSubmitting || !password}
            >
              {isSubmitting ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>
          
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    );
  }

  // Si está autenticado, mostrar el contenido
  return children;
} 