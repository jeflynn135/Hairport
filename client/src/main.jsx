//not sure about services in children
//reviews route on backend, is it /reviews????
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "./App.jsx";
//import pages when ready
//do we need bootstrap to display this????
import "bootstrap/dist/css/bootstrap.min.css";
import Reviews from "./pages/Reviews.jsx";
import Services from "./pages/Services.jsx";
import Contact from "./pages/Contact.jsx";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <h1 className="display-2">WRONG PAGE</h1>,
        children: [
            {
                index: true,
                element: <Services />
            }, 
            {
                path: "/reviews",
                element: <Reviews />
            },
            {
                path: "/contactme",
                element: <Contact />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById("root")).render(
<RouterProvider router={router} />
)