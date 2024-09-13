import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import { PageList } from './page-list';
import { PageEditor } from './page-editor';

export const router = createBrowserRouter([
    {
        path: '/pages/list',
        element: <PageList />,
    },
    {
        path: '/pages/editor/:imageId',
        element: <PageEditor />,
    },
    { // fallback route instead of 404
        path: "/*",
        element: <Navigate to="/pages/list" replace />,
    },
]);
