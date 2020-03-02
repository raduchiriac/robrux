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
- [x] Add i18n/l10n (using Context API)
- [x] Add Storybook and start sketching components
- [x] Sessions, JWT (withApollo HOC)
- [x] Fully fledged User Auth system (`HttpOnly` cookies)
- [x] Lazy-load HOC for images (blur or opacity effect)
- [x] Option to use either Google Maps, Open Street Map or Mapbox
- [x] Fuzzy-Search on MongoDB (include tags)
- [x] Add a News section (add to seed file) (push a newsletter using the `save` hook)
- [x] Send 404 if not found: Gig, News, Profile (do a fetch inside `getInitialProps()`)
- [x] Dynamic `<title>` using Helmet
- [x] Create a Category Page (linked from gig-page)
- [x] Make components more accessible (storybook-a11y)
- [ ] Use `graphql-cookie-headers`
- [ ] Cache GraphQL requests
- [ ] Add user roles (edit the seed file)
- [ ] Protect GraphQL mutations (Authorization and [rate-limit](https://www.npmjs.com/package/graphql-rate-limit-directive))
- [ ] Animations using React Spring [or similar](https://material-ui.com/components/transitions/) of page elements
- [ ] Create a Rating Collection (add to seed file)
- [ ] Option to flag Gigs (mutate that Collection)
- [ ] (_Route_) New Gig (use Formik and yup, _protected route_, Stripe API)
- [ ] (_Route_) My Profile (with edit option) (_protected route_)
- [ ] (_Route_) View any user's profile (linked from gig-page)
- [ ] Payment System (Stripe API or Adyen)
- [ ] Rewrite the GraphQLInputObjectType schemas (make them more readable)
- [ ] Image Upload to cloud storage (Cloudinary API)
- [ ] Prettier Mongoose errors (w/ l10n)
- [ ] Login with social-media (at least Facebook Strategy)
- [ ] Mailing System (Sparkpost or Mailgun API)
- [ ] Audit everything with Lighthouse
- [ ] Create a dark-skin theme (stored in localStorage, remember to invert the map color with CSS and use `@media (prefers-color-scheme`)
- [ ] Generate a [sitemap.xml](https://gist.github.com/a-barbieri/9eb6d65ef96c2ead322bd97ae4862934)
- [ ] Use propTypes everywhere
- [ ] Write some Jest/Enzyme tests
- [ ] Try to [lazy load your modules](https://flaviocopes.com/nextjs-lazy-load-modules/)
- [ ] Pre-commit eslint (husky)
- [ ] Write a better `.eslintrc` ([example](https://github.com/mui-org/material-ui/blob/master/.eslintrc.js))
- [ ] Fix minZoom for React Google Maps ([issue](https://github.com/google-map-react/google-map-react/issues/505))
- [ ] Use `reactStrictMode: true` documented [here](https://reactjs.org/docs/strict-mode.html)
- [ ] Store the Static Map PNGs rather than asking Google API everytime
- [ ] Checkout the new `<Suspense />` from react-experimental

#### 📦 Try me out area

- [ ] `npm i @welldone-software/why-did-you-render -SE`
- [ ] `npm i next-seo -SE`
- [ ] `npm i next-nookies-persist -SE`
- [ ] `npm i next-session -SE`
- [ ] `npm i next-offline -SE`
- [ ] `npm i next-nprogress -SE`
- [ ] `npm i next-ga -SE`
- [ ] `npm i next-page-transitions -SE`
- [ ] `npm i next-optimized-images -SE`
- [ ] `npm i next-i18next -SE` (at least the SSR)
- [ ] `npm i i18nh -SE`
- [ ] `npm i data-prefetch-link -SE` (at least the SSR)
- [ ] `npm i graphql-rate-limit -SE`
- [ ] `npm i reto -SE` (create a global store)
- [ ] `npm i react-hook-form -SE`
- [ ] `npm i formik -SE`
- [ ] `npm i yup -SE`
- [ ] `npm i nodemailer nextmail -SE`
- [ ] `npm i notistack -SE`
- [ ] `npm i react-styleguidist -DE`
- [ ] `npm i firebase -SE` (at least for user authentication)
