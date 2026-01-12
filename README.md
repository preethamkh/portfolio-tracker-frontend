# porfolio-tracker-frontend

Shared React Frontend for the PortfolioTracker App (.NET, MERN, PHP Stacks)

# SHARED REACT FRONTEND

_(Write ONCE, use with ALL 3 backends)_

## Architecture Diagram

| Shared Frontend           |     |                      |
| ------------------------- | --- | -------------------- |
| **SHARED REACT FRONTEND** | →   | **Stack 1: .NET 8**  |
|                           | →   | **Stack 2: MERN**    |
|                           | →   | **Stack 3: Laravel** |

_Arrow shows frontend integration with all three backend stacks._

---

## Testing Strategy

### Unit Tests

```bash
cd portfolio-tracker-frontend
npm run test
# Runs Vitest tests


cd portfolio-tracker-frontend
npm run e2e

# Runs Playwright tests

# Tests the ENTIRE flow: Frontend → Backend → Database

// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
server: {
proxy: {
'/api': {
target: 'http://localhost:5001', // Our .NET backend (for example)
changeOrigin: true,
},
},
},
});
```
