# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Estructura del Proyecto

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

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
