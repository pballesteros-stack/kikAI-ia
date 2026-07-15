# Documento de Entrega — kikAI Corporate Site

> Versión: Mayo 2026 | Desarrollador saliente: Pedro Ballesteros | Repo: https://github.com/pballesteros-stack/kikAI-ia

---

## 1. Resumen del Proyecto

Landing page premium de producto físico (coaster inteligente) con animaciones cinematográficas scroll-driven. Funciona como **plantilla reutilizable** para sitios corporativos de kikAI: cambiando `src/config/site.ts` e imágenes en `/public/` se puede rebrandear sin tocar JSX.

Estado actual: **plantilla base completa y funcional**. Build de producción genera ~291 KB JS gzipped.

---

## 2. Lenguajes y Tecnologías

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Lenguaje principal | TypeScript | 5.5.x |
| UI Framework | React | 18.3.x |
| Build tool | Vite | 5.4.x |
| Estilos | Tailwind CSS | 3.4.x |
| Animaciones | Framer Motion | 12.x |
| 3D / WebGL | Three.js + React Three Fiber | 0.184 / 8.x |
| Post-procesado 3D | @react-three/postprocessing | 2.x |
| Helpers 3D | @react-three/drei | 9.x |
| Backend (pendiente) | Supabase JS | 2.x |
| Iconos | Lucide React | 0.344 |
| Módulos | ESM nativo (`"type": "module"`) | — |

---

## 3. Estructura de Carpetas

```
KIKAIA/
├── public/                        # Assets estáticos
│   ├── kikAI_angle_1.png
│   ├── kikAI_angle_2.png
│   ├── kikAI_hero.png
│   ├── kikAI_thermal.png
│   ├── kikAI_badge.png
│   └── kikAI_grip.png
│
├── src/
│   ├── config/
│   │   └── site.ts                # ★ Config centralizada de marca
│   │
│   ├── components/
│   │   ├── index.ts               # Barrel export — importar siempre desde aquí
│   │   ├── Navigation.tsx         # Barra de navegación fija
│   │   ├── HeroKikAI.tsx          # Hero con 3 frames scroll-driven
│   │   ├── ConceptSection.tsx     # Texto + animación hover
│   │   ├── PortabilityCarousel.tsx# Carrusel horizontal scroll-driven
│   │   ├── ThermalSection.tsx     # Imagen térmica + slider interactivo
│   │   ├── GripSection.tsx        # Imagen full-bleed + métricas
│   │   ├── ProductEnd.tsx         # Footer con specs y links
│   │   ├── GlobalRipple.tsx       # Efecto ripple global al hacer clic
│   │   ├── HeroDisc.tsx           # Disco 3D animado (canvas)
│   │   ├── MagneticCanvas.tsx     # Canvas con efecto magnético
│   │   ├── NebulaCanvas.tsx       # Canvas nebulosa de fondo
│   │   ├── ParticleField.tsx      # Campo de partículas (Three.js)
│   │   ├── GripParallax.tsx       # Parallax para sección grip
│   │   ├── ProductModel3D.tsx     # Modelo 3D del producto (R3F)
│   │   └── ThermalShader.tsx      # Shader GLSL efecto térmico
│   │
│   ├── App.tsx                    # Composición de secciones
│   ├── main.tsx                   # Entry point de React
│   └── index.css                  # Tema base + clases utilitarias
│
├── docs/
│   └── claude/                    # Documentación para Claude Code
│       ├── 01_ARQUITECTURA.md
│       ├── 02_ESTADO_ACTUAL.md
│       ├── 03_BUENAS_PRACTICAS.md
│       ├── 04_AUDITORIA.md
│       ├── 05_EMERGENCIA.md
│       ├── 06_ARQUITECTURA_TECNICA.md
│       └── 07_CHANGELOG.md
│
├── .claude/
│   └── settings.json              # Permisos y config de Claude Code (proyecto)
│
├── CLAUDE.md                      # Instrucciones del proyecto para Claude Code
├── index.html                     # Entry HTML (carga fuentes Google)
├── tailwind.config.js             # Tokens de color y tipografía
├── vite.config.ts                 # Config del bundler
├── tsconfig.app.json              # TypeScript estricto para src/
└── package.json
```

---

## 4. Sistema de Diseño

