import { createBrowserRouter } from 'react-router-dom'
import Technology from '../pages/Technology'
import { RouteList } from './routes'
import Root from '../pages/Root'
import ErrorBoundary from '../pages/ErrorBoundary'
import App from '../layout/App'
import Directions from '../pages/Directions'
import Test from '../pages/Test'
import TestResult from '../pages/TestResult'
import Article from '../pages/Article'
import SingleDirection from '../pages/SingleDirection'
import SingleTechnology from '../pages/SingleTechnology'
import History from '../pages/History'

export const router = createBrowserRouter(
  [
    {
      path: RouteList.Root,
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          path: RouteList.Root,
          element: <Root />
        },
        {
          path: RouteList.Directions,
          element: <Directions />
        },
        {
          path: `${RouteList.Directions}/:id`,
          element: <SingleDirection />
        },
        {
          path: RouteList.Technology,
          element: <Technology />
        },
        {
          path: `${RouteList.Technology}/:id`,
          element: <SingleTechnology />
        },
        {
          path: `${RouteList.Article}/:id`,
          element: <Article />
        },
        {
          path: `${RouteList.Test}/:id`,
          element: <Test />
        },
        {
          path: `${RouteList.TestResult}/:id`,
          element: <TestResult />
        },
        {
          path: RouteList.History,
          element: <History />
        }
      ]
    }
  ],
  {
    basename: ''
  }
)
