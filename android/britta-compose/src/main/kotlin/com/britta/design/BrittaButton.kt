package com.britta.design

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
