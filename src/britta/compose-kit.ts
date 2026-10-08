import { GRAPHICS_KT } from "./compose-graphics.ts";

export const SETTINGS_GRADLE = `pluginManagement {
    repositories { google(); mavenCentral(); gradlePluginPortal() }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories { google(); mavenCentral() }
}
rootProject.name = "BrittaDesign"
include(":britta-compose")
`;

export const ROOT_GRADLE = `plugins {
    id("com.android.library") version "8.7.3" apply false
    id("org.jetbrains.kotlin.android") version "2.0.21" apply false
    id("org.jetbrains.kotlin.plugin.compose") version "2.0.21" apply false
}
`;

export const MODULE_GRADLE = `plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.britta.design"
    compileSdk = 35
    defaultConfig { minSdk = 26 }
    buildFeatures { compose = true }
}

dependencies {
    implementation("androidx.compose.ui:ui:1.7.6")
    implementation("androidx.compose.material3:material3:1.3.1")
    implementation("androidx.compose.material:material-icons-extended:1.7.6")
    implementation("androidx.compose.ui:ui-text-google-fonts:1.7.6")
}
`;

export const THEME_KT = `package com.britta.design

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Typography
import androidx.compose.material3.darkColorScheme
import androidx.compose.material3.lightColorScheme
import androidx.compose.runtime.Composable
import com.britta.design.generated.BrittaDarkColors
import com.britta.design.generated.BrittaGeneratedTypography
import com.britta.design.generated.BrittaLightColors

private val LightColors = lightColorScheme(
    primary = BrittaLightColors.primary,
    onPrimary = BrittaLightColors.onPrimary,
    primaryContainer = BrittaLightColors.primaryContainer,
    onPrimaryContainer = BrittaLightColors.onPrimaryContainer,
    secondary = BrittaLightColors.secondary,
    onSecondary = BrittaLightColors.onSecondary,
    secondaryContainer = BrittaLightColors.secondaryContainer,
    onSecondaryContainer = BrittaLightColors.onSecondaryContainer,
    tertiary = BrittaLightColors.tertiary,
    onTertiary = BrittaLightColors.onTertiary,
    tertiaryContainer = BrittaLightColors.tertiaryContainer,
    onTertiaryContainer = BrittaLightColors.onTertiaryContainer,
    error = BrittaLightColors.error,
    onError = BrittaLightColors.onError,
    errorContainer = BrittaLightColors.errorContainer,
    onErrorContainer = BrittaLightColors.onErrorContainer,
    background = BrittaLightColors.background,
    onBackground = BrittaLightColors.onBackground,
    surface = BrittaLightColors.surface,
    onSurface = BrittaLightColors.onSurface,
    onSurfaceVariant = BrittaLightColors.onSurfaceVariant,
    outline = BrittaLightColors.outline,
    outlineVariant = BrittaLightColors.outlineVariant,
    inverseSurface = BrittaLightColors.inverseSurface,
    inverseOnSurface = BrittaLightColors.inverseOnSurface,
    inversePrimary = BrittaLightColors.inversePrimary
)

private val DarkColors = darkColorScheme(
    primary = BrittaDarkColors.primary,
    onPrimary = BrittaDarkColors.onPrimary,
    primaryContainer = BrittaDarkColors.primaryContainer,
    onPrimaryContainer = BrittaDarkColors.onPrimaryContainer,
    secondary = BrittaDarkColors.secondary,
    onSecondary = BrittaDarkColors.onSecondary,
    secondaryContainer = BrittaDarkColors.secondaryContainer,
    onSecondaryContainer = BrittaDarkColors.onSecondaryContainer,
    tertiary = BrittaDarkColors.tertiary,
    error = BrittaDarkColors.error,
    background = BrittaDarkColors.background,
    onBackground = BrittaDarkColors.onBackground,
    surface = BrittaDarkColors.surface,
    onSurface = BrittaDarkColors.onSurface,
    onSurfaceVariant = BrittaDarkColors.onSurfaceVariant,
    outline = BrittaDarkColors.outline,
    outlineVariant = BrittaDarkColors.outlineVariant
)

@Composable
fun BrittaTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    MaterialTheme(
        colorScheme = if (darkTheme) DarkColors else LightColors,
        typography = Typography(
            displayLarge = BrittaGeneratedTypography.displayLarge,
            headlineLarge = BrittaGeneratedTypography.headlineLarge,
            headlineMedium = BrittaGeneratedTypography.headlineMedium,
            titleLarge = BrittaGeneratedTypography.titleLarge,
            titleMedium = BrittaGeneratedTypography.titleMedium,
            bodyLarge = BrittaGeneratedTypography.bodyLarge,
            bodyMedium = BrittaGeneratedTypography.bodyMedium,
            labelLarge = BrittaGeneratedTypography.labelLarge,
            labelMedium = BrittaGeneratedTypography.labelMedium,
            labelSmall = BrittaGeneratedTypography.labelSmall
        ),
        content = content
    )
}
`;

