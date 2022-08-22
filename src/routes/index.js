import {
  lazy
} from 'react'

// use lazy for better code splitting, a.k.a. load faster
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Product = lazy(() => import('../pages/Product/Product'))
const Add = lazy(() => import('../pages/Product/Add'))
const Edit = lazy(() => import('../pages/Product/Edit'))
const Team = lazy(() => import('../pages/Team'))
const Category = lazy(() => import('../pages/Category'))
const Income = lazy(() => import('../pages/Income'))
const Outcome = lazy(() => import('../pages/Outcome'))
const Profile = lazy(() => import('../pages/Profile'))
const Cards = lazy(() => import('../pages/Cards'))
const Charts = lazy(() => import('../pages/Charts'))
const Buttons = lazy(() => import('../pages/Buttons'))
const Modals = lazy(() => import('../pages/Modals'))
const Tables = lazy(() => import('../pages/Tables'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [{
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/product',
    component: Product,
  },
  {
    path: '/product/add',
    component: Add,
  },
  {
    path: '/product/edit',
    component: Edit,
  },
  {
    path: '/team',
    component: Team,
  },
  {
    path: '/category',
    component: Category,
  },
  {
    path: '/income',
    component: Income,
  },
  {
    path: '/outcome',
    component: Outcome,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/cards',
    component: Cards,
  },
  {
    path: '/charts',
    component: Charts,
  },
  {
    path: '/buttons',
    component: Buttons,
  },
  {
    path: '/modals',
    component: Modals,
  },
  {
    path: '/tables',
    component: Tables,
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes