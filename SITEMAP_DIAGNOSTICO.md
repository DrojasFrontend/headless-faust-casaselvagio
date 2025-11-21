# 🔍 Diagnóstico de Sitemaps

## Problema detectado
El sitemap de posts solo muestra `/blog` en lugar de mostrar todas las entradas individuales.

## Archivos modificados

### 1. **robots.txt.js** ✅
- Agregado para solucionar problema de Google Search Console
- Sirve el robots.txt con headers correctos

### 2. **sitemap-posts.xml.js** 🔧
- Mejorado para usar el cliente de Faust.js
- Agregado mejor manejo de errores
- Agregado logging detallado

### 3. **sitemap-dynamic.xml.js** 🔧
- Mejorado para usar el cliente de Faust.js
- Agregado filtros `status: PUBLISH`

### 4. **test-wordpress.js** (NUEVO) 🧪
- API para probar la conexión con WordPress
- Útil para diagnosticar problemas

### 5. **sitemap-posts-simple.xml.js** (NUEVO) 📝
- Versión simplificada del sitemap
- Más confiable que la versión compleja
- Query más simple (primeros 500 posts)

## Cómo diagnosticar el problema

### Paso 1: Verifica las variables de entorno
Asegúrate de que estas variables estén configuradas en producción:

```env
NEXT_PUBLIC_WORDPRESS_URL=https://tu-wordpress.com
FAUST_SECRET_KEY=tu-clave-secreta
```

### Paso 2: Prueba la conexión con WordPress
Una vez desplegado, visita:
```
https://www.casaselvaggio.com/api/test-wordpress
```

Deberías ver algo como:
```json
{
  "success": true,
  "wpUrl": "https://...",
  "postsCount": 5,
  "posts": [...]
}
```

Si hay error, revisa:
- ¿El WordPress está en línea?
- ¿Las credenciales son correctas?
- ¿El GraphQL endpoint funciona? (visita: `https://tu-wordpress.com/graphql`)

### Paso 3: Prueba el sitemap simple
Visita:
```
https://www.casaselvaggio.com/sitemap-posts-simple.xml
```

Si este funciona pero el normal no, usa este en su lugar.

### Paso 4: Revisa los logs del servidor
Busca en los logs del servidor (Vercel/Netlify/etc.) mensajes como:
- 🚀 Iniciando sitemap...
- ❌ Error en página...
- ✅ Conectado...

## Soluciones

### Solución A: Usar sitemap simple
Si el sitemap complejo no funciona, actualiza `sitemap.xml.js`:

```javascript
// Cambiar esta línea:
<loc>${baseUrl}/sitemap-posts.xml</loc>

// Por esta:
<loc>${baseUrl}/sitemap-posts-simple.xml</loc>
```

### Solución B: Verificar permisos de WordPress
En tu WordPress, ve a:
- Ajustes → General → Visibilidad del sitio
- Debe estar en "Pública"

También verifica que el plugin WPGraphQL esté:
- Instalado
- Activado
- Actualizado

### Solución C: Verificar Faust.js
Verifica que el archivo `.env.local` tenga:
```
NEXT_PUBLIC_WORDPRESS_URL=https://wordpress-1203663-4858040.cloudwaysapps.com
FAUST_SECRET_KEY=tu-clave
```

Y que estas mismas variables estén en tu hosting de producción.

## URLs para verificar después del deploy

1. ✅ robots.txt: https://www.casaselvaggio.com/robots.txt
2. ✅ Sitemap principal: https://www.casaselvaggio.com/sitemap.xml
3. ❓ Sitemap posts: https://www.casaselvaggio.com/sitemap-posts.xml
4. 🆕 Sitemap simple: https://www.casaselvaggio.com/sitemap-posts-simple.xml
5. 🧪 Test WordPress: https://www.casaselvaggio.com/api/test-wordpress

## Siguientes pasos

1. Despliega todos los cambios a producción
2. Visita `/api/test-wordpress` para verificar conexión
3. Visita `/sitemap-posts-simple.xml` para ver si muestra posts
4. Si funciona, actualiza el sitemap principal para usar el simple
5. Reenvía el sitemap en Google Search Console

## Notas importantes

- Los sitemaps se generan **dinámicamente** cada vez que Google los visita
- No necesitas subir archivos XML manualmente
- El caché puede tardar hasta 1 hora en actualizarse
- Google puede tardar 24-48 horas en procesar los sitemaps

