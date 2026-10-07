package moe.rukamori.archivetune

import android.app.Application
import android.content.Context

internal object LeakCanaryVariant {
    @JvmStatic
    fun initialize(@Suppress("UNUSED_PARAMETER") application: Application) = Unit

    @JvmStatic
    fun setEnabled(
        @Suppress("UNUSED_PARAMETER") context: Context,
        @Suppress("UNUSED_PARAMETER") enabled: Boolean,
    ) = Unit
}
