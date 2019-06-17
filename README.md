# treeo admin tool

## Getting started

### Project setup

```bash
# Project setup (install all dependencies)
npm install
```

### Environment Variables

Rename `.env.example` to `.env` from the app's root path. Open `.env` and fill it.

You can specify env variables by placing the following files in your project root:

```bash
.env                # loaded in all cases
.env.local          # loaded in all cases, ignored by git
.env.[mode]         # only loaded in specified mode
```

### Develop on localhost

```bash
# Compiles and hot-reloads for development
npm run serve
```

### Compiles for production

```bash
# Compiles and minifies for production
npm run build
```

Copy the `dist` folder from the app's root path to your webspace

### Compiles for production (environment)

if you need a different environment like staging

Create `.env.stage` file and enter the following lines for example:

```bash
NODE_ENV=production

VUE_APP_ENV_NAME=stage

VUE_APP_PAGE_TITLE=treeo-admin (stage)

VUE_APP_BASE_URL= # should be filled
VUE_APP_API_URL= # should be filled
```

```bash
npm run build --mode stage
```

## Related Application

<https://github.com/b-lack/treeo_app>
<https://github.com/yalsicor/treeo_api>

## License

[Apache License Version 2.0](./LICENSE)
