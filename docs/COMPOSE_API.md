# Britta Compose API Contract

## 1. Public API boundary

`com.britta.design` is the stable public namespace. `generated` and `internal` packages are
implementation details and must not be imported by application code.

The preferred entry point is:

```kotlin
Britta {
    BrittaButton(text = "Save", onClick = ::save)
}
```

`BrittaTheme` remains available for applications that need direct Material 3 control.

## 2. API rules

- Every public composable is `fun`, never a mutable singleton service.
- `Modifier` is optional and appears before the content lambda.
- Callbacks are supplied by the caller; components do not own application state.
- Public configuration uses immutable values (`val`) and `@Immutable` where appropriate.
- Collections crossing the API boundary are treated as read-only. Components never mutate caller data.
- No reflection, classpath scanning, service discovery, or dynamic component registry.
- No static initialization that loads icons, shaders, fonts, or themes.
- Optional capabilities are isolated in their own files and only referenced when called.
- Generated tokens are read-only API values and are regenerated from the canonical token source.

## 3. Lazy packaging rule

A Britta feature must satisfy all of these conditions:

1. It has no eager registration side effect.
2. It does not reference optional assets from another feature.
3. Its implementation is reachable only through its public API.
4. Its resources are referenced individually, not through a global catalog at runtime.
5. No blanket R8 keep rule retains the complete `com.britta.design` package.

Therefore an application that writes no Britta UI call has no runtime initialization cost from Britta;
with R8/resource shrinking enabled, unreachable Britta classes and resources can be removed.

This is a **build-time reachability guarantee**, not a claim that a library module can physically
exclude bytecode before the consumer shrinker runs.

## 4. Fail-fast rules

Reject programmer/configuration errors immediately:

- blank IDs or labels;
- empty required component collections;
- duplicate navigation IDs;
- invalid enum/configuration combinations;
- unsupported platform operations when no safe fallback exists.

Use `require`/`check` for developer-contract violations. Do not silently repair malformed API input.

## 5. Fail-safe rules

For optional visual capabilities where graceful degradation is valid:

- AGSL/shader effects may fall back to a normal Material 3 surface on unsupported Android versions;
- optional fonts fall back to `FontFamily.SansSerif`;
- decorative effects must never be required for core interaction or accessibility.

Fail-safe behavior must not hide corrupted configuration or security-sensitive errors.

## 6. Immutability rules

- Prefer `val` over `var`.
- Prefer immutable value objects over mutable configuration holders.
- Do not expose mutable collections, mutable singleton state, or global registries.
- State belongs to the application and is hoisted into the caller.
- `remember` is allowed only for derived UI/runtime state that has no externally visible mutation contract.

## 7. Security-oriented design rules

Britta is intentionally a closed, explicit API:

- no reflection;
- no arbitrary code execution from theme/token data;
- no dynamic class loading;
- no runtime shader source supplied through untrusted theme data;
- no network access from UI components;
- no persistence side effects from components;
- no implicit telemetry;
- no secrets or credentials in design tokens.

Design tokens are data, not executable configuration.

## 8. Code style

- Kotlin official formatting.
- Trailing commas in multiline declarations.
- Explicit public API signatures.
- Short composables with one responsibility.
- `when` over boolean flag explosions when variants grow.
- No `!!` in SDK code.
- No `catch (Exception) {}` that suppresses programmer errors.
- Comments explain contracts and constraints, not obvious syntax.
