# web-component-assignment

## What challenges did you face when encapsulating functionality and styles using the Shadow DOM?
When using the Shadow DOM, I faced challenges like making sure it wasn't too hard to manage. I had to use extra tools to debug and inspect the elements, and styling the component without affecting the rest of the application's styles was tricky. But overall, it gave a clean space for the component's styles and functionality.

## How did you ensure your component’s API is intuitive for developers using it?
To make the component's API easy to use, I created descriptive attributes like initial-todos and used "lifecycle" methods like attributeChangedCallback to handle changes smoothly. I also added custom events like todo-added and todo-deleted to improve interaction.

## How does your component improve the maintainability or performance of the web application?

My component makes the web application more maintainable and performant by reducing style conflicts and allowing it to be reused without duplicating code. It also ensures that the component's performance doesn't affect the rest of the application. Using custom events is supposed to keep different parts of the application loosely connected, making the code more efficient and improving user interaction.
