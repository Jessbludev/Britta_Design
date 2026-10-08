# Britta SDK Packaging Policy

## Objective

The SDK follows **reachability-based packaging**: only code and resources reachable from the consumer
application's actual Britta API usage should survive release shrinking.

### Required consumer release configuration

```kotlin
buildTypes {
    release {
        isMinifyEnabled = true
        isShrinkResources = true
    }
}
```

Do not add `-keep com.britta.design.**` in the consuming application unless a specific integration
requires it.

## Feature isolation

| Feature | Load/retain condition |
|---|---|
| Core theme/tokens | `Britta` / `BrittaTheme` is referenced |
| Button | `BrittaButton` is reachable |
| Card | `BrittaCard` is reachable |
| Navigation | `BrittaNavBar`/`BrittaNavRail` is reachable |
| Graphics | graphics API is reachable |
| Shaders | shader API is reachable |
| Icons | the individual icon/resource is reachable |
| Fonts | font API is referenced |

The SDK must never create an `ALL_FEATURES` registry or eager singleton that references every feature.

## Important boundary

Kotlin/Android libraries are not dynamically packaged one source line at a time. The guarantee is
implemented in two layers:

1. **Architecture:** no eager initialization and no global references to optional features.
2. **Build:** R8 + resource shrinking removes unreachable bytecode/resources in the final application.

This is the correct Android model for a tree-shakeable design SDK.