export const BUTTON_KT = `package com.britta.design

import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.FilledTonalButton
import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedButton
import androidx.compose.material3.Text
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp

enum class BrittaButtonVariant { Filled, Tonal, Outlined, Text, Elevated }

@Composable
fun BrittaButton(
    text: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    variant: BrittaButtonVariant = BrittaButtonVariant.Filled,
    icon: ImageVector? = null
) {
    val content: @Composable () -> Unit = {
        if (icon != null) {
            Icon(icon, contentDescription = null, modifier = Modifier.size(18.dp))
            Spacer(Modifier.width(8.dp))
        }
        Text(text)
    }
    val padding = PaddingValues(horizontal = 24.dp, vertical = 10.dp)
    when (variant) {
        BrittaButtonVariant.Filled -> Button(
            onClick = onClick, enabled = enabled, modifier = modifier,
            contentPadding = padding
        ) { content() }
        BrittaButtonVariant.Tonal -> FilledTonalButton(
            onClick = onClick, enabled = enabled, modifier = modifier,
            contentPadding = padding
        ) { content() }
        BrittaButtonVariant.Outlined -> OutlinedButton(
            onClick = onClick, enabled = enabled, modifier = modifier,
            contentPadding = padding
        ) { content() }
        BrittaButtonVariant.Text -> TextButton(
            onClick = onClick, enabled = enabled, modifier = modifier
        ) { content() }
        BrittaButtonVariant.Elevated -> Button(
            onClick = onClick, enabled = enabled, modifier = modifier,
            elevation = ButtonDefaults.buttonElevation(defaultElevation = 1.dp),
            contentPadding = padding
        ) { content() }
    }
}
`;

export const FIELD_KT = `package com.britta.design

import androidx.compose.material3.Icon
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector

@Composable
fun BrittaTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: String,
    modifier: Modifier = Modifier,
    supporting: String? = null,
    leading: ImageVector? = null,
    isError: Boolean = false
) {
    OutlinedTextField(
        value = value,
        onValueChange = onValueChange,
        modifier = modifier,
        label = { Text(label) },
        supportingText = supporting?.let { { Text(it) } },
        leadingIcon = leading?.let { { Icon(it, contentDescription = null) } },
        isError = isError,
        singleLine = true
    )
}
`;

export const CHIP_KT = `package com.britta.design

import androidx.compose.material3.FilterChip
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector

@Composable
fun BrittaChip(
    label: String,
    selected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
    icon: ImageVector? = null
) {
    FilterChip(
        selected = selected,
        onClick = onClick,
        label = { Text(label) },
        modifier = modifier,
        leadingIcon = icon?.let { { Icon(it, contentDescription = null) } }
    )
}
`;

export const FAB_KT = `package com.britta.design

import androidx.compose.material3.ExtendedFloatingActionButton
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.SmallFloatingActionButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector

@Composable
fun BrittaFab(
    onClick: () -> Unit,
    icon: ImageVector,
    modifier: Modifier = Modifier,
    contentDescription: String? = null,
    extended: Boolean = false,
    label: String? = null,
    small: Boolean = false
) {
    when {
        extended && label != null -> ExtendedFloatingActionButton(
            onClick = onClick,
            modifier = modifier,
            icon = { Icon(icon, contentDescription) },
            text = { Text(label) }
        )
        small -> SmallFloatingActionButton(onClick = onClick, modifier = modifier) {
            Icon(icon, contentDescription)
        }
        else -> FloatingActionButton(onClick = onClick, modifier = modifier) {
            Icon(icon, contentDescription)
        }
    }
}
`;

