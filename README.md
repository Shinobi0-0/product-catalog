## Lab 4 Guide Questions

1. **Why do we use two separate states, `searchText` and `debouncedSearch`, instead of only one?**
   `searchText` updates immediately on every keystroke so the controlled input stays responsive, while `debouncedSearch` updates only after a 300ms pause so filtering doesn't run on every single keystroke.

2. **What would happen if the debounce effect did not return a cleanup function?**
   Each keystroke would leave its own `setTimeout` active instead of resetting the timer when typing continues, causing extra or delayed updates after typing stops.

3. **What is the purpose of the dependency array? What happens if it is empty (`[]`)? What happens if it is left out completely?**
   The dependency array controls when `useEffect` re-runs based on watched values. An empty array `[]` runs the effect only once on mount, while omitting it completely runs the effect after every render.

4. **Why should we avoid sorting the original `products` array directly?**
   `.sort()` mutates an array in place, which can alter the original product order unexpectedly; copying first (like `[...products]`) keeps the source array intact.

5. **Is the filtered product list better stored in its own state, or calculated from existing state during rendering? Explain your choice.**
   Calculating it during rendering from existing state (`debouncedSearch`, `category`, `sortOrder`, and `products`) is better because it stays automatically in sync without duplicate state or unnecessary extra re-renders.
