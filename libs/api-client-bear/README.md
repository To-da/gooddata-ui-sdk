# GoodData Platform REST API Client

## Important

The contents of this package were previously available under @gooddata/gooddata-js. We have consolidated, renamed
and re-versioned all the JavaScript assets in GoodData UI.SDK v8.

## Introduction

This package provides a thin REST API Client for the GoodData Platform. The API client is useful for specific,
low-level tasks targeting the platform. It can be used to develop small applications for either browser or the node.js
environment. The responsibilities of the API client are mostly about exposing REST API endpoints as asynchronous
function calls - with degrees of convenience varying from API to API.

However, we believe and recommend that the API client should be used as a last resort in situations where the higher-level
components and abstractions are insufficient: please check out the @gooddata/sdk-backend-spi and
@gooddata/sdk-backend-bear to learn about a more convenient API to work with analytical backends.

> Note: if you are using the API client to drive custom executions on GoodData platform then there is no reason to
> use the API client directly. The

## Supported REST API versions

This table shows which version of the gooddata-js introduced support for a particular API version.

The REST API versions in the table are just for your information as the values are set internally and cannot be overridden.

| gd-bear-client version | REST API version |
| :--------------------: | :--------------: |
|       \>= 8.0.0        |        4         |

## Usage

### Using as a npm package

1. go to your project directory and add the package: \
   → with [yarn](https://yarnpkg.com): `yarn add @gooddata/gd-bear-client` \
   → with [npm](npmjs.com): `npm install --save @gooddata/gd-bear-client`

    :heavy_exclamation_mark: **WARNING: npm package renamed from `gooddata` to `@gooddata/gd-bear-client`** :heavy_exclamation_mark:

2. import the package's default export: \
   → in transpiled browser app with ES6 modules syntax: `import { factory } from '@gooddata/gd-bear-client';` \
   → in node.js with CommonJS syntax: `const factory = require('@gooddata/gd-bear-client').factory;`

3. call the API:

    ```js
    var gooddata = factory({ domain: "secure.gooddata.com" });
    gooddata.user
        .login("john.doe@example.com", "your-secret-password")
        .then((response) => console.log("Login OK", response))
        .catch((apiError) => console.error("Login failed", apiError, "\n\n", apiError.responseBody));
    ```

4. Please note that CORS could prevent the request. Refer to [your options in GoodData.UI documentation](https://sdk.gooddata.com/gooddata-ui/docs/cors.html), ie. setup local proxy or ask the GoodData platform for allowing a specific domain.

### Using as a standalone library

You have two options:

-   [download `gooddata.js` or `gooddata.min.js`](https://unpkg.com/@gooddata/gd-bear-client@latest/umd/) from the latest release
-   build on your own:
    ```bash
    git clone https://github.com/gooddata/gooddata-js.git
    cd gooddata-js
    git checkout v6.0.0 # choose a version, or omit this line to use unstable code from `master` branch
    yarn install --pure-lockfile
    yarn build
    # get gooddata.js and gooddata.min.js from /dist folder
    ```

Then you can import the library file and global variable `gooddata` contains all exported members:

```html
<script type="text/javascript" src="gooddata.js"></script>
<script type="text/javascript">
    var sdk = gooddata.factory({ domain: "secure.gooddata.com" });
    sdk.user.login("john.doe@example.com", "your-secret-password");
</script>
```

## License

(C) 2017-2020 GoodData Corporation

This project is dual licensed:

-   The ATTRIBUTION-NONCOMMERCIAL 4.0 INTERNATIONAL (CC BY-NC 4.0) is used for purpose of the trial experience and evaluation of GoodData.UI library.
-   The GOODDATA GOODDATA.UI LIBRARY END USER LICENSE AGREEMENT is used for GoodData customers.

For more information, please see [LICENSE](https://github.com/gooddata/gooddata-ui-sdk/blob/master/libs/api-client-bear/LICENSE)