# Taberna El Sardi · Web

Web one-page del restaurante Taberna El Sardi (Zaragoza), construida en React +
Tailwind CSS. Solo frontend, sin backend.

## Requisitos
- Node.js 18 o superior
- npm o yarn

## Cómo ejecutar en local

```bash
npm install
npm start
```

Abre http://localhost:3000

## Cómo generar build de producción

```bash
npm run build
```

Se generará la carpeta `build/` con todos los archivos estáticos optimizados,
listos para subir a cualquier hosting estático (Vercel, Netlify, GitHub Pages,
Hostinger, etc.).

## Despliegue en Vercel

1. Sube este código a un repositorio de GitHub.
2. Entra en https://vercel.com y conecta tu cuenta de GitHub.
3. Importa el repo.
4. Configuración:
   - **Framework preset:** Create React App
   - **Build command:** `npm run build`
   - **Output directory:** `build`
   - **Install command:** `npm install`
5. Deploy. En 2 minutos tendrás tu URL pública.

## Despliegue en Netlify

1. `npm run build`
2. Arrastra la carpeta `build/` a https://app.netlify.com/drop
3. Listo.

## Estructura

```
.
├── package.json
├── craco.config.js          # Alias @/ apunta a src/
├── tailwind.config.js
├── postcss.config.js
├── jsconfig.json
├── public/
│   ├── index.html
│   └── images/              # Imágenes del restaurante
└── src/
    ├── index.js             # Entry point
    ├── index.css            # Tailwind + variables CSS + tipografías
    ├── App.js               # Web completa (todos los componentes)
    └── App.css
```

## Editar contenido

Todo el contenido (textos, carta, horarios, teléfono, FAQ) está en `src/App.js`
en constantes/arrays bien identificadas al principio del archivo:

- `PHONE`, `PHONE_DISPLAY`, `WHATSAPP`, `ADDRESS` — datos de contacto
- `NAV` — menú de navegación
- `CARTA` — carta completa por categorías
- Para FAQ, testimonios, historia, etc. busca el array correspondiente dentro
  de su componente.

## Licencia

Uso propio para Taberna El Sardi.
