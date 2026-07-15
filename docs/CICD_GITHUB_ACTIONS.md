# CI/CD con GitHub Actions — kikAI Corporate Site

> Este documento explica la arquitectura de los archivos YAML de GitHub Actions recomendados para este proyecto, junto con los archivos listos para copiar a `.github/workflows/`.

---

## Índice

1. [Anatomía de un archivo YAML de GitHub Actions](#1-anatomía-de-un-archivo-yaml)
2. [Estructura de carpetas .github](#2-estructura-de-carpetas-github)
3. [Workflow 1 — CI (verificación en cada PR)](#3-workflow-1--ci)
4. [Workflow 2 — Deploy a producción](#4-workflow-2--deploy-a-producción)
5. [Workflow 3 — Preview en Pull Requests](#5-workflow-3--preview-en-pull-requests)
6. [Secrets y variables de entorno](#6-secrets-y-variables-de-entorno)
7. [Opciones de deploy: Vercel vs Netlify vs GitHub Pages](#7-opciones-de-deploy)
8. [Cómo activar todo desde cero](#8-cómo-activar-todo-desde-cero)

---

## 1. Anatomía de un archivo YAML

Antes de ver los archivos del proyecto, aquí está la estructura base de cualquier workflow:

```yaml
name: Nombre del workflow          # Se muestra en la pestaña Actions de GitHub

on:                                # TRIGGERS — cuándo se ejecuta
  push:
    branches: [master]             # Al hacer push a master
  pull_request:
    branches: [master]             # Al abrir/actualizar un PR hacia master

jobs:                              # Lista de trabajos a ejecutar
  nombre-del-job:                  # ID interno del job (snake_case)
    runs-on: ubuntu-latest         # Runner: máquina virtual donde corre

    steps:                         # Pasos secuenciales dentro del job
      - name: Checkout del repo    # Descripción legible del paso
        uses: actions/checkout@v4  # Action reutilizable de GitHub/comunidad

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:                      # Parámetros de la action
          node-version: '20'
          cache: 'npm'             # Cache de dependencias

      - name: Instalar dependencias
        run: npm ci                # Comando shell a ejecutar

      - name: Verificar tipos
        run: npm run typecheck
```

### Conceptos clave

| Concepto | Descripción |
|----------|-------------|
| `on` | Eventos que disparan el workflow (push, pull_request, schedule, workflow_dispatch) |
| `jobs` | Unidades de trabajo independientes que pueden correr en paralelo |
| `steps` | Pasos secuenciales dentro de un job. Si uno falla, el job se detiene |
| `uses` | Reutiliza una Action publicada en GitHub Marketplace |
| `run` | Ejecuta un comando shell directamente |
| `with` | Parámetros de configuración para una Action |
| `env` | Variables de entorno para un paso o job completo |
| `secrets` | Variables cifradas guardadas en GitHub Settings → Secrets |
| `needs` | Hace que un job espere a que otro termine antes de arrancar |
| `if` | Condición para ejecutar un job o step |

---

## 2. Estructura de carpetas .github

```
KIKAIA/
└── .github/
    ├── workflows/
    │   ├── ci.yml              # Workflow 1: typecheck + lint en cada PR
    │   ├── deploy.yml          # Workflow 2: deploy a producción (master)
    │   └── preview.yml         # Workflow 3: preview URL por PR
    └── PULL_REQUEST_TEMPLATE.md  # (opcional) Template para PRs
```

> Los archivos YAML deben estar en `.github/workflows/` exactamente. GitHub los detecta automáticamente.

---

## 3. Workflow 1 — CI

**Archivo:** `.github/workflows/ci.yml`

**Cuándo corre:** en cada `push` y en cada `pull_request` hacia `master`.

**Qué hace:**
- Instala dependencias con caché
- Verifica TypeScript (`tsc --noEmit`)
- Corre ESLint
- Hace un build de producción para confirmar que compila

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [master]
  pull_request:
    branches: [master]

jobs:
  verify:
    name: Typecheck + Lint + Build
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci
        # npm ci usa package-lock.json — más rápido y reproducible que npm install

      - name: TypeScript check
        run: npm run typecheck
        # Corre: tsc --noEmit -p tsconfig.app.json

      - name: ESLint
        run: npm run lint
        # Corre: eslint . con typescript-eslint 8.x

      - name: Build de producción
        run: npm run build
        # Confirma que Vite puede generar /dist sin errores
        # Si Three.js o shaders GLSL fallan en build, esto lo detecta
```

### Por qué este orden importa

```
checkout → setup node (con caché) → npm ci → typecheck → lint → build
              ↑
         La caché de npm evita descargar ~200 MB de node_modules en cada ejecución.
         Con caché fría: ~60s. Con caché caliente: ~15s.
```

---

## 4. Workflow 2 — Deploy a Producción

**Archivo:** `.github/workflows/deploy.yml`

**Cuándo corre:** solo cuando se hace `push` a `master` (merge de un PR).

**Qué hace:** pasa CI y despliega a producción automáticamente.

A continuación las tres variantes según la plataforma elegida. **Usar solo una.**

---

### Variante A — Deploy a Vercel (recomendado)

Vercel es la opción más simple para proyectos Vite/React. El CLI de Vercel hace el build internamente.

```yaml
# .github/workflows/deploy.yml  (variante Vercel)
name: Deploy a Producción

on:
  push:
    branches: [master]

jobs:
  ci:
    name: Verificar antes de deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint

  deploy:
    name: Deploy → Vercel Production
    runs-on: ubuntu-latest
    needs: ci                      # Solo corre si el job 'ci' pasó
    environment:
      name: production
      url: ${{ steps.deploy.outputs.url }}

    steps:
      - uses: actions/checkout@v4

      - name: Deploy a Vercel
        id: deploy
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

**Secrets requeridos:** `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`
(Ver sección 6 — cómo obtenerlos)

---

### Variante B — Deploy a Netlify

```yaml
# .github/workflows/deploy.yml  (variante Netlify)
name: Deploy a Producción

on:
  push:
    branches: [master]

jobs:
  ci:
    name: Verificar antes de deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint

  deploy:
    name: Deploy → Netlify Production
    runs-on: ubuntu-latest
    needs: ci

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci
      - run: npm run build
        # Netlify no hace el build — nosotros generamos /dist

      - name: Deploy a Netlify
        uses: nwtgck/actions-netlify@v3
        with:
          publish-dir: './dist'
          production-branch: master
          production-deploy: true
          deploy-message: "Deploy desde GitHub Actions — ${{ github.sha }}"
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

**Secrets requeridos:** `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`

---

### Variante C — Deploy a GitHub Pages (gratuito, sin cuenta externa)

```yaml
# .github/workflows/deploy.yml  (variante GitHub Pages)
name: Deploy a GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write                  # Requerido por GitHub Pages OIDC

concurrency:
  group: pages
  cancel-in-progress: true         # Cancela deploy anterior si hay uno nuevo

jobs:
  ci:
    name: Verificar antes de deploy
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run typecheck
      - run: npm run lint

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: ci
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          # Si el repo no está en la raíz del dominio, configurar base path:
          # VITE_BASE_PATH: /kikAI-ia/
          NODE_ENV: production

      - name: Subir artefacto de Pages
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

  deploy:
    name: Deploy → GitHub Pages
    runs-on: ubuntu-latest
    needs: build
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - name: Deploy a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

> Para GitHub Pages con ruta base (`/kikAI-ia/`), agregar en `vite.config.ts`:
> ```ts
> export default defineConfig({ base: '/kikAI-ia/', plugins: [react()] })
> ```

**Sin secrets** — usa permisos OIDC nativos de GitHub. Solo activar Pages en Settings → Pages → Source: GitHub Actions.

---

## 5. Workflow 3 — Preview en Pull Requests

**Archivo:** `.github/workflows/preview.yml`

**Cuándo corre:** cuando se abre o actualiza un Pull Request hacia `master`.

**Qué hace:** despliega una URL de preview única por PR y la comenta automáticamente en el PR.

```yaml
# .github/workflows/preview.yml
name: Preview por Pull Request

on:
  pull_request:
    branches: [master]
    types: [opened, synchronize, reopened]

jobs:
  preview:
    name: Deploy Preview
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write          # Para poder comentar en el PR

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: TypeScript check
        run: npm run typecheck

      - name: ESLint
        run: npm run lint

      - name: Deploy preview a Vercel
        id: preview
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          # Sin --prod → es un preview, no producción
          github-token: ${{ secrets.GITHUB_TOKEN }}
          # GITHUB_TOKEN es automático — no requiere configuración

      - name: Comentar URL en el PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: `### Preview desplegado ✅\n\n🔗 **URL:** ${{ steps.preview.outputs.preview-url }}\n\n_Commit: \`${{ github.sha }}\`_`
            })
```

---

## 6. Secrets y Variables de Entorno

Los secrets se configuran en: **GitHub → Settings → Secrets and variables → Actions → New repository secret**

### Secrets por plataforma

#### Vercel
| Secret | Cómo obtenerlo |
|--------|----------------|
| `VERCEL_TOKEN` | vercel.com → Settings → Tokens → Create |
| `VERCEL_ORG_ID` | En `.vercel/project.json` después de correr `vercel link` una vez |
| `VERCEL_PROJECT_ID` | En `.vercel/project.json` después de correr `vercel link` |

```bash
# Instalar Vercel CLI y vincular el proyecto (solo una vez):
npm i -g vercel
vercel link
cat .vercel/project.json   # Aquí están orgId y projectId
```

#### Netlify
| Secret | Cómo obtenerlo |
|--------|----------------|
| `NETLIFY_AUTH_TOKEN` | app.netlify.com → User settings → Applications → Personal access tokens |
| `NETLIFY_SITE_ID` | app.netlify.com → Site → Settings → General → Site ID |

#### GitHub Pages
No requiere secrets manuales. Solo activar en Settings → Pages → Source: **GitHub Actions**.

### Variables de entorno de la app (Supabase)

Cuando se integre Supabase, agregar en GitHub Secrets y referenciar en el workflow de build:

```yaml
- run: npm run build
  env:
    VITE_SUPABASE_URL: ${{ secrets.VITE_SUPABASE_URL }}
    VITE_SUPABASE_ANON_KEY: ${{ secrets.VITE_SUPABASE_ANON_KEY }}
```

> Variables Vite deben tener prefijo `VITE_` para ser expuestas al cliente.

---

## 7. Opciones de Deploy

| | Vercel | Netlify | GitHub Pages |
|--|--------|---------|-------------|
| **Costo** | Gratis (hobby) | Gratis | Gratis |
| **Dominio custom** | Sí (gratis) | Sí (gratis) | Sí (gratis) |
| **Preview URLs** | Automático | Automático | No nativo |
| **Build en plataforma** | Sí | Sí | No (CI hace el build) |
| **Complejidad config** | Baja | Baja | Media |
| **Edge Functions** | Sí | Sí | No |
| **Recomendado para** | Proyectos activos | Proyectos activos | Demos / repositorios públicos |

**Recomendación para este proyecto:** Vercel. Detecta Vite automáticamente, sin configuración adicional, y las preview URLs por PR son la mejor DX del equipo.

---

## 8. Cómo Activar Todo Desde Cero

### Paso 1 — Crear los archivos

```bash
mkdir -p .github/workflows
```

Copiar los archivos YAML de este documento a `.github/workflows/`.

### Paso 2 — Elegir plataforma y configurar secrets

**Para Vercel:**
```bash
npm i -g vercel
vercel login
vercel link        # Vincula el proyecto, genera .vercel/project.json
# Copiar orgId y projectId a GitHub Secrets
```

Agregar en GitHub Secrets:
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

**Para GitHub Pages:**
- Ir a Settings → Pages → Source → GitHub Actions
- No requiere secrets

### Paso 3 — Ajustar vite.config.ts (solo para GitHub Pages)

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/kikAI-ia/',   // Nombre exacto del repositorio en GitHub
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
```

### Paso 4 — Primer push

```bash
git add .github/
git commit -m "ci: add GitHub Actions workflows"
git push origin master
```

Ir a **GitHub → pestaña Actions** para ver los workflows corriendo.

### Paso 5 — Probar preview

Crear un branch y abrir un PR:
```bash
git checkout -b test/cicd-preview
git commit --allow-empty -m "test: trigger preview workflow"
git push origin test/cicd-preview
# Abrir PR en GitHub → debería aparecer comentario con URL de preview
```

---

## Diagrama del Flujo Completo

```
Developer push / PR
        │
        ▼
┌───────────────────────────────────────────────────────┐
│  Evento: pull_request → master                        │
│                                                       │
│  preview.yml                                          │
│  ├── typecheck                                        │
│  ├── lint                                             │
│  └── deploy preview → comenta URL en PR              │
└───────────────────────────────────────────────────────┘
        │
        │  PR aprobado y mergeado
        ▼
┌───────────────────────────────────────────────────────┐
│  Evento: push → master                                │
│                                                       │
│  ci.yml                     deploy.yml                │
│  ├── typecheck               needs: ci                │
│  ├── lint               ──▶  └── deploy production   │
│  └── build                                            │
└───────────────────────────────────────────────────────┘
        │
        ▼
   URL de producción actualizada
```

---

## Referencia rápida de sintaxis YAML

```yaml
# Strings — con o sin comillas (comillas necesarias si hay : o caracteres especiales)
name: Mi workflow
name: 'paso: con dos puntos'

# Listas
branches: [master, develop]     # forma corta
branches:                        # forma larga
  - master
  - develop

# Multiline strings
run: |                           # | preserva saltos de línea
  npm ci
  npm run build
  npm run test

run: >                           # > colapsa en una sola línea
  echo "hola mundo"

# Variables de contexto (sintaxis ${{ }})
${{ secrets.MI_SECRET }}         # Secret de GitHub
${{ github.sha }}                # SHA del commit actual
${{ github.ref_name }}           # Nombre del branch/tag
${{ steps.mi-step.outputs.url }} # Output de un step anterior

# Condiciones
if: github.ref == 'refs/heads/master'
if: failure()                    # Solo si un step anterior falló
if: success() && github.event_name == 'push'
```