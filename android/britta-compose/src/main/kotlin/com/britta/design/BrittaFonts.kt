package com.britta.design

import androidx.compose.runtime.Immutable
import androidx.compose.ui.text.font.FontFamily

/** Immutable font contract. Font loading remains the application's responsibility. */
@Immutable
data class BrittaFontConfig(val family: FontFamily = FontFamily.SansSerif)
