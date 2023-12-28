# map advertise app

## project structure
├── ...
├── src                    # source folder
│   ├── components          # vue component
│   ├── composables         # contain custom hook and api calling
│   ├── constant            # app constant
│   ├── layouts             # general layout and admin layout
│   ├── middleware          # middleware for admin page
│   ├── pages               # pages route
│   ├── pllugins            # global variables and third party plugin
│   ├── stores              # app states
│   ├── utils               # app helpers
│   └── styles              # global styles
└── ...

## Getting Started
```bash
# Install dependencies
$ yarn

# Run as development mode http://localhost:3030
$ yarn dev

# Build as production mode and launch server
$ yarn build
$ yarn start
```

## Components
auto import by folder directory

## Composable
[Composable documentation](https://nuxt.com/docs/getting-started/data-fetching#fetch)

## API
$apiFetch: using same with $fetch
[$fetch documentation](https://nuxt.com/docs/getting-started/data-fetching#fetch)

```javascript
const { $apiFetch } = useNuxtApp()
const list = await $apiFetch(....)
```

## Modal
```javascript
const { $modal } = useNuxtApp()
const openModal = async () => {
  await $modal.show({
    component: [component name to show]
  })
}
```

## toast