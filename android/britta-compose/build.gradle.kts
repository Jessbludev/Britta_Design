plugins {
    id("com.android.library")
    id("org.jetbrains.kotlin.android")
    id("org.jetbrains.kotlin.plugin.compose")
}

android {
    namespace = "com.britta.design"
    compileSdk = 35

    defaultConfig {
        minSdk = 26
        consumerProguardFiles("consumer-rules.pro")
    }

    buildFeatures { compose = true }
}

dependencies {
    // Keep the SDK runtime minimal. Consumers decide whether Material 3 is needed.
    api("androidx.compose.ui:ui:1.7.6")
    api("androidx.compose.material3:material3:1.3.1")
}
