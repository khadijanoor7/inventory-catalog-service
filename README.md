# Inventory Catalog Service

A full-stack inventory management system with NestJS backend and Next.js frontend.

## Tech Stack

**Backend:**
- NestJS
- TypeORM
- SQLite
- Swagger API Documentation

**Frontend:**
- Next.js
- React
- CSS Modules

## Getting Started

### Backend Setup

```bash
# Install dependencies
npm install

# Start the development server
npm run start:dev
```

The backend will run on `http://localhost:3000`  
Swagger API docs available at `http://localhost:3000/api`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:3001`

## API Endpoints

### Inventory
- `GET /inventory` - Get all products
- `GET /inventory/:id` - Get product by ID
- `POST /inventory` - Create new product
- `PATCH /inventory/:id` - Update product
- `DELETE /inventory/:id` - Delete product

### External Catalog
- `GET /external` - Fetch products from external API
- `GET /external/:id` - Get external product by ID

## Testing

```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:cov
```
