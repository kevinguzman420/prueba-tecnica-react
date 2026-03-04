# Planning — GymManager UI

## Tabla de tiempos

| Módulo | Estimación | Real | Nota |
| :--- | :---: | :---: | :--- |
| Setup inicial + theme (Tailwind v4 `@theme`) | 0.5 h | 0.4 h | Vite + tokens de color/sombra en CSS puro |
| Componentes compartidos (Button, Input, Badge…) | 1.5 h | 1.2 h | Los armé primero para no repetir estilos después |
| Perfil de usuario | 1.0 h | 0.8 h | Sidebar con edición inline y persistencia |
| Nuevo plan (Membresía) | 2.0 h | 1.8 h | El más pesado: ~20 campos, horarios por día, tabla de eventos |
| Incidencias (Mantenimiento) | 1.0 h | 0.9 h | Flujo de estados, comentarios, historial de cambios |
| Orden de trabajo | 0.5 h | 0.5 h | Checklist interactivo, materiales, firmas |
| Detalle de sala (Instalaciones) | 1.0 h | 0.7 h | CRUD de ítems con cambio de estado OK/Falla |
| **Total** | **7.5 h** | **6.3 h** | |

La diferencia entre estimación y tiempo real se explica sobre todo porque los componentes compartidos ya estaban listos cuando arranqué las features, así que el ensamblaje fue más rápido de lo esperado.

---

## Por qué organicé el proyecto así

### Carpetas por feature, no por tipo de archivo

La tentación clásica es hacer carpetas como `components/`, `pages/`, `utils/`. Funciona en proyectos chicos, pero en cuanto crece un poco se vuelve un lío encontrar qué va con qué. Preferí agrupar por dominio de negocio:

```
src/features/
  membership/     → todo lo de planes
  maintenance/    → incidencias
  workorder/      → órdenes de trabajo
  facilities/     → salas e ítems
  profile/        → perfil de usuario
```

Así, si mañana alguien necesita tocar la lógica de incidencias, sabe exactamente dónde buscar sin tener que navegar entre 5 carpetas distintas. Está inspirado en Feature-Sliced Design, pero sin la ceremonia completa porque para el alcance de esta prueba no tenía sentido agregar capas que no iban a aportar nada.

### Componentes "tontos" en `shared/`

Los botones, inputs, badges y cards viven en `src/components/shared/`. No saben nada del negocio: solo reciben props y renderizan. Esto me dio dos ventajas concretas:
- Consistencia visual automática (un `<Button variant="primary">` se ve igual en todas las pantallas).
- Velocidad: cuando llegué a armar las features, ya tenía los bloques listos y solo tuve que ensamblar.

### Tailwind v4 con `@theme` en vez de config

Usé Tailwind CSS v4.2 con la directiva `@theme` directamente en el CSS global. Esto me permitió definir los tokens de diseño (colores, sombras, radii) como variables CSS nativas que Tailwind reconoce automáticamente, sin necesidad de un `tailwind.config.js`. Menos archivos de configuración, misma flexibilidad.

### Estado global con Zustand

Elegí Zustand por dos razones prácticas:
1. Es mínimo (~1 KB) y no requiere providers ni boilerplate.
2. El middleware `persist` me dio persistencia en localStorage gratis, que para una prueba técnica donde quieres que el evaluador vea que los datos no se pierden al refrescar, viene muy bien.

El store tiene un solo slice con todas las acciones. En un proyecto real lo partiría en slices por dominio, pero acá con un archivo alcanza y sobra.

### TypeScript estricto, sin `any`

Todo el proyecto tiene tipado estricto. Las interfaces de dominio están centralizadas en `src/types/index.ts` y las props de cada componente están tipadas con `interface`. No usé `any` en ningún lado. Esto ayuda a que el IDE te avise al toque si conectaste mal un prop o te faltó un campo.

---

## Decisiones de diseño visual

- **Tokens centralizados**: colores y sombras definidos una sola vez en `@theme`. Si el diseñador cambia el azul primario, lo cambio en un solo lugar y se propaga a toda la app.
- **Flexbox y Grid con Tailwind**: los layouts se hicieron con utilidades de Tailwind para mantener la fidelidad al diseño sin CSS suelto.
- **Animación fade-in**: agregué una transición suave al cambiar de pestaña. Es un detalle chico, pero mejora bastante la percepción de fluidez.
