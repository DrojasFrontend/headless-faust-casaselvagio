import { setConfig } from '@faustwp/core';
import templates from './wp-templates';
import possibleTypes from './possibleTypes.json';

/**
 * @type {import('@faustwp/core').FaustConfig}
 **/
export default setConfig({
  wpUrl: process.env.NEXT_PUBLIC_WORDPRESS_URL,
  apiClientSecret: process.env.FAUST_SECRET_KEY,
  templates,
  experimentalPlugins: [],
  experimentalToolbar: false, // Desactivar toolbar para evitar errores 401
  possibleTypes,
  basePath: '',
  usePermalinks: true,
  // Configuración para dominio personalizado
  previewUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.casaselvaggio.com',
  // Desactivar autenticación automática
  disableAuth: true,
});
