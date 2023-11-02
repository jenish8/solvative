// Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

//Pages
import ListUser from "./pages/ListUser";
import SingleUserPage from "./components/SingleUserPage/SingleUserPage";
import NewUser from "./pages/NewUser";
import P5 from "./pages/P5";
import Reward from "./pages/Reward";
import GiveReward from "./pages/GiveReward";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ListUser />,
  },
  {
    path: "/:id",
    element: <SingleUserPage />,
  },
  {
    path: "/new",
    element: <NewUser />,
  },
  {
    path: "/:id/p5",
    element: <P5 />,
  },
  {
    path: "/:id/reward",
    element: <Reward />,
  },
  {
    path: "/:id/reward/new",
    element: <GiveReward />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