### 4.1 Paleta de Colores (tokens Tailwind)

| Token | Hex | Uso |
|-------|-----|-----|
| `KIKIAI-black` | `#000000` | Fondo principal |
| `KIKIAI-charcoal` | `#1a1a1a` | Fondos secundarios, cards |
| `KIKIAI-cream` | `#FCFBF7` | Texto principal |
| `KIKIAI-orange` | `#FF5C00` | Acento principal, CTAs |
| `KIKIAI-burnt` | `#cc5500` | Variante oscura del naranja |
| `KIKIAI-olive` | `#4a5d23` | Sección Portabilidad |
| `KIKIAI-neon-cyan` | `#00ffff` | Detalles tech / efectos |
| `KIKIAI-neon-magenta` | `#ff00ff` | Detalles tech / efectos |

> **Regla:** usar siempre los tokens (`bg-KIKIAI-black`), nunca hex directos en className.

### 4.2 Tipografía

| Familia | Google Font | Clase Tailwind | Uso |
|---------|------------|----------------|-----|
| Headlines | Oswald | `font-headline` | Títulos de sección |
| Body | Inter | `font-body` | Cuerpo de texto, UI |

Cargadas en `index.html` vía `<link>` — no requieren instalación npm.

### 4.3 Clases Utilitarias (`index.css`)

| Clase | Descripción |
|-------|-------------|
| `.film-grain` | Overlay de ruido cinematográfico (fixed, z-50, sin pointer-events) |
| `.cinematic-lighting` | Gradiente radial naranja sutil de fondo |
| `.glass-card` | Tarjeta con backdrop-blur, borde semi-transparente |

---

## 5. Arquitectura de Componentes

### Flujo de datos
```
src/config/site.ts
       │
       ▼
  App.tsx  ──imports──▶  components/index.ts  ──▶  Componentes individuales
```

**Regla de oro:** todo texto de marca y rutas de imagen vienen de `site.ts`. Los componentes no tienen strings hardcodeados.

### Mapa de secciones (orden en pantalla)

```
┌─────────────────────────────────┐
│  Navigation (sticky top)        │
├─────────────────────────────────┤
│  HeroKikAI                      │  ← 400vh scroll-driven, 3 frames
├─────────────────────────────────┤
│  ConceptSection                 │  ← Hover interactivo
├─────────────────────────────────┤
│  PortabilityCarousel            │  ← Carrusel horizontal scroll-driven
├─────────────────────────────────┤
│  ThermalSection                 │  ← Imagen térmica + slider
├─────────────────────────────────┤
│  GripSection                    │  ← Full-bleed + métricas live
├─────────────────────────────────┤
│  ProductEnd (footer)            │  ← Specs grid + links
└─────────────────────────────────┘
  GlobalRipple (z-index alto, overlay global)
  film-grain   (fixed, decorativo)
```

---

## 6. Patrones de Animación

### Patrón 1 — Scroll-driven con sección tall
Usado en `HeroKikAI` y `PortabilityCarousel`. La sección ocupa múltiples alturas de viewport para que el scroll funcione como scrubber de animación.

```tsx
const containerRef = useRef(null);
const { scrollYProgress } = useScroll({ target: containerRef });

// Keypoints declarados como constantes nombradas (nunca números mágicos)
const F1_FADE_START = 0.25;
const opacity = useTransform(scrollYProgress, [0, F1_FADE_START], [1, 0]);

return (
  <section ref={containerRef} className="h-[400vh]">
    <div className="sticky top-0 h-screen">
      <motion.div style={{ opacity }} />
    </div>
  </section>
);
```

### Patrón 2 — Viewport animation (entrada al scroll)
Usado en secciones secundarias. Se activa una vez cuando el elemento entra al viewport.

```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
  viewport={{ once: true }}
/>
```

### Patrón 3 — Canvas / Three.js
Los componentes `HeroDisc`, `ParticleField`, `ProductModel3D`, `NebulaCanvas`, `MagneticCanvas` usan `@react-three/fiber` (R3F) con un `<Canvas>` de Three.js. `ThermalShader` usa GLSL custom via `shaderMaterial` de `@react-three/drei`.

---

## 7. Comandos de Desarrollo

