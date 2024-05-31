# Next.js Credit Simulation and Investment API

This project provides an API for simulating credits using the German and French amortization methods, as well as a module for simulating investments. Both the backend API and the frontend are built using Next.js.

## Installation

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
2. Navigate to the project directory:
   ```bash
   cd nextjs-credit-simulation
3. Install dependencies:
   ```bash
   npm install
4. Create a .env.local file in the root directory and add the necessary environment variables. For example:
   ```bash
   DATABASE_URL=<your-database-url>
## Running the API
To run the API server, use the following command:
   ```bash
   npm run dev
   ```
This will start the Next.js development server for the API.

## Usage
### Simulate Credit
To simulate a credit using either the German or French amortization method, send a POST request to the /api/credit endpoint with the following JSON payload:

```bash
{
  "monto": 10000,
  "tiempo": 12,
  "interes": 5,
  "fecha_inicio": "01/01/2024",
  "seguro": 0
}
```
This endpoint will return a JSON response containing the amortization schedule for the credit.

### Simulate Investment
To simulate an investment, send a POST request to the /api/investment endpoint with the following JSON payload:

```bash
{
  "monto": 10000,
  "tiempo": 12,
  "interes": 5,
  "fecha_inicio": "01/01/2024"
}
```
This endpoint will return a JSON response containing information about the investment, including gross interest, monthly interest, total amount, and maturity date.

## Authentication
The API uses NextAuth for authentication with credentials. You can sign in using email and password.

### API Endpoints
The API includes the following endpoints:

#### Simulate Credit

- Method: POST
   - Endpoint: /api/credit
   - Request Body:
   ```bash
   {
     "monto": 10000,
     "tiempo": 12,
     "interes": 5,
     "fecha_inicio": "01/01/2024",
     "seguro": 0
   }
   ```
   - Response: Amortization schedule JSON data.
### Simulate Investment
- Method: POST
   - Endpoint: /api/investment
   - Request Body:
   ```bash
   {
     "monto": 10000,
     "tiempo": 12,
     "interes": 5,
     "fecha_inicio": "01/01/2024"
   }
   ```
   - Response:
   ```bash
   {
     "interes_bruto": "500.00",
     "interes_mensual": "41.67",
     "total": "10500.00",
     "fecha": "01/01/2025"
   }
This endpoint calculates the gross interest, monthly interest, total amount, and maturity date based on the provided investment parameters.

This README.md provides comprehensive instructions for installing, running, and using the Next.js Credit Simulation and Investment API, including details about the authentication process and API endpoints.
