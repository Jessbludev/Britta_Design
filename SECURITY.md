# Security Policy

## Alcance

Esta política cubre los paquetes Web/npm y Android/Maven publicados desde este repositorio.

## Reporte privado

Reporta vulnerabilidades mediante **GitHub Security Advisories** en este repositorio. No publiques detalles explotables en issues ni incluyas secretos en el reporte.

## Reglas de seguridad

- Permisos GitHub Actions mínimos y explícitos.
- Publicación únicamente por tags protegidos y `GITHUB_TOKEN` de corta duración.
- Dependencias auditadas en cada PR mediante Dependency Review y CodeQL.
- Sin secretos persistidos en el repositorio, artefactos o logs de CI.
- **Cero logs de aplicación y cero telemetría de uso, rendimiento o comportamiento.**
- Los paquetes no hacen llamadas de red, tracking ni recolección de datos.

## Versiones soportadas

Se corrigen problemas de seguridad en la rama `main` y en la última versión publicada.
