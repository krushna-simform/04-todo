import { createBrowserRouter, Outlet, RouterProvider } from "react-router";

import Inbox from "@/pages/Inbox";
import Today from "@/pages/Today";
import Upcoming from "@/pages/Upcoming";
import { PageNotFound } from "@/pages/NotFound";

import { Sidebar } from "@/components/Sidebar";

const Layout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 h-[100vh]">
        <Outlet />
      </main>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Inbox />,
      },
      {
        path: "/today",
        element: <Today />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