```bash
npm run dev          # Servidor local → http://localhost:5173
npm run build        # Build de producción → /dist
npm run preview      # Preview del build de producción
npm run typecheck    # Verificación TypeScript (sin emitir)
npm run lint         # ESLint con typescript-eslint 8.59.2
```

> Antes de cada commit: `npm run typecheck && npm run lint`

---

## 8. Cómo Rebrandear la Plantilla

Para adaptar este proyecto a otra marca:

1. **`src/config/site.ts`** — cambiar nombre, tagline, textos de cada sección, links de footer
2. **`/public/`** — reemplazar las imágenes del producto (mantener los mismos nombres de archivo o actualizar las rutas en `site.ts`)
3. **`tailwind.config.js`** — cambiar los valores hex de los tokens `KIKIAI-*` (los nombres de token pueden quedarse igual)
4. **`index.html`** — cambiar el `<title>` y las fuentes de Google si se necesita otra tipografía
5. **No tocar JSX** para cambios de texto o marca

---

## 9. Pendiente (Backlog)

| Tarea | Prioridad | Estado | Notas |
|-------|-----------|--------|-------|
| Formulario de contacto funcional | Alta | 🟡 En progreso | Código listo. Falta configurar EmailJS + cuenta HostGator. Ver **sección 16**. |
| Integración Supabase | Alta | ⬜ Pendiente | SDK instalado, falta configurar cliente y variables de entorno |
| Review mobile completo | Alta | ⬜ Pendiente | Animaciones scroll-driven no probadas en iOS/Android |
| SEO: sitemap.xml + robots.txt | Media | ⬜ Pendiente | — |
| Favicon personalizado | Media | ⬜ Pendiente | Actualmente usa el de Vite |
| Imagen OG real | Media | ⬜ Pendiente | Placeholder `/og-image.png` |
| Sección de precios real | Baja | ⬜ Pendiente | Estructura de precios pendiente |

---

## 10. Herramientas IA — Claude Code

El proyecto está configurado para trabajar con **Claude Code** (CLI + extensión VS Code/Antigravity). Incluye documentación interna en `docs/claude/` y un `CLAUDE.md` en la raíz.

### 10.1 Plugins instalados

| Plugin | Fuente | Qué hace |
|--------|--------|----------|
| `feature-dev` | anthropics/claude-plugins-official | Desarrollo guiado de features: explora el código, diseña arquitectura y genera implementaciones con agentes especializados |
| `claude-md-management` | anthropics/claude-plugins-official | Audita y mejora los archivos CLAUDE.md del proyecto para mantener la documentación actualizada |

**Cómo activar los plugins:**
```
/feature-dev    → Inicia flujo de desarrollo de nueva feature
/revise-claude-md → Actualiza CLAUDE.md con aprendizajes de la sesión
```

### 10.2 Cómo usar `feature-dev` para mejorar el código

`feature-dev` orquesta 3 agentes especializados:

1. **code-explorer** — Lee el código existente, traza rutas de ejecución, mapea dependencias
2. **code-architect** — Diseña la implementación: qué archivos crear/modificar, flujo de datos, secuencia de build
3. **code-reviewer** — Revisa el código generado buscando bugs, vulnerabilidades y desviaciones de las convenciones del proyecto

**Flujo recomendado para agregar una feature:**
```
Usuario: /feature-dev Agregar sección de testimonios con animación de entrada
  → Claude explora el código (ve ConceptSection como referencia)
  → Diseña el nuevo componente siguiendo los patrones de Framer Motion del proyecto
  → Implementa en un archivo separado + actualiza index.ts
  → Hace review automático del código generado
```

**Flujo recomendado para refactorizar:**
```
Usuario: /feature-dev Refactorizar ThermalShader para que acepte colores como props
  → Explora ThermalShader.tsx y sus consumidores
  → Diseña la interfaz de props TypeScript
  → Implementa el cambio sin romper otros componentes
```

---

## 11. MCP — Google Stitch

**Google Stitch** es una herramienta de diseño de UI con IA de Google, conectada via MCP (Model Context Protocol). Permite generar pantallas, sistemas de diseño y variantes de UI directamente desde Claude Code.

### 11.1 Configuración

El servidor MCP está registrado a nivel de usuario en `C:\Users\Pedro\.claude.json` y se conecta a `https://stitch.googleapis.com/mcp`. Se agregó con:

