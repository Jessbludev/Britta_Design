package com.britta.design

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
