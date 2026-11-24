# Laboratory Exercise 3: React Props and Component Communication

## Guide Questions

1. **What is the difference between props and state?**
   Props are read-only inputs passed from a parent component to a child component, while state is data managed inside a component that can change over time and trigger re-renders.

2. **Why can a child component not modify the props it receives?**
   Props belong to the parent component and follow one-way data flow; mutating them directly would break predictability and make state updates harder to track across components.

3. **How does the `onAddToCart` callback allow data to flow from child to parent even though props only flow downward?**
   `App` passes the `onAddToCart` function down as a prop to `ProductCard`, and when the button is clicked, `ProductCard` invokes that function with the product title so `App` can update its own state.

4. **Why is the `key` prop required when rendering a list with `.map()`? What could happen if it is missing or duplicated?**
   `key` helps React identify which list items changed, were added, or were removed. Missing keys cause React warnings and less reliable list updates, while duplicate keys can cause rendering or state bugs on repeated items.

5. **What does the `children` prop allow you to do that a normal prop does not?**
   `children` lets you pass arbitrary nested JSX elements or markup directly between opening and closing component tags (such as custom badges), making components more flexible to compose.