```bash
claude mcp add -s user \
  -e "STITCH_API_KEY=<tu-api-key>" \
  -- google-stitch \
  "C:\Program Files\nodejs\node.exe" \
  "C:\Users\<usuario>\AppData\Roaming\npm\node_modules\@_davideast\stitch-mcp\bin\stitch-mcp.js" \
  proxy
```

> La API Key se obtiene en Google AI Studio. El paquete npm es `@_davideast/stitch-mcp`.

### 11.2 Herramientas disponibles (12 tools)

| Tool | Descripción |
|------|-------------|
| `list_projects` | Lista todos los proyectos en Stitch |
| `get_project` | Obtiene detalle de un proyecto |
| `create_project` | Crea un nuevo proyecto de diseño |
| `list_screens` | Lista pantallas de un proyecto |
| `get_screen` | Obtiene el código de una pantalla específica |
| `generate_screen_from_text` | Genera una pantalla nueva a partir de descripción en texto |
| `edit_screens` | Edita pantallas existentes con instrucciones en lenguaje natural |
| `generate_variants` | Genera variantes de una pantalla (ej: modo oscuro, mobile) |
| `list_design_systems` | Lista sistemas de diseño disponibles |
| `get_design_system` | Obtiene tokens de un design system |
| `create_design_system` | Crea un nuevo design system |
| `apply_design_system` | Aplica un design system a pantallas existentes |
| `update_design_system` | Actualiza tokens de un design system existente |

### 11.3 Workflow recomendado con Stitch + este proyecto

**Generar una nueva sección:**
```
"Usa Google Stitch para generar una pantalla de sección de precios 
con fondo negro, tipografía Oswald, acento naranja #FF5C00 
y 3 tiers de precio. Estilo minimalista premium."
```
→ Stitch genera el HTML/JSX → se adapta al componente React siguiendo los patrones del proyecto.

**Crear variantes mobile:**
```
"Genera una variante mobile de la pantalla del Hero, 
adaptando el layout para pantallas de 390px de ancho."
```

**Aplicar el design system:**
Primero crear el design system de kikAI en Stitch con los tokens de color y tipografía del proyecto, luego aplicarlo a todas las pantallas generadas para consistencia automática.

---

## 12. Variables de Entorno

Actualmente el proyecto no usa variables de entorno en runtime (Supabase está instalado pero no configurado). Cuando se integre:

```env
# .env.local (no commitear)
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

La API Key de Google Stitch vive en `C:\Users\<usuario>\.claude.json` — no en el proyecto.

---

## 13. Repositorio

- **GitHub:** https://github.com/pballesteros-stack/kikAI-ia
- **Branch principal:** `master`
- **CI/CD:** no configurado (deploy manual)

### Convenciones de Git
- Correr `npm run typecheck && npm run lint` antes de cada commit
- Un PR por feature o fix
- Commits descriptivos en inglés
- No commitear `.env.local` ni `C:\Users\..\.claude.json`

---

## 14. Chat Widget IA — `kika-chat`

Widget de inteligencia artificial integrado como **Web Component con Shadow DOM**. No entra en conflicto con Tailwind ni con el CSS global del proyecto.

### 14.1 Archivo del script

```
public/
└── chat-widget.iife.js   ← script del widget (no commitear si es binario grande)
```

El archivo debe estar en `/public/` para que Vite lo sirva en `/chat-widget.iife.js`.

### 14.2 Integración en `index.html`

El widget se monta justo antes del cierre de `</body>`:

```html
<!-- Chat Widget IA — Shadow DOM, no interfiere con Tailwind -->
<script src="/chat-widget.iife.js"></script>
<kika-chat
  webhook-url="https://flows.kikaia.cl/webhook/abapcloud-chat"
  bot-name="Rodrigo AI"
  primary-color="#1e3a8a"
  welcome-message="¡Hola! Soy Rodrigo de abapcloud. ¿En qué te puedo ayudar?"
  position="bottom-right"
  placeholder="Pregúntame sobre SAP/ABAP..."
