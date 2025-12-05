# Complexity Analyzer Web

**Complexity Analyzer Web** es una aplicación web diseñada para analizar la complejidad algorítmica de código escrito en pseudocódigo. La plataforma permite a estudiantes, desarrolladores y educadores entender y evaluar la eficiencia de algoritmos mediante análisis automáticos y asistidos por inteligencia artificial.

## 🎯 ¿Qué hace este proyecto?

Esta aplicación proporciona una herramienta completa para:

- **Gestionar archivos de código**: Crear, editar, eliminar y organizar múltiples archivos de pseudocódigo
- **Editar código**: Editor de código integrado con funcionalidades de edición avanzadas
- **Completar código automáticamente**: Utilizar inteligencia artificial para completar código incompleto
- **Convertir pseudocódigo**: Transformar el pseudocódigo a un formato estándar para análisis
- **Analizar complejidad algorítmica**: Realizar análisis de complejidad mediante dos métodos:
  - **Análisis automático por sistema**: Método rápido y objetivo basado en reglas matemáticas predefinidas
  - **Análisis por LLM (IA)**: Método detallado y educativo que proporciona explicaciones paso a paso, diagramas y contexto adicional
- **Comparar análisis**: Visualizar y comparar los resultados de ambos métodos de análisis
- **Visualizar resultados**: Ver los análisis con diagramas interactivos, árboles de recursión y representaciones visuales

## ✨ Características principales

### Análisis de Complejidad
- **Notaciones Big O, Omega y Theta**: Calcula y explica la complejidad en el peor caso, mejor caso y caso promedio
- **Análisis paso a paso**: Explicaciones detalladas de cómo se calcula la complejidad
- **Detección de patrones**: Identifica patrones algorítmicos (divide y vencerás, programación dinámica, etc.)
- **Representación matemática**: Proporciona ecuaciones de recurrencia y fórmulas formales

### Visualización
- **Diagramas de ejecución**: Árboles de recursión y diagramas de flujo generados automáticamente
- **Análisis de costos**: Desglose del costo de ejecución por instrucción y para diferentes tamaños de entrada
- **Comparación visual**: Interfaz para comparar resultados de diferentes métodos de análisis

### Gestión de Archivos
- **Persistencia local**: Todos los archivos y análisis se guardan automáticamente en el navegador
- **Múltiples archivos**: Gestiona múltiples archivos de código simultáneamente
- **Editor integrado**: Editor de código con resaltado de sintaxis y funcionalidades de edición

## 🛠️ Tecnologías utilizadas

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Enrutamiento
- **Tailwind CSS** - Estilos
- **React Flow** - Visualización de diagramas
- **Mermaid** - Generación de diagramas

## 📁 Estructura del Proyecto

