# Development Notes

## Overview
This document outlines the refactoring performed to improve modularity, error handling and developer onboarding.

### Key Changes
- Added centralized error logging via `src/lib/logger.ts` which logs to the console or an external service.
- Updated async functions and API routes to capture errors using `logError`.
- Created `.env.example` with required configuration variables.
- Provided page and component templates under `templates/`.
- Added try/catch around Supabase operations in `src/lib/workout.ts` and `src/lib/workout-log.ts`.

## Running Locally
1. Copy `.env.example` to `.env.local` and fill values.
2. Install dependencies with `npm install`.
3. Start the dev server using `npm run dev`.

If `npm run dev` fails ensure that `next` is installed correctly inside `node_modules`.