export const CARD_KT = `package com.britta.design

import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.OutlinedCard
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier

enum class BrittaCardVariant { Elevated, Filled, Outlined }

@Composable
fun BrittaCard(
    modifier: Modifier = Modifier,
    variant: BrittaCardVariant = BrittaCardVariant.Elevated,
    content: @Composable () -> Unit
) {
    when (variant) {
        BrittaCardVariant.Elevated -> Card(
            modifier = modifier,
            colors = CardDefaults.elevatedCardColors(),
            elevation = CardDefaults.elevatedCardElevation()
        ) { content() }
        BrittaCardVariant.Filled -> Card(
            modifier = modifier,
            colors = CardDefaults.cardColors()
        ) { content() }
        BrittaCardVariant.Outlined -> OutlinedCard(modifier = modifier) { content() }
    }
}
`;

export const NAV_KT = `package com.britta.design

import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector

data class BrittaDest(
    val id: String,
    val label: String,
    val icon: ImageVector
)

@Composable
fun BrittaNavBar(
    destinations: List<BrittaDest>,
    selectedId: String,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier
) {
    NavigationBar(modifier = modifier) {
        destinations.forEach { dest ->
            NavigationBarItem(
                selected = dest.id == selectedId,
                onClick = { onSelect(dest.id) },
                icon = { Icon(dest.icon, contentDescription = dest.label) },
                label = { Text(dest.label) }
            )
        }
    }
}

@Composable
fun BrittaNavRail(
    destinations: List<BrittaDest>,
    selectedId: String,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier,
    header: @Composable (() -> Unit)? = null
) {
    NavigationRail(modifier = modifier, header = header) {
        destinations.forEach { dest ->
            NavigationRailItem(
                selected = dest.id == selectedId,
                onClick = { onSelect(dest.id) },
                icon = { Icon(dest.icon, contentDescription = dest.label) },
                label = { Text(dest.label) }
            )
        }
    }
}
`;

export const FONTS_KT = `package com.britta.design

import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.googlefonts.Font
import androidx.compose.ui.text.googlefonts.GoogleFont

/**
 * Optional Google Fonts wiring. Add Play Services font certificates
 * (R.array.com_google_android_gms_fonts_certs) to the consuming app.
 * Generated tokens fall back to FontFamily.SansSerif so the library compiles
 * without that resource.
 */
fun brittaGoogleProvider() = GoogleFont.Provider(
    providerAuthority = "com.google.android.gms.fonts",
    providerPackage = "com.google.android.gms",
    certificates = R.array.com_google_android_gms_fonts_certs
)

fun brittaFontFamily(name: String, provider: GoogleFont.Provider): FontFamily =
    FontFamily(
        Font(googleFont = GoogleFont(name), fontProvider = provider, weight = FontWeight.Normal),
        Font(googleFont = GoogleFont(name), fontProvider = provider, weight = FontWeight.Medium),
        Font(googleFont = GoogleFont(name), fontProvider = provider, weight = FontWeight.SemiBold)
    )
`;

export const SAMPLE_KT = `package com.britta.sample

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent { BrittaSampleApp() }
    }
}
`;

export const SAMPLE_APP_KT = `package com.britta.sample

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Add
import androidx.compose.material.icons.outlined.Home
import androidx.compose.material.icons.outlined.Palette
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material.icons.outlined.Widgets
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.britta.design.BrittaButton
import com.britta.design.BrittaButtonVariant
import com.britta.design.BrittaCard
import com.britta.design.BrittaDest
import com.britta.design.BrittaFab
import com.britta.design.BrittaNavBar
import com.britta.design.BrittaTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BrittaSampleApp() {
    var tab by remember { mutableStateOf("today") }
    BrittaTheme {
        Scaffold(
            topBar = {
                TopAppBar(title = { Text(tab.replaceFirstChar { it.uppercase() }) })
            },
            floatingActionButton = {
                if (tab == "today") {
                    BrittaFab(
                        onClick = { },
                        icon = Icons.Outlined.Add,
                        contentDescription = "Add"
                    )
                }
            },
            bottomBar = {
                BrittaNavBar(
                    destinations = listOf(
                        BrittaDest("today", "Today", Icons.Outlined.Home),
                        BrittaDest("kit", "Kit", Icons.Outlined.Widgets),
                        BrittaDest("tokens", "Tokens", Icons.Outlined.Palette),
                        BrittaDest("you", "You", Icons.Outlined.Person)
                    ),
                    selectedId = tab,
                    onSelect = { tab = it }
                )
            }
        ) { padding ->
            Column(
                Modifier
                    .fillMaxSize()
                    .padding(padding)
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp)
            ) {
                when (tab) {
                    "today" -> BrittaCard { Text("Compile tokens") }
                    "kit" -> {
                        BrittaButton(text = "Filled", onClick = { })
                        BrittaButton(
                            text = "Tonal",
                            variant = BrittaButtonVariant.Tonal,
                            onClick = { }
                        )
                    }
                    else -> Text("Shared Material 3 tokens.")
                }
            }
        }
    }
}
`;