```
complexity-analyzer-web/
├── docs/                                    # Documentación del proyecto
│   ├── README_analisis-llm.md
│   ├── README_analisis-sistema.md
│   ├── README_arquitectura.md
│   ├── README_comparacion.md
│   ├── README_completado-codigo.md
│   ├── README_contexto-estado.md
│   ├── README_conversion-pseudocodigo.md
│   ├── README_editor-codigo.md
│   ├── README_gestion-archivos.md
│   └── README_servicios-api.md
├── public/                                  # Archivos estáticos públicos
│   └── vite.svg
├── src/                                     # Código fuente principal
│   ├── assets/                              # Recursos estáticos (imágenes, iconos, etc.)
│   │   └── react.svg
│   ├── components/                          # Componentes reutilizables principales
│   │   ├── AreaToEditCodeComponent.tsx
│   │   ├── CodeEditorComponent.tsx
│   │   ├── FilesManagerComponent.tsx
│   │   └── SelectedItemNameComponent.tsx
│   ├── context/                             # Contextos de React para gestión de estado global
│   │   ├── ModalProvider.tsx
│   │   └── PseudocodeAnalysisContext.tsx
│   ├── models/                              # Modelos de datos y tipos TypeScript
│   │   ├── AnalyzeByLLMRequestModel.ts
│   │   ├── AnalyzeByLLMResponseModel.ts
│   │   ├── AnalyzeBySystemRequestModel.ts
│   │   ├── AnalyzeBySystemResponseModel.ts
│   │   ├── CompleteCodeRequestModel.ts
│   │   ├── CompleteCodeResponseModel.ts
│   │   ├── ModalDataModel.ts
│   │   └── PseudocodeAnalysisModel.ts
│   ├── pages/                               # Páginas/componentes de vista principales
│   │   ├── AnalysisPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── ShowComparisonPage.tsx
│   │   ├── ShowConvertedPseudocodePage.tsx
│   │   ├── ShowLLMAnalysisPage.tsx
│   │   ├── ShowPseudocodePage.tsx
│   │   └── ShowSystemAnalysisPage.tsx
│   ├── routes/                              # Configuración de rutas
│   │   └── AppRoutes.tsx
│   ├── services/                            # Servicios para comunicación con APIs y lógica de negocio
│   │   ├── AnalyzeByLLMService.ts
│   │   ├── AnalyzeBySystemService.ts
│   │   ├── CompleteCodeService.ts
│   │   ├── HttpService.ts
│   │   ├── LocalStorageService.ts
│   │   ├── ModalService.ts
│   │   └── PseudocodeAnalysisService.ts
│   ├── shared/                              # Componentes compartidos y utilitarios
│   │   ├── ButtonComponent.tsx
│   │   ├── EmptyStateComponent.tsx
│   │   └── ModalComponent.tsx
│   ├── specific-components/                 # Componentes específicos de funcionalidades
│   │   ├── AnalysisResultsComponent.tsx
│   │   ├── ControlsForCodeEditorSpecificComponent.tsx
│   │   ├── ControlsForFilesSpecificComponent.tsx
│   │   ├── FileItemComponent.tsx
│   │   ├── FilesListSpecificComponent.tsx
│   │   ├── NewFileNameFormComponent.tsx
│   │   └── NodeForAnalysisResultComponent.tsx
│   ├── App.css                              # Estilos globales de la aplicación
│   ├── App.tsx                              # Componente raíz de la aplicación
│   ├── index.css                            # Estilos base
│   └── main.tsx                             # Punto de entrada de la aplicación
├── .gitignore
├── eslint.config.js                         # Configuración de ESLint
├── index.html                               # HTML principal
├── package.json                             # Dependencias y scripts del proyecto
├── package-lock.json                        # Lock file de dependencias
├── README.md                                # Este archivo
├── tsconfig.json                            # Configuración base de TypeScript
├── tsconfig.app.json                        # Configuración de TypeScript para la app
├── tsconfig.node.json                       # Configuración de TypeScript para Node
└── vite.config.ts                           # Configuración de Vite
```

## 🚀 Instalación y Uso

### Requisitos previos

- Node.js (versión 18 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd complexity-analyzer-web
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

### Scripts disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run lint` - Ejecuta el linter para verificar el código

## 📖 Flujo de Trabajo

1. **Crear o cargar código**: Crea un nuevo archivo o carga código existente desde el gestor de archivos
2. **Editar código**: Modifica el pseudocódigo en el editor integrado
3. **Completar código** (opcional): Si el código está incompleto, utiliza la función de completado automático asistido por IA
4. **Convertir código**: El sistema convierte el pseudocódigo a un formato estándar para análisis
5. **Analizar**: Realiza análisis de complejidad mediante:
   - **Análisis automático**: Método rápido basado en reglas matemáticas
   - **Análisis por IA**: Método detallado con explicaciones educativas
6. **Comparar**: Visualiza y compara los resultados de ambos métodos de análisis
7. **Visualizar**: Explora los resultados con diagramas interactivos y explicaciones detalladas

## 📚 Documentación Adicional

Para más información sobre funcionalidades específicas, consulta la documentación en la carpeta `docs/`:

- `README_arquitectura.md` - Arquitectura general del sistema
- `README_analisis-sistema.md` - Detalles sobre el análisis automático
- `README_analisis-llm.md` - Detalles sobre el análisis por IA
- `README_editor-codigo.md` - Funcionalidades del editor
- `README_gestion-archivos.md` - Gestión de archivos
- Y más...

## 🔧 Configuración

El proyecto utiliza:
- **React Compiler**: Habilitado para optimizaciones automáticas
- **TypeScript**: Para tipado estático y mejor experiencia de desarrollo
- **ESLint**: Para mantener la calidad del código
- **Tailwind CSS**: Para estilos utilitarios

## 📝 Notas

- Todos los archivos y análisis se guardan automáticamente en el almacenamiento local del navegador
- El análisis por IA requiere conexión a internet y acceso al servicio correspondiente
- El análisis automático se ejecuta localmente y no requiere conexión a internet
