import AdminPage from "../pages/AdminPage";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import CartPage from "../pages/CartPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import PaymentPage from "../pages/PaymentPage";
import OrderDetailsPage from "../pages/OrderDetailsPage";
import MyOrderPage from "../pages/MyOrderPage";
import ProfilePage from "../pages/ProfilePage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
  },
  {
    path: "/profile",
    page: ProfilePage,
    isShowHeader: true,
  },
  {
    path: "/product-details/:id",
    page: ProductDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/cart",
    page: CartPage,
    isShowHeader: true,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
  },
  {
    path: "/order-details/:id",
    page: OrderDetailsPage,
    isShowHeader: true,
  },
  {
    path: "/admin/*",
    page: AdminPage,
    errorPage: NotFoundPage,
    isShowHeader: false,
    isPrivate: true,
  },
  {
    path: "/error",
    page: NotFoundPage,
    isShowHeader: false,
  },
  {
    path: "*",
    page: NotFoundPage,
    isShowHeader: false,
  },
];
