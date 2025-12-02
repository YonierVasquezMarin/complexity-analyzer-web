# Arquitectura de la Plataforma

## ¿Qué es esta plataforma?

Esta es una aplicación web diseñada para analizar la complejidad de algoritmos escritos en pseudocódigo. La plataforma permite a los usuarios cargar, editar y analizar código para entender qué tan eficiente es un algoritmo.

## Estructura General

La plataforma está organizada en diferentes secciones que trabajan juntas:

### Página Principal
Es el punto de entrada donde los usuarios pueden:
- Ver todos sus archivos de código
- Editar código en un editor
- Gestionar sus archivos (crear, eliminar, seleccionar)

### Páginas de Visualización
Diferentes vistas para mostrar:
- El pseudocódigo original
- El pseudocódigo convertido (después de ser procesado)
- Los resultados del análisis automático
- Los resultados del análisis por inteligencia artificial
- La comparación entre ambos análisis

### Sistema de Persistencia
Todos los archivos y análisis se guardan automáticamente en el navegador, por lo que no se pierden al cerrar la aplicación.

## Flujo de Trabajo

1. **Crear o cargar código**: El usuario crea un nuevo archivo o carga código existente
2. **Editar código**: Puede modificar el pseudocódigo en el editor
3. **Completar código**: Si el código está incompleto, puede usar la función de completado automático
4. **Convertir código**: El sistema convierte el pseudocódigo a un formato estándar para análisis
5. **Analizar**: Se pueden realizar dos tipos de análisis:
   - Análisis automático por el sistema
   - Análisis detallado por inteligencia artificial
6. **Comparar**: Ver las diferencias y similitudes entre ambos análisis
7. **Visualizar**: Ver los resultados con diagramas y explicaciones detalladas

## Tecnologías Utilizadas

La plataforma está construida con tecnologías modernas de desarrollo web que permiten una experiencia fluida y rápida para el usuario.

