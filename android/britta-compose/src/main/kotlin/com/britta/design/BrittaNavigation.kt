package com.britta.design

import androidx.compose.material3.Icon
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.NavigationRail
import androidx.compose.material3.NavigationRailItem
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.foundation.layout.ColumnScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.vector.ImageVector

@Composable
fun BrittaNavBar(
    destinations: List<BrittaNavItem>,
    selectedId: String,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier,
) {
    require(destinations.isNotEmpty()) { "BrittaNavBar requires at least one destination." }
    require(destinations.map { it.id }.distinct().size == destinations.size) {
        "BrittaNavBar destination ids must be unique."
    }
    NavigationBar(modifier = modifier) {
        destinations.forEach { destination ->
            NavigationBarItem(
                selected = destination.id == selectedId,
                onClick = { onSelect(destination.id) },
                icon = { Icon(destination.icon, contentDescription = destination.label) },
                label = { Text(destination.label) },
            )
        }
    }
}

@Composable
fun BrittaNavRail(
    destinations: List<BrittaNavItem>,
    selectedId: String,
    onSelect: (String) -> Unit,
    modifier: Modifier = Modifier,
    header: @Composable (ColumnScope.() -> Unit)? = null,
) {
    require(destinations.isNotEmpty()) { "BrittaNavRail requires at least one destination." }
    NavigationRail(modifier = modifier, header = header) {
        destinations.forEach { destination ->
            NavigationRailItem(
                selected = destination.id == selectedId,
                onClick = { onSelect(destination.id) },
                icon = { Icon(destination.icon, contentDescription = destination.label) },
                label = { Text(destination.label) },
            )
        }
    }
}

@androidx.compose.runtime.Immutable
data class BrittaNavItem(
    val id: String,
    val label: String,
    val icon: ImageVector,
) {
    init {
        require(id.isNotBlank()) { "BrittaNavItem.id cannot be blank." }
        require(label.isNotBlank()) { "BrittaNavItem.label cannot be blank." }
    }
}

/** Backwards-compatible alias for the original Britta navigation contract. */
typealias BrittaDest = BrittaNavItem
