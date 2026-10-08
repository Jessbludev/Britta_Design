# Britta Design

SDK de diseño cross-platform para Web/React y Android/Jetpack Compose.

Britta combina Material 3, tokens propios, utilidades Tailwind-like, componentes Compose/Web,
iconografía vectorial y shaders opcionales en un workspace único.

## Estructura

```text
core/
  tokens/                 # fuente de verdad de tokens

src/britta/               # runtime Web + generadores
web/                      # artefactos Web exportables

android/
  britta-compose/         # SDK Jetpack Compose
    src/main/res/drawable/ # IconForge VectorDrawable

assets/
  icons/                  # SVG + catálogo IconForge
  themes/                 # presets visuales

docs/
  ARCHITECTURE.md
```

## Diseño del SDK

- **Tokens**: contrato semántico compartido.
- **Web**: React + Tailwind CSS v4 + CSS variables.
- **Android**: Material 3 + Jetpack Compose.
- **Graphics**: Canvas/WebGL y RuntimeShader/AGSL cuando se solicitan.
- **Icons**: Material Symbols + IconForge como assets vectoriales.
- **Tree-shaking**: exports nombrados en Web; `implementation` + R8/resource shrinking en Android.

## Principio

Una aplicación debe poder importar solamente el componente que necesita sin arrastrar
intencionadamente un registry global de todos los recursos.

La optimización real de tamaño se delega al bundler/minificador de la plataforma; el SDK
evita referencias globales innecesarias.

## Android

```kotlin
BrittaTheme {
    BrittaButton(
        text = "Guardar",
        onClick = { /* ... */ }
    )
}
```

## Web

```tsx
import { BrittaButton, BrittaCard } from "@/britta";
```

Para el contrato completo de integración y decisiones de arquitectura, consultar
`docs/ARCHITECTURE.md`.

## SDK 0.2 — strict Compose model

Britta Compose now exposes a single high-level entry point:

```kotlin
Britta {
    BrittaButton(text = "Save", onClick = ::save)
}
```

The SDK is **lazy by reachability**. There is no global bootstrap, reflection, dynamic registry,
service discovery, or eager loading of components, icons, fonts, or shaders. Code is retained in the
consumer APK only when reachable after R8; resources are eligible for removal through Android
resource shrinking.

The public Compose API is immutable and state-hoisted. Invalid API contracts fail fast. Optional
visual effects fail safe when the platform cannot provide them. See:

- `docs/COMPOSE_API.md`
- `docs/SDK_PACKAGING.md`
- `android/SDK_RULES.md`
