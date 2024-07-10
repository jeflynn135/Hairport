import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";
//import pages when ready
//do we need bootstrap to display this????
import Reviews from "./pages/Reviews.jsx";
import Services from "./pages/Services.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1 className="display-2">WRONG PAGE</h1>,
        children: [
            {
                index: true,
                element: <Services />
            }, {
                path: "/reviews",
                element: <Reviews />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
<RouterProvider router={router} />
)