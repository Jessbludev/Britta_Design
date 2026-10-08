# Britta Design — arquitectura unificada

## Objetivo

Britta es un design system cross-platform que unifica:

- Material 3 como semántica visual y primitives de Android.
- Tailwind CSS v4 como capa utilitaria Web.
- Jetpack Compose como implementación Android.
- Tokens únicos como fuente de verdad.
- IconForge como pack de iconos vectoriales integrado.
- AGSL/GLSL como efectos visuales opcionales.

## Regla de dependencias

`tokens -> platform adapters -> components -> studio`

El SDK no debe depender del Studio. El Studio puede consumir el SDK.

### Capas

- `core/`: tokens canónicos.
- `src/britta/`: runtime Web/React y generadores.
- `web/`: artefactos CSS y metadatos Web exportables.
- `android/britta-compose/`: SDK Jetpack Compose.
- `assets/icons/`: fuentes SVG + catálogo de IconForge.
- `assets/themes/`: presets visuales externos al contrato M3.
- `android/.../res/drawable/`: VectorDrawable integrados.
- `docs/`: contrato y decisiones de arquitectura.

## Carga selectiva

La API pública mantiene exports nombrados para permitir tree-shaking en Web.

En Android, las dependencias usan `implementation` y los recursos vectoriales se consumen por `R.drawable.*`; con minificación/resource shrinking activados en la aplicación consumidora, los componentes y recursos no alcanzables pueden eliminarse.

No se debe crear un registry dinámico que referencie los 100 iconos desde un único `when`/map si el objetivo es maximizar resource shrinking.

## Convención de uso

### Web

```tsx
import { BrittaButton, BrittaCard } from "@/britta";
```

### Compose

```kotlin
BrittaTheme {
    BrittaButton(
        text = "Guardar",
        onClick = { /* ... */ }
    )
}
```

## Fuente de verdad

No editar manualmente artefactos generados cuando exista un generador:

1. `core/tokens/tokens.json` o el seed del Studio.
2. Generadores TypeScript.
3. Artefactos Web/Compose.

IconForge se conserva como fuente de assets y catálogo; los VectorDrawable son recursos de distribución Android.

## Limpieza aplicada

Se eliminaron del paquete unificado artefactos del entorno de trabajo (`.grok`, `.vercel`, capturas, adjuntos embebidos y salidas generadas duplicadas). La aplicación/Studio se mantiene porque forma parte del workspace de Britta y necesita el runtime `src/britta`.
