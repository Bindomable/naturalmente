# Naturalmente

Aplicación educativa estática en español para practicar el tema de números naturales de 1.º de ESO. Diseñada para pantallas táctiles, especialmente iPad. Sin cuentas, servidor de datos ni dependencias externas.

## Contenido

Seis bloques de explicación, una actividad participativa por bloque, comprobaciones de comprensión y ejercicios generados con números nuevos. Sesiones de 6 o 12 ejercicios, de un bloque o mezclados. Pistas, reintentos y soluciones explicadas.

El alcance se limita a los apuntes facilitados: naturales (incluido el 0), sistema decimal y valor posicional; propiedades conmutativa y asociativa; distributiva y factor común; jerarquía de operaciones; problemas de grupos iguales. Las potencias al cuadrado y las raíces exactas sencillas se conservan en una zona opcional, con accesos independientes a teoría y ejercicios. No aparecen en el bloque 5 ni en las sesiones normales de clase. No se publican las fotografías ni datos bancarios de los apuntes, ni información personal de la estudiante.

En el problema de referencia, contar 46 bolsas de 15 canicas y 5 frascos de 60 requiere multiplicar: `50 + 46 × 15 + 5 × 60 = 1040`. La aplicación explica la diferencia respecto al planteamiento manuscrito con divisiones.

## Para mi libreta

Tres formatos para copiar el resumen de distributiva y factor común: flechas de ida y vuelta, comparación en dos columnas y pasos numerados. Se puede elegir números o letras, cantidad de texto, color y título. Incluye sumas y restas. Permite copiar, descargar e imprimir el esquema. Las preferencias y las ideas de la estudiante se guardan localmente. El botón de petición prepara un texto para pegarlo en el chat de Codex; no existe un servicio de chat o IA en la aplicación.

## Progreso y compartir

La práctica de clase y la opcional tienen sesiones independientes y estadísticas separadas. Los registros antiguos de jerarquía no permitían distinguir potencias y raíces: se conservan como histórico aparte; si una sesión antigua contiene estos contenidos, se cierra conservando los ejercicios terminados.

El progreso y la sesión en curso se guardan en `localStorage` del navegador. Se contabiliza una vez cada ejercicio terminado. Se distinguen aciertos al primer intento sin ayuda, resueltos después de pedir ayuda o reintentar, y soluciones consultadas. Repasar una explicación durante un ejercicio cuenta como ayuda.

«Buen avance» indica al menos cinco aciertos sin ayuda entre los últimos ocho ejercicios del bloque; es una orientación, no una evaluación escolar. Las comprobaciones de las explicaciones marcan los bloques como explorados, pero no inflan las estadísticas de práctica.

El resumen puede compartirse con la Web Share API de Safari en HTTPS, copiarse, descargarse como texto o imprimirse. No se envía ningún mensaje automáticamente. No hay sincronización entre dispositivos. Borrar datos del navegador elimina el progreso. No hay modo sin conexión garantizado.

## Ejecutar localmente

Desde esta carpeta:

```sh
python3 -m http.server 8765
```

Abrir `http://localhost:8765`. También es posible abrir `index.html`, aunque compartir y guardar datos pueden depender de las restricciones del navegador; se recomienda el servidor o GitHub Pages.

## GitHub Pages

GitHub Pages publica directamente los archivos estáticos de la rama `main`. En **Settings → Pages → Build and deployment**, elegir **Deploy from a branch**, rama **main**, carpeta **/ (root)**. El archivo `.nojekyll` evita un procesamiento adicional. Cada cambio en `main` vuelve a publicar.

## Archivos

- `index.html`: estructura principal y navegación.
- `style.css`: diseño responsive, accesibilidad de foco y versión para imprimir.
- `content.js`: explicaciones y generador de ejercicios.
- `notebook.js`: esquemas y personalización para la libreta.
- `app.js`: interacción, corrección, progreso y compartir.
- `tests/content.test.cjs`: comprobaciones del generador y de los cálculos.

Ejecutar los tests con `node tests/content.test.cjs` y `node tests/progress.test.cjs`.

## Referencias del nivel

Los apuntes son la fuente que determina el contenido. Como contraste del nivel se consultaron recursos de 1.º de ESO:

- [Averroes: Números naturales, potencias y raíces](https://blogsaverroes.juntadeandalucia.es/matematicas1eso/1-numeros-naturales-potencias-y-raices/).
- [REA Andalucía: Lo más natural](https://edea.juntadeandalucia.es/bancorecursos/file/78fa39d8-234a-41bb-9e28-6102a7be13f7/2/MAT_1ESO_REA_01_V02.zip/51_lo_mas_natural.html).

## Verificación

Se verifican las operaciones de los ejercicios generados y las opciones de respuesta. Se revisa en navegador el recorrido de aprendizaje, respuestas numéricas y de elección, errores, pistas, cierre anticipado, conservación de la sesión al recargar y resumen de progreso. El diseño se revisa con dimensiones de iPad y móvil. La revisión a esas dimensiones no sustituye una prueba física en Safari de iPad.