export const SHEET_KT = `package com.britta.design

import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.Text
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun BrittaSheet(
    visible: Boolean,
    onDismiss: () -> Unit,
    title: String,
    content: @Composable ColumnScope.() -> Unit
) {
    if (!visible) return
    val state = rememberModalBottomSheetState()
    ModalBottomSheet(onDismissRequest = onDismiss, sheetState = state) {
        Column(Modifier.padding(horizontal = 24.dp, vertical = 8.dp)) {
            Text(title)
            content()
        }
    }
}
`;

export const MANIFEST_XML = `<manifest xmlns:android="http://schemas.android.com/apk/res/android" />
`;
export const KIT_README = `# Britta Design

Cross-platform Material 3 design system. One seed compiles to CSS variables,
Tailwind utilities, TypeScript components, and Jetpack Compose.

## Web

\`\`\`html
<link rel="stylesheet" href="./web/britta.css" />
<button class="britta-button">Save</button>
\`\`\`

Or map \`web/tokens.css\` into Tailwind v4 \`@theme\`.

## Android / Jetpack Compose

1. Copy \`android/britta-compose\` into your Gradle project.
2. \`include(":britta-compose")\` in settings.gradle.kts
3. Wrap UI in \`BrittaTheme { }\`.

Generated colors, type, and spacing live in
\`BrittaGeneratedTokens.kt\`. Re-seed from the Britta studio Tokens page
and replace that file.

## Parity

| Web | Compose |
| --- | --- |
| BrittaButton | BrittaButton |
| BrittaTextField | BrittaTextField |
| BrittaChip | BrittaChip |
| BrittaFab | BrittaFab |
| BrittaCard | BrittaCard |
| BrittaNavBar | BrittaNavBar |
| BrittaSheet | BrittaSheet (ModalBottomSheet) |
| MdIcon | Icons.Outlined.* |
| BrittaShaderSurface | RuntimeShader (API 33) + AGSL |
| BrittaSparkline | Canvas sparkline |
| BrittaIcons | Ligature registry |

Shaders live in \`android/shaders/*.agsl\` and \`web/shaders/*.frag\`.
The same uniforms (time, primary, surface, intensity) bind on both platforms.
`;

export const KIT_FILES: { path: string; contents: string }[] = [
  { path: "settings.gradle.kts", contents: SETTINGS_GRADLE },
  { path: "build.gradle.kts", contents: ROOT_GRADLE },
  { path: "britta-compose/build.gradle.kts", contents: MODULE_GRADLE },
  { path: "britta-compose/src/main/AndroidManifest.xml", contents: MANIFEST_XML },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaTheme.kt", contents: THEME_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaButton.kt", contents: BUTTON_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaTextField.kt", contents: FIELD_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaChip.kt", contents: CHIP_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaFab.kt", contents: FAB_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaCard.kt", contents: CARD_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaNavigation.kt", contents: NAV_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaSheet.kt", contents: SHEET_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaFonts.kt", contents: FONTS_KT },
  { path: "britta-compose/src/main/kotlin/com/britta/design/BrittaGraphics.kt", contents: GRAPHICS_KT },
  { path: "sample/MainActivity.kt", contents: SAMPLE_KT },
  { path: "sample/BrittaSampleApp.kt", contents: SAMPLE_APP_KT },
];
