import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import Cart from "../pages/shop/Cart";
import BookingCard from "../pages/reservation/Reservation";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
          path: "/menu",
          element: <Menu/>
        },
        {
          path: "/cart-page",
          element: <Cart/>
        },
        {
          path: "/book-table",
          element: <BookingCard/>
        }
      ]
    },
    {
      path: "/signup",
      element: <Signup/>
    }
  ]);

  export default router;