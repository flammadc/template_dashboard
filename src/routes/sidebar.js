/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
  {
    path: '/app/dashboard', // the url
    icon: 'HomeIcon', // the component being exported from icons/index.js
    name: 'Dashboard', // name that appear in Sidebar
  },
  {
    path: '/app/forms',
    icon: 'ProductIcon',
    name: 'Product',
  },
  {
    path: '/app/teams',
    icon: 'PeopleIcon',
    name: 'Team',
  },
  {
    path: '/app/category',
    icon: 'CategoryIcon',
    name: 'Category',
  },
  // {
  //   path: '/app/cards',
  //   icon: 'CardsIcon',
  //   name: 'Cards',
  // },
  // {
  //   path: '/app/charts',
  //   icon: 'ChartsIcon',
  //   name: 'Charts',
  // },
  // {
  //   path: '/app/buttons',
  //   icon: 'ButtonsIcon',
  //   name: 'Buttons',
  // },
  // {
  //   path: '/app/modals',
  //   icon: 'ModalsIcon',
  //   name: 'Modals',
  // },
  // {
  //   path: '/app/tables',
  //   icon: 'TablesIcon',
  //   name: 'Tables',
  // },
  {
    icon: 'FormsIcon',
    name: 'Order',
    routes: [
      // submenu
      {
        path: '/login',
        name: 'Income',
      },
      {
        path: '/create-account',
        name: 'Outcome',
      },
      // {
      //   path: '/forgot-password',
      //   name: 'Forgot password',
      // },
      // {
      //   path: '/app/404',
      //   name: '404',
      // },
      // {
      //   path: '/app/blank',
      //   name: 'Blank',
      // },
    ],
  },
]

export default routes
