package com.britta.design

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
