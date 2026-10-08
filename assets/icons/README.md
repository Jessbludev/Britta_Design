# IconForge integrado

100 iconos vectoriales originales integrados en el SDK.

- `*.svg`: fuente editable.
- `icon-catalog.json`: catálogo y metadatos.
- `android/britta-compose/src/main/res/drawable/*.xml`: VectorDrawable para Android.

Los recursos Android se mantienen como drawables individuales para permitir resource shrinking.
No crear un registro dinámico global que fuerce referencias a todo el pack.
