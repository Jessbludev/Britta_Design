# Android SDK rules

1. `Britta { ... }` is the preferred composition boundary.
2. `BrittaTheme { ... }` is the low-level theme boundary.
3. A feature is opt-in by reaching its composable API.
4. The SDK performs no work from import/class loading alone.
5. No reflection, service loading, global registry, or dynamic class loading.
6. No mutable public configuration.
7. State is hoisted; UI components remain stateless.
8. Invalid developer contracts fail fast with `require`/`check`.
9. Optional effects fail safe when a platform capability is unavailable.
10. Release consumers must use R8 + resource shrinking.
11. Do not add blanket keep rules for `com.britta.design`.
12. Decorative effects, fonts, and shaders are never mandatory for interaction/accessibility.
