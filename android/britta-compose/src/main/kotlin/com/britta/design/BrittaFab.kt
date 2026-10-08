package com.britta.design

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
