# Pruebas del Prototipo de Alta Fidelidad - HCI

Este documento detalla las pruebas realizadas sobre la interfaz desarrollada para la Gestión de Citas Médicas, como parte del proyecto de HCI. Las pruebas tienen como objetivo garantizar que el sistema sea funcional, accesible, intuitivo y robusto.

## 📅 Fecha del reporte
25/03/2025

---

## ✅ Pruebas Realizadas

### 1. Evaluación del Ingreso de Datos y Validaciones
- Se verificó que todos los campos requeridos mostraran mensajes de error en caso de datos faltantes.
- Se evaluaron las restricciones en campos como cédula, correo electrónico y fechas.
- Las validaciones fueron consistentes tanto en frontend como en backend.

### 2. Prueba de Navegación
- Se recorrieron todos los formularios con botones de navegación (`nuevo`, `editar`, `borrar`, etc.).
- El control HerramientasCom gestionó correctamente los modos `consulta`, `navegación` y `edición`.

### 3. Prueba de Interacciones de Usuario
- Se validaron selectores, botones, checkboxes, inputs tipo `time` y `date`.
- Las acciones disparadas por eventos `onClick`, `onChange` y `onSubmit` respondieron correctamente.

### 4. Prueba de Autenticación y Autorización
- Se probó el acceso a través de tokens almacenados en `localStorage`.
- Si el token expira, el sistema redirige al login (`/`), cumpliendo las políticas de seguridad.

### 5. Prueba de Integración de API
- Se verificó el consumo exitoso de los endpoints `/api/medicos`, `/api/pacientes`, `/api/citas`.
- Se utilizaron métodos `POST`, `PATCH`, `PUT`, `DELETE` y `GET` en diferentes flujos.
- Se realizó integración con token `Doorkeeper`.

### 6. Prueba de Accesibilidad
- Se validó contraste de colores y tipografía.
- Se usaron herramientas como Lighthouse y PageSpeed para medir el cumplimiento.

### 7. Prueba de Usabilidad
- Se observaron patrones de interacción en usuarios de prueba.
- Los mensajes de error e información se mostraron claramente y desaparecieron automáticamente tras un tiempo.


### 8. Prueba de Responsividad
- La interfaz fue probada en resoluciones móviles y de escritorio.
- Todos los componentes se adaptan correctamente usando Tailwind CSS.


### 11. Prueba de Notificaciones y Alertas
- Mensajes de error y éxito se mostraron usando `setErrorMsg` y `setInfoMsg`.
- Las alertas visuales ayudaron a guiar al usuario en acciones como agendar citas o borrar registros.

---

## 🔧 Herramientas utilizadas

- React JS + Tailwind
- RSpec
- Swagger / rswag
- Postman
- Google Chrome DevTools
- PageSpeed Insights
- GitHub + Markdown

---
