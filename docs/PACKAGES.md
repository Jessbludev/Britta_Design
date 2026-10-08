# GitHub Package Registry

## Web / npm

Configura autenticación con un token GitHub que tenga `write:packages`:

```bash
npm config set @jessbludev:registry https://npm.pkg.github.com
npm login --scope=@jessbludev --registry=https://npm.pkg.github.com
npm install @jessbludev/britta-design-web
```

La publicación oficial se activa creando un tag `v0.3.0` o superior. El workflow prepara los assets, valida el SDK y publica el tarball npm.

## Android / Maven

En `settings.gradle.kts` del consumidor:

```kotlin
dependencyResolutionManagement {
    repositories {
        maven {
            url = uri("https://maven.pkg.github.com/Jessbludev/Britta_Design")
            credentials {
                username = providers.gradleProperty("gpr.user").orNull ?: System.getenv("GITHUB_ACTOR")
                password = providers.gradleProperty("gpr.key").orNull ?: System.getenv("GITHUB_TOKEN")
            }
        }
        google()
        mavenCentral()
    }
}
```

Luego:

```kotlin
dependencies {
    implementation("com.jessbludev.britta:britta-compose:0.3.0")
}
```

La publicación Maven también ocurre solo desde tags `v*`. Nunca guardes tokens en Gradle, commits o archivos del proyecto.
