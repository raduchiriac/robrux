![screenshot](./public/screenshot.png?raw=true)

### Are you here for the first time?

Use your favorite package manager ([npm/yarn](https://www.stackshare.io/stackups/npm-vs-yarn)) to install the dependencies.

Run `npm run storyboard` to see some of the components in action (some environment variables might be needed – read below).

### Appetite for development?

Create and edit a valid `.env` file by doing `cp .env.sample .env`. Start your local MongoDB server or setup a remote one in the said `.env` file. Run `npm run seed` and wait for the data to be imported. Congratulations, you're all set.

Now run `npm run start:dev` and create something nice. PRs are welcome.

#### Dockyard

- [x] Fetch data with a Mongo `$geoWithin` type of query
- [x] Attach Next.js v9 to Express
- [x] Add Material-UI grid, themes, raw components
- [x] Create an import seed script
- [x] Convert Classes to Functions (Context API, useHooks)
- [x] i18n (using Context API)
- [x] Add Storybook and start sketching components
- [x] Sessions, JWT, graphql-cookie-headers (withApollo HOC)
- [x] (_Route_) Preview Gig (use React Spring to transition, _protected route_)
- [x] Lazy-load HOC for images (blur effect)
- [x] Option to use either Google Maps, Open Street Map or Mapbox
- [x] Fuzzy-Search on MongoDB (include tags)
- [ ] Create a Category Page (linked from gig-page)
- [ ] Add a News section (make seed file) (push a newsletter with `save` hook)
- [ ] Send 404 if not found: Gig, News, Profile IDs (do a fetch inside `getInitialProps()`)
- [ ] Create a Rating Collection (make seed file)
- [ ] (_Route_) New Gig (use Formik and yup, _protected route_, Stripe API)
- [ ] (_Route_) My Profile (with edit option) (_protected route_)
- [ ] (_Route_) View any user's profile (linked from gig-page)
- [ ] Dynamic `<title>` using Helmet
- [ ] Payment System (Stripe API or Adyen)
- [ ] Rewrite the GraphQL schemas (more readable)
- [ ] Image Upload to cloud storage (Cloudinary API)
- [ ] Fully fledged User Auth system (`HttpOnly` cookies) and roles (make seed file)
- [ ] Try out `next-i18next` (mainly the SSR)
- [ ] Prettier Mongoose errors (w/ i18n)
- [ ] Convert all forms to `Formik` or `react-hook-form` and validate errors (using `yup`)
- [ ] Login with social-media (at least Facebook Strategy)
- [ ] Store the Static Map PNGs rather than asking Google API everytime (see gig-page)
- [ ] Mailing System (Sparkpost or Mailgun API)
- [ ] Audit everything with Lighthouse
- [ ] Generate a [sitemap.xml](https://gist.github.com/a-barbieri/9eb6d65ef96c2ead322bd97ae4862934)
- [ ] Checkout the new `<Suspense />` from react-experimental
- [ ] Try to [lazy load your modules](https://flaviocopes.com/nextjs-lazy-load-modules/)
- [ ] Pre-commit eslint (husky)
- [ ] Write a better `.eslintrc` ([example](https://github.com/mui-org/material-ui/blob/master/.eslintrc.js))
- [ ] Fix minZoom for React Google Maps ([issue](https://github.com/google-map-react/google-map-react/issues/505))
