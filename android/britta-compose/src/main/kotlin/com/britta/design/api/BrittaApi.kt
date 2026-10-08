package com.britta.design.api

import androidx.compose.runtime.Immutable
import androidx.compose.runtime.Stable

/** Immutable configuration for the Britta Compose runtime. */
@Immutable
data class BrittaConfig(
    val darkTheme: Boolean? = null,
)

/** Marker for public contracts that are stable across recompositions. */
@Stable
public interface BrittaComponentApi
