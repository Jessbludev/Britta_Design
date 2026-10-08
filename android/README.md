# Britta Design Android SDK

## Composition model

`BrittaTheme` and `Britta` are lazy composition boundaries. Importing the SDK does not initialize
runtime state, register components, scan classes, or load icons/shaders.

## Minimal packaging contract

The consumer application should enable R8 and resource shrinking for release builds. Britta does
not ship blanket keep rules, dynamic registries, reflection, or service discovery. Therefore an
unused component can be removed by the consumer's shrinker.

For strict per-feature APK budgets, consume only the feature APIs used by the application and avoid
`material-icons-extended`; Britta's own vector assets are referenced individually.
