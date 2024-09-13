# Frontend Tech Challenge

For the challenge, you should use free image gallery API Lorem Pictus. Detail documentation of the API [`https://picsum.photos/`](https://picsum.photos/).

The application should satisfy these user stories:

- As a user, I want to be able to browse through the list of images.
    - Images list should be paginated.
    - Image item should include image preview and author's name.
- As a user, I want to click an image and be navigated to the edit image page.
- As a user, I want to be able to edit image:
    - User can select image size [height, width]
    - User can choose greyscale mode.
    - User can blur the image (grade between 1 - 10)
    - User should see the currently edited image preview
- As a user, I want to be able to download edited image
- As a user, I want to be able to refresh the page at any point and still get the previous result
- As a user I want the page to remember where I was when going back in history

# Result disclaimer

```sh
npm run dev
```

Sorry for all linter issues in advance - I don't have a suitable PC on hand, and the one I use is pain to setup for work.

This demo use API provided for all image manipulations and only use browser built-in functional for recompression to any format requested ( support jpg, png, gif, bmp, webp ).
Better solution would be to download the image once and then change it within the browser canvas - this'd allow to make any effects, not only what API supports and save on network.

There's a lot to improve in the project in general, some areas are not coveed at all (like testing), but it takes way too much time already, so I'm submitting this one day result as-is, we can discuss anything of interest.

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
