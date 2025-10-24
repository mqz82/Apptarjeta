# Plan Uso Inteligente CMR

Aplicación web completa para gestionar el uso inteligente de la tarjeta CMR, compuesta por un backend en Spring Boot y un frontend en React + Vite.

## Estructura del proyecto

```
.
├── backend/    # API REST en Spring Boot 3
├── frontend/   # SPA en React 18 + Vite + Tailwind
└── README.md   # Guía de ambientación
```

## Requisitos

- Java 17
- Maven 3.9+
- Node.js 18+
- npm 9+

## Backend (Spring Boot)

1. Copia el archivo `.env.example` (si lo creas) o exporta las variables:
   ```bash
   export PROFILE=json
   export CUPO_DEFAULT=530000
   export DIA_CIERRE=24
   export DIA_PAGO=10
   ```
2. Ejecuta la aplicación:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
3. Endpoints disponibles en `http://localhost:8080/api/v1`.

### Tests

```bash
cd backend
mvn test
```

> **Nota:** En entornos sin acceso a Maven Central se debe configurar un repositorio local con las dependencias de Spring Boot.

### Persistencia

- Perfil `json` (por defecto): guarda datos en archivos dentro de `backend/data/`.
- Perfil `mysql`: define la conexión a MySQL (`jdbc:mysql://localhost:3306/cmr_db`). Incluye el conector en `pom.xml`. Debes crear `schema.sql` y entidades JPA si decides usarlo.

## Frontend (React + Vite)

1. Instala dependencias:
   ```bash
   cd frontend
   npm install
   ```
2. Ejecuta en modo desarrollo:
   ```bash
   npm run dev
   ```
   La app queda disponible en `http://localhost:5173`.
3. Construye para producción:
   ```bash
   npm run build
   ```
4. Linter opcional:
   ```bash
   npm run lint
   ```

## Documentación funcional

- **Dashboard**: resumen del mes seleccionado, semáforo y parámetros vigentes.
- **Configuración**: formulario para actualizar cupo, día de cierre y día de pago. Persistencia inmediata.
- **Plan**: tips informativos cargados desde `plan.json`.
- **Calendario & Alertas**: genera 12 meses a partir de la configuración; muestra semana ideal, días a evitar y control de pago.
- **Bitácora de Compras**: CRUD completo, semáforo basado en el estado pagado y resumen de gastos.

## Lógica principal

- El semáforo del backend se calcula así:
  - `GREEN` &lt; 30% del cupo usado
  - `YELLOW` entre 30% y 60%
  - `RED` &gt;= 60%
- Semana ideal: día siguiente al cierre hasta cinco días antes del pago.
- Días a evitar: los cinco días previos al cierre.
- Resumen mensual: suma de compras del mes, porcentaje de cupo, puntos estimados (`total/1000`).

## Archivos de datos

- `backend/data/config.json`
- `backend/data/purchases.json`
- `backend/data/months.json`
- `backend/data/plan.json`

Puedes editarlos manualmente si lo necesitas. Se generan automáticamente si no existen.

## Próximos pasos sugeridos

- Implementar completamente el perfil `mysql` con Spring Data JPA y migraciones SQL.
- Añadir autenticación si deseas múltiples usuarios.
- Crear más pruebas unitarias e integración tanto en backend como frontend.

¡Listo! Con estas instrucciones deberías poder levantar el proyecto localmente y experimentar con el plan de uso inteligente de tu tarjeta CMR.


## Notas personales de desarrollo

Versión experimental creada por **Sergio Márquez (smarquez_v1)**  
Esta rama se utiliza para pruebas, ajustes de frontend y mejoras en la interfaz.
