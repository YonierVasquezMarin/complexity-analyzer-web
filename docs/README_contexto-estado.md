# Gestión de Estado y Contexto

## ¿Qué es la gestión de estado?

La gestión de estado es el sistema que mantiene y coordina toda la información de la aplicación, como qué archivos existen, cuál está seleccionado, qué código se está editando, y los resultados de los análisis.

## ¿Por qué es importante?

Sin un sistema de gestión de estado, cada parte de la aplicación trabajaría de forma aislada. El sistema de estado permite que:
- Todas las partes de la aplicación sepan qué archivo está seleccionado
- Los cambios en un lugar se reflejen en otros lugares
- Los datos se mantengan consistentes en toda la aplicación
- La información persista entre diferentes páginas

## Componentes del Estado

### Lista de Archivos
Mantiene un registro de todos los archivos de pseudocódigo que el usuario ha creado. Esta lista se actualiza cuando:
- Se crea un nuevo archivo
- Se elimina un archivo
- Se modifica un archivo

### Archivo Seleccionado
Almacena información sobre qué archivo está actualmente seleccionado y activo. Esto permite que:
- El editor muestre el código correcto
- Las páginas de análisis muestren los resultados correctos
- Los controles actúen sobre el archivo correcto

### Código Editado
Mantiene el contenido del código que el usuario está editando en tiempo real. Esto permite:
- Guardar automáticamente los cambios
- Mostrar el código actualizado en el editor
- Sincronizar el código entre diferentes vistas

### Estado de Análisis
Mantiene información sobre si se está ejecutando un análisis en este momento, lo que permite:
- Mostrar indicadores de carga
- Prevenir acciones duplicadas
- Gestionar el flujo de trabajo durante el análisis

## Persistencia del Estado

### Guardado Automático
El estado se guarda automáticamente en el almacenamiento del navegador:
- Los archivos se guardan cuando se crean o modifican
- El archivo seleccionado se recuerda entre sesiones
- Los análisis se guardan junto a sus archivos

### Restauración al Iniciar
Cuando la aplicación se abre:
- Se cargan todos los archivos guardados
- Se restaura el archivo que estaba seleccionado
- Se recupera el código que se estaba editando

## Flujo de Datos

### De Usuario a Estado
1. El usuario realiza una acción (crear archivo, editar código, etc.)
2. La acción se registra en el estado
3. El estado se actualiza
4. La interfaz se actualiza para reflejar el cambio

### De Estado a Interfaz
1. El estado cambia
2. Todas las partes de la interfaz que dependen de ese estado se actualizan automáticamente
3. El usuario ve los cambios reflejados inmediatamente

## Contexto de Pseudocódigo

El sistema utiliza un "Contexto" especial llamado `PseudocodeAnalysisContext` que:
- Centraliza toda la información relacionada con archivos y análisis
- Proporciona funciones para gestionar archivos (crear, actualizar, eliminar)
- Mantiene sincronizada la información en toda la aplicación
- Facilita el acceso a los datos desde cualquier componente

## Funciones Disponibles

El contexto proporciona funciones que permiten:

### Gestión de Archivos
- **Cargar archivos**: Obtener todos los archivos guardados
- **Agregar archivo**: Crear un nuevo archivo
- **Actualizar archivo**: Modificar un archivo existente
- **Eliminar archivo**: Borrar un archivo
- **Obtener por ID**: Buscar un archivo específico

### Gestión de Selección
- **Seleccionar archivo**: Establecer qué archivo está activo
- **Obtener seleccionado**: Saber qué archivo está seleccionado

### Gestión de Edición
- **Establecer código editado**: Actualizar el código que se está editando
- **Guardar código editado**: Persistir los cambios en el archivo

## Ventajas de este Sistema

- **Consistencia**: Todos los componentes ven la misma información
- **Sincronización**: Los cambios se propagan automáticamente
- **Persistencia**: Los datos no se pierden al cerrar la aplicación
- **Simplicidad**: Un solo lugar gestiona toda la información
- **Eficiencia**: Evita duplicación de datos y actualizaciones innecesarias

