import { changePage } from "./changePage.js";
import { Landing } from "../pages/Landing/Landing.js";
import { Home } from "../pages/Home/Home.js";
import { VerifyPending } from "../pages/VerifyPending/VerifyPending.js";
import { SignLogin } from "../pages/SignLogin/SignLogin.js";
import { Books } from "../pages/Books/Books.js";
import { Videos } from "../pages/VideoPage/Videos.js";
import { Todo } from "../pages/ToDo/Todo.js";
import { Profile } from "../pages/Profile/Profile.js";
import NotFoundPage from "../pages/NotFound/NotFound.js";
import { authGuard } from "./authGuard.js";
import { getState } from "./state.js";

const routes = {
  "/": () => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");
    const token = params.get("token");
    const email = params.get("email");

    if (["success", "invalid"].includes(status)) {
      return changePage(VerifyPending, "verify-pending");
    }

    if (token && email) {
      return changePage(SignLogin, "signlogin");
    }

    const isLoggedIn = getState("isLoggedIn");
    const currentUser = getState("currentUser");

    //console.log("🔐 Auth state:", { isLoggedIn, currentUser });

    if (isLoggedIn && currentUser?.is_verified) {
      return navigate("/home");
    }

    if (isLoggedIn && !currentUser?.is_verified) {
      return changePage(VerifyPending, "verify-pending");
    }

    return changePage(Landing, "landing");
  },

  "/verify": () => {
    const params = new URLSearchParams(window.location.search);
    const status = params.get("status");

    if (["success", "invalid"].includes(status)) {
      return changePage(VerifyPending, "verify-pending");
    }

    return changePage(VerifyPending, "verify-pending");
  },

  "/login": () => changePage(SignLogin, "signlogin"),
  "/register": () => changePage(SignLogin, "signlogin"),
  "/home": () => authGuard(() => changePage(Home, "home")),
  "/books": () => authGuard(() => changePage(Books, "books")),
  "/videos": () => authGuard(() => changePage(Videos, "videos")),
  "/todos": () => authGuard(() => changePage(Todo, "todos")),
  "/profile": () => authGuard(() => changePage(Profile, "profile"))
};

export const handleRoute = async () => {
  const path = window.location.pathname.split("?")[0];
  const route = routes[path] || (() => changePage(NotFoundPage, "notfound"));
  await route();
};

export const navigate = (path) => {
  if (window.location.pathname !== path) {
    history.pushState({}, "", path);
  }
  handleRoute();
};

window.onpopstate = handleRoute;
