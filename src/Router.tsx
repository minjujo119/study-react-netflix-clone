import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Popular from "./pages/Popular";
import ComingSoon from "./pages/ComingSoon";
import NowPlaying from "./pages/NowPlaying";
import MovieDetail from "./components/MovieDetail"
const Router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path:"/",
        element: <Popular />,
        children: [{
          path:":movieID",
          element:<MovieDetail/>
        }]
      },
      {
        path:"/coming-soon",
        element: <ComingSoon />
      },
      {
        path:"/now-playing",
        element: <NowPlaying />
      },

    ],
  },
]);

export default Router;
