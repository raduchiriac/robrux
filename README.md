![screenshot](./public/screenshot.png?raw=true)

### Are you here for the first time?

Use your favorite package manager ([npm/yarn](https://www.stackshare.io/stackups/npm-vs-yarn)) to install the dependencies.

Run `npm run storyboard` to see some of the components in action (some environment variables might be needed – read below).

### Appetite for development?

Create and edit a valid `.env` file by doing `cp .env.sample .env`. Start your local MongoDB server or setup a remote one in the said `.env` file. Run `npm run seed` and wait for the mock data to be imported. Congratulations, you're all set.

Now run `npm run start:dev` and create something nice. PRs are welcome.

#### 🚧 Dockyard

- [x] Fetch data with a Mongo `$geoWithin` type of query
- [x] Attach Next.js v9 to Express
- [x] Add Material-UI grid, themes, raw components
- [x] Create an import seed script
- [x] Convert Classes to Functions (Context API, useHooks)
- [x] Add i18n (using Context API)
- [x] Add Storybook and start sketching components
- [ ] Sessions, JWT, graphql-cookie-headers (withApollo HOC)
- [ ] Fully fledged User Auth system (`HttpOnly` cookies) and user roles (add seed file)
- [ ] Firebase User Auth (example)
- [ ] Protect GraphQL mutations (Authorization and [rate-limit](https://www.npmjs.com/package/graphql-rate-limit-directive))
- [x] Lazy-load HOC for images (blur or opacity effect)
- [x] Option to use either Google Maps, Open Street Map or Mapbox
- [x] Fuzzy-Search on MongoDB (include tags)
- [x] Add a News section (add to seed file) (push a newsletter using the `save` hook)
- [x] Send 404 if not found: Gig, News, Profile (do a fetch inside `getInitialProps()`)
- [ ] Animations using React Spring [or similar](https://material-ui.com/components/transitions/) of page elements
- [ ] Create a Category Page (linked from gig-page)
- [ ] Create a Rating Collection (add to seed file)
- [ ] (_Route_) New Gig (use Formik and yup, _protected route_, Stripe API)
- [ ] (_Route_) My Profile (with edit option) (_protected route_)
- [ ] (_Route_) View any user's profile (linked from gig-page)
- [ ] Dynamic `<title>` using Helmet
- [ ] Payment System (Stripe API or Adyen)
- [ ] Rewrite the GraphQL schemas (make them more readable)
- [ ] Image Upload to cloud storage (Cloudinary API)
- [ ] Test [next-i18next](https://github.com/isaachinman/next-i18next) (mainly for the SSR)
- [ ] Prettier Mongoose errors (w/ l10n)
- [ ] Convert all forms to `Formik` or `react-hook-form` and validate errors (using `yup`)
- [ ] Login with social-media (at least Facebook Strategy)
- [ ] Store the Static Map PNGs rather than asking Google API everytime
- [ ] Mailing System (Sparkpost or Mailgun API)
- [ ] Create a dark-skin theme (stored in localStorage, remember to invert the map color with CSS and use `@media (prefers-color-scheme`)
- [ ] Audit everything with Lighthouse
- [ ] Generate a [sitemap.xml](https://gist.github.com/a-barbieri/9eb6d65ef96c2ead322bd97ae4862934)
- [ ] Write some Jest/Enzyme tests
- [ ] Use propTypes everywhere
- [ ] Try to [lazy load your modules](https://flaviocopes.com/nextjs-lazy-load-modules/)
- [ ] Pre-commit eslint (husky)
- [ ] Write a better `.eslintrc` ([example](https://github.com/mui-org/material-ui/blob/master/.eslintrc.js))
- [ ] Fix minZoom for React Google Maps ([issue](https://github.com/google-map-react/google-map-react/issues/505))
- [ ] Use `reactStrictMode: true` documented [here](https://reactjs.org/docs/strict-mode.html)
- [ ] Checkout the new `<Suspense />` from react-experimental
