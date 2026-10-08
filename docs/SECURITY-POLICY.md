# Security & Quality Policy

Britta Design aplica una política minimalista y estricta. Cada cambio debe pasar validación de assets, TypeScript, pruebas SDK, lint y build Web. Los cambios Android pasan compilación Gradle en CI.

La superficie de publicación se limita a dos paquetes: npm `@jessbludev/britta-design-web` y Maven `com.jessbludev.britta:britta-compose`. Sus workflows usan permisos mínimos, no exponen secretos y solo publican desde tags `v*`.

No se incorpora observabilidad activa: no hay logs de aplicación, telemetría, analytics, identificadores de uso ni llamadas externas desde los paquetes. Los mensajes propios de las herramientas CI no forman parte del SDK publicado.
