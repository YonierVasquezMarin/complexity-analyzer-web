# Servicios y API

## ¿Qué son los servicios y la API?

Los servicios son las funciones que permiten a la plataforma comunicarse con un servidor backend para realizar operaciones que requieren procesamiento externo, como completar código, convertir pseudocódigo y analizar complejidad.

## Servicios Disponibles

### Servicio de Completado de Código
Permite completar automáticamente código incompleto.

**¿Qué hace?**
- Recibe código con instrucciones de completado
- Envía el código al servidor
- Recibe el código completado
- Actualiza el archivo con la versión completada

**Cuándo se usa**: Cuando el código tiene secciones marcadas para completar.

### Servicio de Conversión de Pseudocódigo
Convierte el pseudocódigo a un formato estándar.

**¿Qué hace?**
- Toma el pseudocódigo original
- Lo normaliza y estandariza
- Devuelve la versión convertida
- Guarda ambas versiones (original y convertida)

**Cuándo se usa**: Antes de realizar análisis, para asegurar que el código esté en formato válido.

### Servicio de Análisis por Sistema
Realiza análisis automático de complejidad.

**¿Qué hace?**
- Envía el pseudocódigo convertido al servidor
- El servidor analiza la estructura del código
- Calcula Big O, Omega y Theta
- Identifica bucles, recursión y otras estructuras
- Devuelve los resultados del análisis

**Cuándo se usa**: Cuando se necesita un análisis rápido y objetivo de complejidad.

### Servicio de Análisis por LLM
Realiza análisis detallado usando inteligencia artificial.

**¿Qué hace?**
- Envía el pseudocódigo convertido al servidor
- El servidor usa un modelo de IA para analizar
- Genera explicaciones paso a paso
- Crea diagramas y representaciones visuales
- Proporciona clasificación de patrones y análisis de costos
- Devuelve un análisis completo y educativo

**Cuándo se usa**: Cuando se necesita un análisis detallado con explicaciones y visualizaciones.

## Comunicación con el Servidor

### Base de la Comunicación
Todos los servicios se comunican con un servidor backend a través de peticiones HTTP (protocolo web estándar).

### Configuración
La dirección del servidor se configura mediante una variable de entorno, permitiendo:
- Desarrollo local (servidor en la misma máquina)
- Servidor de pruebas
- Servidor de producción

### Manejo de Errores
Los servicios están diseñados para manejar errores de manera elegante:
- Si el servidor no está disponible, se muestra un mensaje claro
- Si hay un error en el procesamiento, se informa al usuario
- Los errores se presentan de forma comprensible

## Modelos de Datos

### Modelos de Solicitud
Cada servicio tiene un modelo específico para las solicitudes:
- **CompleteCodeRequestModel**: Para solicitudes de completado
- **AnalyzeBySystemRequestModel**: Para solicitudes de análisis automático
- **AnalyzeByLLMRequestModel**: Para solicitudes de análisis por IA

### Modelos de Respuesta
Cada servicio tiene modelos específicos para las respuestas:
- **CompleteCodeResponseModel**: Respuesta con código completado
- **AnalyzeBySystemResponseModel**: Respuesta con análisis automático
- **AnalyzeByLLMResponseModel**: Respuesta con análisis detallado por IA

## Flujo de Datos

1. **Usuario realiza acción**: Por ejemplo, solicita un análisis
2. **Servicio prepara solicitud**: Formatea los datos según el modelo requerido
3. **Envío al servidor**: Se envía la petición HTTP al servidor
4. **Procesamiento**: El servidor procesa la solicitud
5. **Respuesta**: El servidor devuelve los resultados
6. **Actualización de la interfaz**: Los resultados se muestran al usuario
7. **Persistencia**: Los resultados se guardan junto al archivo

## Ventajas de esta Arquitectura

- **Separación de responsabilidades**: La interfaz y el procesamiento están separados
- **Escalabilidad**: El servidor puede manejar múltiples usuarios simultáneamente
- **Mantenibilidad**: Los servicios se pueden actualizar independientemente
- **Flexibilidad**: Se pueden agregar nuevos servicios sin afectar los existentes

