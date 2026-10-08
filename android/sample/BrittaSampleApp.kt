package com.britta.sample

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
