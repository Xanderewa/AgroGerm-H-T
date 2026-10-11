<div align="center">

# 🌱 AgroGerm·HT

### Simulador hidrotérmico de germinación para enseñanza agronómica

*Enseñar lo que no se ve, decidir con lo que sí.*

[![Licencia: CC BY-NC-SA 4.0](https://img.shields.io/badge/Licencia-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)
[![Versión](https://img.shields.io/badge/versión-2.14-green.svg)](https://github.com/Xanderewa/AgroGerm-H-T)
[![PWA](https://img.shields.io/badge/PWA-offline--ready-blue.svg)](https://xanderewa.github.io/AgroGerm-H-T/)
[![Plataforma](https://img.shields.io/badge/plataforma-Android%20%7C%20Web-brightgreen.svg)]()

[**🚀 Abrir la aplicación**](https://xanderewa.github.io/AgroGerm-H-T/) · [**📖 Manual del docente**](https://xanderewa.github.io/AgroGerm-H-T/manual.html) · [**📥 Descargar APK**](#-instalación-en-android)

</div>

---

## 📖 Sobre el proyecto

**AgroGerm·HT** es una aplicación educativa que simula el proceso de germinación de semillas mediante un modelo **hidrotérmico**, con el objetivo de servir como herramienta didáctica en aulas universitarias y de educación media técnica.

Nació de una pregunta simple: **¿cómo enseñar algo que no se ve?**

La germinación ocurre bajo tierra, en escalas de tiempo que van de días a semanas, y depende de variables que ningún pizarrón puede mostrar simultáneamente: temperatura, potencial hídrico del suelo, profundidad de siembra, vigor, textura, pH, salinidad. Esta aplicación permite **manipular esas variables en tiempo real** y observar sus efectos sobre la germinación y emergencia.

> *Un resultado agronómico no es un número, es una distribución.*

---

## ✨ Características principales

### 🧪 Modo Simulación (aula)
- **46 cultivares** de **13 especies** (soja, maíz, trigo, girasol, sésamo, sorgo, poroto, algodón, maní, caña, cebada, arroz, alfalfa, mandioca)
- **8 demos precargados** por categoría
- **Clima simulado** con semilla reproducible
- **Suelo editable**: textura, pH, CE, MO, P, N, CEC
- **Eventos de lluvia/riego** con generadores automáticos
- **Mapa espacial** de germinación con ruido Perlin

### 🌾 Modo Real Paraguay
- **Clima real** vía Open-Meteo (pronóstico 14 días o histórico 90 días)
- **13 regiones** de Paraguay con perfiles de suelo precargados
- **Geolocalización GPS** opcional
- **Recomendación agronómica** con veredictos: *sembrar · esperar · mejorar primero · no sembrar*
- **Análisis económico**: precio, rinde, break-even, margen por hectárea
- **Monte Carlo** para cuantificar incertidumbre (N=50/100/500 iteraciones)
- **Escenarios guardables** y comparables hasta 5 a la vez
- **Reporte PDF** completo exportable

### 📴 Funcionamiento offline
- Service Worker con estrategia **cache-first** para recursos estáticos
- Estrategia **network-first** para APIs de clima (Open-Meteo)
- **100% funcional sin conexión** una vez cargado por primera vez
- Ideal para uso en campo sin wifi ni datos móviles

---

## 🎯 ¿Para quién es?

- 👨‍🏫 **Docentes** de agronomía, biología vegetal, fisiología vegetal o ciencias agrarias
- 👨‍🎓 **Estudiantes** universitarios de carreras agropecuarias
- 👩‍🌾 **Productores** que necesitan entender la lógica del modelo antes de aplicar decisiones
- 🧪 **Investigadores** que quieran una herramienta didáctica para explicar conceptos de germinación

---

## 🚀 Uso rápido

### En el navegador (online)
Visitá 👉 [**xanderewa.github.io/AgroGerm-H-T**](https://xanderewa.github.io/AgroGerm-H-T/)

### En Android (APK instalable)
1. Descargá el **`AgroGerm.apk`** desde la sección [Releases](https://github.com/Xanderewa/AgroGerm-H-T/releases)
2. Habilitá **"Instalar apps de fuentes desconocidas"** en Ajustes
3. Instalá el APK
4. Abrí la app y esperá a que cargue la primera vez (necesita internet para cachear)
5. ¡Lista para usar **sin conexión** desde ese momento! 📴

### Agregar a pantalla de inicio (sin instalar APK)
1. Abrí la web en Chrome
2. Menú (3 puntitos) → **"Agregar a pantalla de inicio"**
3. Se instala como PWA con ícono propio

---

## 📚 Uso en el aula

### Sugerencia de actividad (45 minutos)

1. **Introducción (10 min)** — Explicar el modelo hidrotérmico: temperatura base, GDA, potencial hídrico
2. **Exploración guiada (15 min)** — Cada estudiante ejecuta un demo precargado distinto
3. **Manipulación de variables (15 min)** — Pedirles que cambien una variable y observen el efecto
4. **Puesta en común (5 min)** — Comparar resultados y discutir por qué difieren

### Conceptos que enseña
- Temperatura base (T_b), óptima (T_o) y crítica (T_c)
- Grados-día acumulados (GDA)
- Potencial hídrico (Ψ) y potencial osmótico
- Elongación del coleoptilo
- Estrés salino y su efecto sobre la germinación
- Incertidumbre agronómica (vía Monte Carlo)

---

## 🛠️ Stack técnico

| Capa | Tecnología |
|---|---|
| **Frontend** | HTML5, CSS3, JavaScript (vanilla) |
| **UI/Estilos** | Tailwind CSS |
| **Gráficos** | Chart.js |
| **Exportación PDF** | jsPDF + html2canvas |
| **Datos climáticos** | Open-Meteo API |
| **Offline** | Service Worker (v2.15) |
| **Empaquetado Android** | PWABuilder (TWA) |
| **Hosting** | GitHub Pages |

---

## 📁 Estructura del repositorio

---

## 🧠 Modelo científico

El motor de simulación combina:

- **Función de distribución normal acumulada** para la curva sigmoidea de germinación
- **Factores multiplicativos** que modulan la tasa de germinación:
  - `f_T` — factor térmico (trapezoidal)
  - `f_Ψ` — factor hídrico (lineal)
  - `f_pH` — factor pH (cuadrático por tramos)
  - `f_CE` — factor salino (lineal desde 2 dS/m)
  - `f_P`, `f_N` — factores nutricionales
- **Ψ osmótico** calculado desde CE: `Ψ_osm = -0.036 × CE`
- **Corrección por profundidad** de siembra
- **Ruido Perlin** para variabilidad espacial del lote
- **Monte Carlo** con distribución Gamma para incertidumbre

**Referencias metodológicas:** modelo hidrotérmico de Gummerson (1986), Bradford (2002), y parametrizaciones agronómicas adaptadas a condiciones subtropicales de Paraguay.

---

## 📖 El manual

El archivo `manual.html` es un **libro completo** pensado para docentes, organizado en 4 partes:

- **Parte I — Simulación**: teoría, valor didáctico, interfaz, motor científico
- **Parte II — Modo Real**: clima real, suelos paraguayos, recomendación, economía, Monte Carlo
- **Parte III — Tutoriales**: análisis en 10 minutos, clase con escenarios, reporte PDF
- **Parte IV — Anexos**: los 46 cultivares, parámetros y rangos

👉 [**Leer el manual completo**](https://xanderewa.github.io/AgroGerm-H-T/manual.html)

---

## 📜 Licencia

Este proyecto está licenciado bajo **Creative Commons BY-NC-SA 4.0**.

**Podés:**
- ✅ Usarlo en tu aula sin pedir permiso
- ✅ Adaptarlo, traducirlo o mejorarlo
- ✅ Compartirlo con otros docentes

**Siempre que:**
- 📛 Menciones a **Agustín B.** como autor original
- 🚫 **No lo uses con fines comerciales**
- 🔁 Compartas las mejoras bajo la misma licencia

Ver [LICENSE](LICENSE) para el texto completo.

---

## 👤 Autor

**Agustín B.** — Paraguay 🇵🇾

Proyecto educativo personal desarrollado sin fines de lucro, con el objetivo de aportar una herramienta didáctica abierta a la comunidad educativa agronómica.

---

## 🙏 Créditos

- Datos climáticos: [Open-Meteo](https://open-meteo.com)
- Iconografía: [Lucide Icons](https://lucide.dev)
- Gráficos: [Chart.js](https://www.chartjs.org)
- Empaquetado Android: [PWABuilder](https://pwabuilder.com)
- Modelo hidrotérmico: basado en bibliografía clásica de fisiología de semillas

---

## 🤝 Contribuciones

¿Sos docente y querés aportar mejoras, traducciones o nuevos casos de uso? Las contribuciones son bienvenidas.

Abrí un [issue](https://github.com/Xanderewa/AgroGerm-H-T/issues) o un [pull request](https://github.com/Xanderewa/AgroGerm-H-T/pulls).

---

<div align="center">

**🌱 Enseñar lo que no se ve, decidir con lo que sí.**

© 2026 Agustín B. · [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/)

</div>