></kika-chat>
```

> **Importante:** los valores `bot-name`, `webhook-url` y `welcome-message` son específicos de cada cliente. Al reutilizar esta plantilla para otro proyecto, cambiar estos atributos directamente en `index.html` antes de hacer el build.

### 14.3 Atributos de configuración

| Atributo | Descripción | Valor abapcloud |
|----------|-------------|-----------------|
| `webhook-url` | Endpoint n8n/webhook que procesa los mensajes | `https://flows.kikaia.cl/webhook/abapcloud-chat` |
| `bot-name` | Nombre del asistente visible en el chat | `Rodrigo AI` |
| `primary-color` | Color principal del widget (hex) | `#1e3a8a` (navy — tema Corporate) |
| `welcome-message` | Mensaje de bienvenida al abrir el chat | `¡Hola! Soy Rodrigo de abapcloud. ¿En qué te puedo ayudar?` |
| `position` | Posición fija en pantalla | `bottom-right` |
| `placeholder` | Placeholder del campo de texto | `Pregúntame sobre SAP/ABAP...` |

> Los atributos usan **kebab-case** aunque el widget se integre en un contexto JSX/React.

### 14.4 Convivencia con ThemeToggle

El `ThemeToggle` (selector de paletas) fue movido a `bottom-left` para no superponerse con el widget que ocupa `bottom-right`. Esta posición está definida en [ThemeToggle.tsx](../src/components/sap/ThemeToggle.tsx):

```tsx
<div className="fixed bottom-6 left-6 z-[200] flex flex-col items-start gap-3">
```

### 14.5 Notas importantes

- El widget usa `position: fixed` interno — no requiere contenedor relativo o absoluto.
- El Shadow DOM aísla completamente sus estilos: cambios en Tailwind o `index.css` no lo afectan.
- El `primary-color` es estático (`#1e3a8a`); si el usuario cambia de paleta con el ThemeToggle, el widget mantiene su color. Para sincronizarlo con el tema activo habría que leer `getComputedStyle(document.documentElement).getPropertyValue('--sap-accent')` en runtime y actualizar el atributo vía JS.

---

## 15. Deploy y Re-deploy — HostGator (abapcloud.cl)

El sitio se aloja en **HostGator Chile** bajo un addon domain. Los archivos van en `/home1/rodri452/abapcloud.cl/` — **no** en `public_html` (que corresponde al dominio principal del hosting).

### 15.1 Primer deploy

1. Ajustar atributos del chat widget en `index.html` (ver sección 14.2)
2. `npm run build` — genera `/dist`
3. Comprimir contenido de `/dist` en zip:
   ```bash
   powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'abapcloud-deploy.zip' -Force"
   ```
4. En cPanel → **Administrador de archivos** → entrar a `abapcloud.cl/`
5. Eliminar archivos viejos (conservar `.well-known/`)
6. Subir `abapcloud-deploy.zip` → clic derecho → **Extraer**
7. Eliminar el zip

### 15.2 Re-deploy (actualizaciones)

Mismo flujo simplificado — los archivos se sobreescriben:

```bash
# 1. Build
npm run build

# 2. Zip
powershell -Command "Compress-Archive -Path 'dist\*' -DestinationPath 'abapcloud-deploy.zip' -Force"
```

Luego en cPanel: subir zip → extraer en `abapcloud.cl/` → eliminar zip.

### 15.3 Verificación post-deploy

- Abrir `https://abapcloud.cl` en **ventana de incógnito** (evita caché del navegador)
- Confirmar que el chat muestra **"Rodrigo AI"** y el webhook apunta a `abapcloud-chat`
- Si el File Manager oculta `.htaccess`: **Configuración** → activar *"Mostrar archivos ocultos"*

### 15.4 Estructura esperada en `abapcloud.cl/`

```
abapcloud.cl/
├── .well-known/          ← SSL — no tocar
├── assets/
│   ├── index-[hash].js
│   └── index-[hash].css
├── .htaccess             ← SPA routing (generado desde public/)
├── chat-widget.iife.js
├── hero-bg.png
└── index.html
```

---

## 16. Formulario de Contacto — EmailJS (abapcloud.cl)

El formulario de contacto usa **EmailJS** para enviar correos directamente desde el frontend sin necesidad de backend. El código está 100 % listo; solo falta la configuración externa en los servicios de terceros.

### 16.1 Estado del código

