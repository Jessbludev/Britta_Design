# Guía de integración — Britta Design 0.2.0

Britta Design es un SDK de diseño multiplataforma: **React/Web + Jetpack Compose/Android**. La fuente de verdad vive en `core/tokens/tokens.json`; los iconos y presets son artefactos versionados.

## Web / React

1. Copia o publica el workspace como paquete privado.
2. Importa componentes y tokens desde `src/britta` o el entrypoint de tu bundler.
3. Incluye `web/britta.css` y `web/tokens.css` una sola vez.
4. Para iconos, importa el SVG requerido desde `assets/icons/<nombre>.svg` o usa `web/icons.json` para resolver nombres.
5. Para tipografía, sirve `web/fonts/IconForge.woff2` y carga `web/fonts/iconforge.css`.

```tsx
import { BrittaButton, BrittaTheme } from "@britta/design";
import "@britta/design/web/britta.css";
import "@britta/design/web/tokens.css";
import "@britta/design/web/fonts/iconforge.css";

export function Screen() {
  return (
    <BrittaTheme theme="aurora-neon">
      <BrittaButton onClick={() => {}}>Guardar</BrittaButton>
    </BrittaTheme>
  );
}
```

Para un icono directo: `<img src="/icons/settings.svg" alt="Ajustes" />`. Para fuente: `<span className="iconforge iconforge-settings" aria-hidden="true" />`.

## Android / Jetpack Compose

Añade el módulo local o publícalo como Maven artifact:

```kotlin
dependencies {
    implementation(project(":android:britta-compose"))
}
```

Integra tema y componentes:

```kotlin
BrittaTheme(theme = BrittaThemeVariant.AuroraNeon) {
    BrittaButton(text = "Guardar", onClick = ::save)
    BrittaNavBar(items = items, selectedIndex = selectedIndex, onSelect = onSelect)
}
```

Los 100 VectorDrawable están en `android/britta-compose/src/main/res/drawable`. Usa el recurso individual (`R.drawable.settings`) para conservar tree-shaking y resource shrinking.

```kotlin
Icon(
    painter = painterResource(R.drawable.settings),
    contentDescription = "Ajustes"
)
```

Activa reducción en release:

```kotlin
release {
    isMinifyEnabled = true
    isShrinkResources = true
}
```

## Temas tipados

Hay **15 familias × 5 variantes = 75 presets** en `assets/themes`. Cada preset cubre tokens semánticos para superficie, contenido, borde, acción, TopBar, NavBar, botones, campos y estados. En Android, la API tipada está en `assets/themes/IconForgeThemes.kt`; en Web, los presets CSS están en `assets/themes/iconforge-themes.css`.

## Verificación local

```bash
npm ci
npm run validate:sdk
npm run typecheck
npm test
npm run build:dev
```

El workflow `CI` ejecuta estos pasos en cada push/PR. El workflow `Merge confirmation` mantiene el estado pendiente hasta que el PR tenga la etiqueta `ready-to-merge` y la casilla de confirmación indicada en `.github/pull_request_template.md`.
