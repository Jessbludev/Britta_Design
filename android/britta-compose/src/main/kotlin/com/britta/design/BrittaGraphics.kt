package com.britta.design

import android.graphics.RenderEffect
import android.graphics.RuntimeShader
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.asComposeRenderEffect
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class BrittaSeries(val label: String, val value: Float, val color: Color? = null)

enum class BrittaAvatarSize { Small, Medium, Large }

@Composable
fun BrittaAvatar(
    name: String,
    modifier: Modifier = Modifier,
    size: BrittaAvatarSize = BrittaAvatarSize.Medium
) {
    val dim = when (size) {
        BrittaAvatarSize.Small -> 32.dp
        BrittaAvatarSize.Medium -> 44.dp
        BrittaAvatarSize.Large -> 56.dp
    }
    val initials = name.split(" ").take(2).mapNotNull { it.firstOrNull()?.uppercase() }.joinToString("")
    Box(
        modifier
            .size(dim)
            .clip(CircleShape)
            .background(MaterialTheme.colorScheme.primaryContainer),
        contentAlignment = Alignment.Center
    ) {
        Text(initials, color = MaterialTheme.colorScheme.onPrimaryContainer)
    }
}

@Composable
fun BrittaSparkline(
    values: List<Float>,
    modifier: Modifier = Modifier,
    color: Color = MaterialTheme.colorScheme.primary
) {
    Canvas(modifier.fillMaxWidth().height(64.dp)) {
        if (values.isEmpty()) return@Canvas
        val min = values.minOrNull() ?: 0f
        val max = values.maxOrNull() ?: 1f
        val span = (max - min).coerceAtLeast(1f)
        val path = Path()
        values.forEachIndexed { i, v ->
            val x = size.width * i / (values.lastIndex.coerceAtLeast(1))
            val y = size.height - ((v - min) / span) * size.height
            if (i == 0) path.moveTo(x, y) else path.lineTo(x, y)
        }
        drawPath(path, color, style = Stroke(width = 3.dp.toPx(), cap = StrokeCap.Round))
    }
}

@Composable
fun BrittaBarChart(
    data: List<BrittaSeries>,
    modifier: Modifier = Modifier
) {
    val scheme = MaterialTheme.colorScheme
    val palette = listOf(scheme.primary, scheme.secondary, scheme.tertiary, scheme.primaryContainer)
    val max = data.maxOfOrNull { it.value }?.coerceAtLeast(1f) ?: 1f
    Canvas(modifier.fillMaxWidth().height(140.dp)) {
        val gap = 12.dp.toPx()
        val barW = ((size.width - gap * (data.size + 1)) / data.size).coerceAtLeast(8f)
        data.forEachIndexed { i, s ->
            val h = (s.value / max) * size.height
            val x = gap + i * (barW + gap)
            drawRoundRect(
                color = s.color ?: palette[i % palette.size],
                topLeft = Offset(x, size.height - h),
                size = androidx.compose.ui.geometry.Size(barW, h)
            )
        }
    }
}

@Composable
fun BrittaDonut(
    value: Float,
    modifier: Modifier = Modifier,
    size: Dp = 120.dp,
    label: String = ""
) {
    val scheme = MaterialTheme.colorScheme
    val pct = value.coerceIn(0f, 100f)
    Box(modifier.size(size), contentAlignment = Alignment.Center) {
        Canvas(Modifier.matchParentSize()) {
            val stroke = 12.dp.toPx()
            drawCircle(scheme.surfaceContainerHighest, style = Stroke(stroke))
            drawArc(
                color = scheme.primary,
                startAngle = -90f,
                sweepAngle = 360f * pct / 100f,
                useCenter = false,
                style = Stroke(stroke, cap = StrokeCap.Round)
            )
        }
        Text("${pct.toInt()}%", style = MaterialTheme.typography.titleMedium)
    }
}

@RequiresApi(Build.VERSION_CODES.TIRAMISU)
@Composable
fun BrittaShaderSurface(
    id: String,
    modifier: Modifier = Modifier,
    time: Float = 0f,
    intensity: Float = 1f,
    content: @Composable BoxScope.() -> Unit = {}
) {
    val scheme = MaterialTheme.colorScheme
    val shader = remember(id) { BrittaShaders.runtime(id) }
    Box(
        modifier.graphicsLayer {
            shader.setFloatUniform("time", time)
            shader.setFloatUniform("intensity", intensity)
            shader.setColorUniform("primary", scheme.primary)
            shader.setColorUniform("secondary", scheme.secondary)
            shader.setColorUniform("tertiary", scheme.tertiary)
            shader.setColorUniform("surface", scheme.surface)
            shader.setColorUniform("onSurface", scheme.onSurface)
            shader.setColorUniform("container", scheme.primaryContainer)
            renderEffect = RenderEffect
                .createRuntimeShaderEffect(shader, "el")
                .asComposeRenderEffect()
        }
    ) { content() }
}
