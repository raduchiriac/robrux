![screenshot](./public/screenshot.png?raw=true)

### Are you here for the first time?

Use your favorite package manager to install the dependencies.

Run `npm run storyboard` to see some of the components in action (but some environment variables might be needed).

### Development appetite?

Create and edit a valid `.env` file by doing `cp .env.sample .env`. Start your local MongoDB server or setup a remote one in the said `.env` file. Run `npm run seed` once, wait for the data to be imported, then terminate this process. You're all set.

Now run `npm run start:dev` and create something nice. PR are welcome.

#### Roadmap

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
- [ ] Create a Rating Collection (make seed file)
- [ ] (_Route_) New Gig (use Formik and yup, _protected route_, Stripe API)
- [ ] (_Route_) My Profile (_protected route_)
- [ ] Fuzzy-Search on MongoDB (include tags)
- [ ] Dynamic <title> using Helmet
- [ ] Payment System (Stripe API)
- [ ] Rewrite the GraphQL schemas (more readable)
- [ ] Image Upload to cloud storage (Cloudinary API)
- [ ] Fully fledged User Auth system and roles (make seed file)
- [ ] Try out `next-i18next` (mainly the SSR)
- [ ] Prettier Mongoose errors (w/ i18n)
- [ ] Convert all forms to `Formik` with `useForm` and validate errors (use `yup`)
- [ ] Login with social-media (at least Facebook Strategy)
- [ ] Create a Category Collection
- [ ] Store the Static Map PNGs rather than asking Google API everytime
- [ ] Mailing System (Mailchimp API)
- [ ] Audit everything with Lighthouse
- [ ] Pre-commit eslint (husky)
- [ ] Write a better `.eslintrc`
- [ ] minZoom for React Google Maps ([issue](https://github.com/google-map-react/google-map-react/issues/505))
