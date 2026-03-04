# GymManager UI

Prueba técnica — interfaz de gestión para gimnasios construida con React, TypeScript y Tailwind CSS v4.

## Vistas incluidas

- **Perfil de usuario** — datos personales con edición inline, etiquetas y toggle de estado.
- **Nuevo plan** — formulario completo de membresía: precios, horarios por día, eventos de acceso, beneficios.
- **Incidencias** — gestión de incidencias con comentarios, cambio de estado, medios adjuntos e historial.
- **Orden de trabajo** — checklist de pasos, materiales, tiempos de ejecución y firmas.
- **Detalle de sala** — listado de equipos con estado OK/Falla y mantenimiento preventivo.

## Stack

- React 19 + TypeScript
- Tailwind CSS v4.2 (tokens vía `@theme`)
- Zustand (estado global con persistencia en localStorage)
- Vite

## Cómo correrlo

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
npm run preview
```

## Estructura del proyecto

```
src/
  components/shared/   → componentes reutilizables (Button, Input, Badge…)
  features/            → una carpeta por dominio de negocio
  hooks/               → hooks custom (useForm)
  store/               → estado global con Zustand
  types/               → interfaces y tipos del dominio
  theme/               → tokens de diseño (global.css)
```

Más detalles sobre las decisiones técnicas en [PLANNING.md](PLANNING.md).
