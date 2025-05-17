# Developer Checklist

## Adding a New Page
- [ ] Create a new folder under `src/app` with `page.tsx` using `templates/NewPageTemplate.tsx` as a starting point.
- [ ] Include any server/data logic in `src/lib` or a new service file.
- [ ] Update navigation if needed.

## Adding a New Component
- [ ] Add the component file in `src/components` based on `templates/NewComponentTemplate.tsx`.
- [ ] Write prop types and include basic `useEffect` logic if required.

## Adding a Feature
- [ ] Keep business logic in `src/lib` or `src/services`.
- [ ] Ensure pages remain small and import reusable components.

## Handling Errors
- [ ] Wrap async operations in try/catch.
- [ ] Call `logError(file, functionName, error)` to output errors to the console or a logging service.
- [ ] Surface user-friendly messages in the UI.