| Elemento | Archivo | Estado |
|----------|---------|--------|
| Librería `@emailjs/browser` instalada | `package.json` | ✅ Listo |
| Formulario conectado a `emailjs.send()` | `src/components/sap/CTAFinalSAP.tsx` | ✅ Listo |
| Variables de entorno Vite | `.env` | ✅ Con placeholders |
| Spinner `Loader2` mientras envía | `CTAFinalSAP.tsx` línea 163 | ✅ Listo |
| Mensaje de error si falla | `CTAFinalSAP.tsx` línea 154 | ✅ Listo |
| Pantalla de confirmación si éxito | `CTAFinalSAP.tsx` línea 112 | ✅ Listo |
| Email destino en código | `CTAFinalSAP.tsx` línea 89 | ✅ `rodrigo@abapcloud.cl` |
| `.env` protegido en `.gitignore` | `.gitignore` línea 3 | ✅ Listo |

### 16.2 Variables del template que usa el código

El `emailjs.send()` en `CTAFinalSAP.tsx` pasa exactamente estas variables:

```ts
{
  from_name:  form.name,     // → {{from_name}}
  from_email: form.email,    // → {{from_email}}
  company:    form.company,  // → {{company}}
  message:    form.message,  // → {{message}}
}
```

La plantilla en EmailJS **debe usar exactamente esos nombres** (`{{from_name}}`, `{{from_email}}`, `{{company}}`, `{{message}}`).

### 16.3 Pasos externos para activar el formulario

> **Estos pasos se hacen fuera del código** — en HostGator y en emailjs.com.

#### Paso 1 — Crear la cuenta de correo en HostGator

1. Panel cPanel → **Correos** → **Cuentas de correo** → Crear cuenta
2. Cuenta: `rodrigo@abapcloud.cl`
3. Guardar: servidor SMTP (`mail.abapcloud.cl`), puerto (`465`), contraseña

#### Paso 2 — Registrarse en EmailJS

Ir a [emailjs.com](https://emailjs.com) y crear una cuenta gratuita (plan gratuito: 200 emails/mes).

#### Paso 3 — Conectar el correo de HostGator como servicio SMTP

1. En EmailJS → **Email Services** → **Add New Service** → **Custom SMTP**
2. Configurar con los datos de HostGator:
   - **SMTP Host:** `mail.abapcloud.cl`
   - **Puerto:** `465` (SSL)
   - **Usuario:** `rodrigo@abapcloud.cl`
   - **Contraseña:** la del paso 1
3. Copiar el **Service ID** generado (formato: `service_XXXXXXX`)

#### Paso 4 — Crear la plantilla de email

1. En EmailJS → **Email Templates** → **Create New Template**
2. Configurar:
   - **To:** `rodrigo@abapcloud.cl`
   - **From name:** `{{from_name}}`
   - **Reply To:** `{{from_email}}`
   - **Subject:** `Nuevo contacto desde abapcloud.cl — {{company}}`
   - **Body:**
     ```
     Nombre: {{from_name}}
     Email: {{from_email}}
     Empresa: {{company}}

     Mensaje:
     {{message}}
     ```
3. Copiar el **Template ID** generado (formato: `template_XXXXXXX`)

#### Paso 5 — Copiar los 3 IDs al archivo `.env`

Reemplazar los `XXXXXXX` con los valores reales obtenidos en los pasos anteriores:

```env
# .env — NO commitear (ya protegido en .gitignore)
VITE_EMAILJS_SERVICE_ID=service_XXXXXXX
VITE_EMAILJS_TEMPLATE_ID=template_XXXXXXX
VITE_EMAILJS_PUBLIC_KEY=XXXXXXXXXXXXXXX
```

> La **Public Key** se obtiene en EmailJS → **Account** → **General** → API Keys.

#### Paso 6 — Reiniciar el servidor de desarrollo y probar

```bash
npm run dev
```

Llenar el formulario en `http://localhost:5173/#contacto` → verificar que llegue el correo a `rodrigo@abapcloud.cl`.

#### Paso 7 — Re-deploy a producción

Una vez probado localmente, seguir el flujo de la **sección 15.2** para subir a HostGator.

> ⚠️ **Importante:** el archivo `.env` **no se sube a HostGator** (las variables se leen en build-time). El build generado en `/dist` ya lleva los valores incrustados — por eso el `.env` con los valores reales solo necesita existir en la máquina de desarrollo al momento de correr `npm run build`.