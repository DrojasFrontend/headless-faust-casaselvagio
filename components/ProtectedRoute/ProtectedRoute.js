import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './ProtectedRoute.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export function ProtectedRoute({ children, themeSettings }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const loginData = themeSettings?.options?.grupoLogin || {};

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

  // Rutas que tienen su propio sistema de autenticación
  const excludedPaths = [
    'founders'
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
      
      // Verificar si está en una ruta excluida (con su propia autenticación)
      if (excludedPaths.includes(firstSegment)) {
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // La raíz '/' tendrá firstSegment como string vacío
      const requiresAuth = restrictedPaths.includes(firstSegment);
      
      if (!requiresAuth) {
        // No requiere autenticación
        setIsAuthenticated(true);
        setLoading(false);
        return;
      }
      
      // Verificar autenticación guardada
      const isAuth = sessionStorage.getItem('auth_global') === 'true';
      
      // También verificar si está autenticado como founder
      const isFounderAuth = localStorage.getItem('founders_authenticated') === 'true';
      
      setIsAuthenticated(isAuth || isFounderAuth);
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
      
      // Pequeña demora para mejor UX
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (passwordData.global && passwordData.global.includes(password)) {
        sessionStorage.setItem('auth_global', 'true');
        setIsAuthenticated(true);
      } else {
        setError('Código incorrecto. Por favor, intenta nuevamente.');
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

  // Renderizar los children siempre, y mostrar el overlay de login encima si no está autenticado
  return (
    <>
      {children}
      
      {!isAuthenticated && (
        <div className={styles.protectedContainer}>
          <div className={styles.loginContainer}>
            <div className={styles.imageSection}>
              {loginData.video?.mediaItemUrl ? (
                <video
                  src={loginData.video.mediaItemUrl}
                  width={261}
                  height={393}
                  controls
                  autoPlay
                  muted
                  loop
                  style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
                  poster="/img/imagen-login.png" // Opcional: imagen de portada mientras carga el video
                />
              ) : (
                <Image
                  src="/img/imagen-login.png"
                  alt="Casa Selvaggio Founders"
                  width={261}
                  height={393}
                  objectFit="contain"
                  priority
                />
              )}
            </div>
            
            <div className={styles.formSection}>
              <div className={styles.logo}>
                <Image
                  src={loginData.logo?.mediaItemUrl || "/img/logo-founders-blanco.png"}
                  alt="CASA SELVAGGIO FOUNDERS"
                  width={1200}
                  height={636}
                  priority
                />
              </div>
              
              <div className={styles.textContent}>
                <p className={styles.mainText}>
                  {loginData.descripcion1 || "Jorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis."}
                </p>
                
                <p className={styles.subText}>
                  {loginData.descripcion2 || "Jorem ipsum dolor sit amet, consectetur adipiscing elit."}
                </p>
              </div>
              
              <form onSubmit={handleSubmit} className={styles.loginForm}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Ingresa tu código"
                  className={styles.inputCode}
                  required
                  disabled={isSubmitting}
                  autoFocus
                />
                
                <button 
                  type="submit" 
                  className={styles.loginButton}
                  disabled={isSubmitting || !password}
                >
                  {isSubmitting ? 'Verificando...' : 'Entrar'}
                </button>
              </form>
              
              {error && <p className={styles.errorMessage}>{error}</p>}
              
              <div className={styles.signupLink}>
                <Link href={loginData.cta?.url || "#"}>
                  {loginData.cta?.title || "Quiero ser parte de Founders Casa Selvaggio"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 