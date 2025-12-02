# Análisis por Sistema

## ¿Qué es el análisis por sistema?

El análisis por sistema es un método automático que determina la complejidad de un algoritmo utilizando reglas y algoritmos predefinidos. Es rápido, objetivo y se basa en el análisis matemático de la estructura del código.

## ¿Qué mide?

El análisis por sistema calcula tres tipos de complejidad:

### Complejidad Big O (O)
Representa el peor caso posible del algoritmo. Indica cuánto tiempo o espacio necesitará el algoritmo en el escenario menos favorable.

**Ejemplo**: Si un algoritmo tiene O(n²), significa que en el peor caso, el tiempo de ejecución crece proporcionalmente al cuadrado del tamaño de la entrada.

### Complejidad Omega (Ω)
Representa el mejor caso posible del algoritmo. Indica el mínimo tiempo o espacio que necesitará el algoritmo incluso en el mejor escenario.

**Ejemplo**: Si un algoritmo tiene Ω(n), significa que incluso en el mejor caso, necesita al menos tiempo proporcional al tamaño de la entrada.

### Complejidad Theta (Θ)
Representa el caso promedio del algoritmo. Indica el comportamiento típico del algoritmo cuando se ejecuta con entradas normales.

**Ejemplo**: Si un algoritmo tiene Θ(n log n), significa que en promedio, el tiempo de ejecución crece proporcionalmente a n multiplicado por el logaritmo de n.

## ¿Qué información proporciona?

Además de las notaciones de complejidad, el análisis por sistema proporciona:

### Detalles de Complejidad
- **Bucles detectados**: Identifica todos los bucles en el código y su impacto
- **Recursión**: Detecta si el algoritmo usa recursión y cómo afecta la complejidad
- **Combinación**: Explica cómo se combinan diferentes estructuras (bucles anidados, recursión, etc.)
- **Salidas tempranas**: Detecta si hay condiciones que permiten terminar antes (early exit)

## Características del Análisis por Sistema

### Ventajas
- **Rapidez**: Se ejecuta casi instantáneamente
- **Objetividad**: No depende de interpretaciones, solo de reglas matemáticas
- **Consistencia**: Siempre da los mismos resultados para el mismo código
- **Precisión**: Basado en análisis matemático riguroso

### Limitaciones
- Puede no capturar optimizaciones específicas del contexto
- No proporciona explicaciones detalladas paso a paso
- Puede ser menos flexible con código muy complejo o inusual

## ¿Cuándo usar este análisis?

El análisis por sistema es ideal cuando:
- Se necesita una respuesta rápida
- Se quiere una evaluación objetiva y matemática
- Se necesita comparar con otro método de análisis
- Se requiere una base sólida para entender la complejidad básica

## Visualización de Resultados

Los resultados del análisis por sistema se muestran de forma clara y organizada, destacando:
- Las notaciones de complejidad (O, Ω, Θ)
- Los detalles de cómo se calculó cada complejidad
- Las estructuras detectadas en el código

