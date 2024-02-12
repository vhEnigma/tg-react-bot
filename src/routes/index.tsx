import { createBrowserRouter } from 'react-router-dom'
import Technology from '../pages/Technology'
import { RouteList } from './routes.ts'
import Root from '../pages/Root'
import ErrorBoundary from '../pages/ErrorBoundary'
import App from '../Layout/App'
import Directions from '../pages/Directions'
import Test from '../pages/Test'
import TestResult from '../pages/TestResult'
import Article from '../pages/Article'


export const router = createBrowserRouter([
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
        path: RouteList.Technology,
        element: <Technology />
      },
      {
        path: RouteList.Article,
        element: <Article />
      },
      {
        path: RouteList.Test,
        element: <Test />
      },
      {
        path: RouteList.TestResult,
        element: <TestResult />
      }
    ]
  }

], {
  basename: ''
})