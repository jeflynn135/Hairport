import "./App.css";
import {Outlet} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from "@apollo/client";
import Navbar from "./components/Navbar";
//are we using setContext????
import {setContext} from "@apollo/client/link/context";

//link to backend
const httpLink = createHttpLink({uri: "/graphql"})

    const auth = setContext((__, {headers})=> {
        const token = localStorage.getItem("id_token")
        return {
            headers: {
                ...headers,
                authorization: token? `Bearer ${token}`:``
            }
        }
    })

// const Auth = setContext((_, {headers})=> {
//     const token = localStorage.getItem("id_token");

//     return {
//         headers: {
//             ...headers,
//             authorization: token ? `Bearer ${token}` : "",
//         },
//     };
// });

const client = new ApolloClient({
    link: auth.concat(httpLink),
    cache: new InMemoryCache(),

});

function App() {
    return (
        <ApolloProvider client={client}>
           <Navbar />
           <Outlet />

        </ApolloProvider>
    )
}

export default App;