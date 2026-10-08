package com.britta.design

import androidx.compose.runtime.Composable
import androidx.compose.runtime.Immutable
import com.britta.design.api.BrittaConfig

/**
 * Britta's single Compose entry point. No global initialization, reflection, service
 * discovery, or eager component registration is performed. The runtime exists only
 * while this composable is in the composition.
 */
@Composable
fun Britta(
    config: BrittaConfig = BrittaConfig(),
    content: @Composable () -> Unit,
) {
    BrittaTheme(darkTheme = config.darkTheme ?: androidx.compose.foundation.isSystemInDarkTheme(), content = content)
}

