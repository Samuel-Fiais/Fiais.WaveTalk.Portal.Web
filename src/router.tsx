import React from "react";
import { createBrowserRouter, redirect, RouteObject } from "react-router-dom";
import { useLogin } from "./hooks/useLogin";
import { ChatPage } from "./pages/chat/ChatPage";
import { LoginPage } from "./pages/login/LoginPage";

const PrivateRoute = (path: string, Component: React.ComponentType<any>) => {
  const { getAuthToken } = useLogin();
  
  return {
    path,
    loader: async () => {
      if (!getAuthToken()) {
        return redirect("/login");
      }

      return null;
    },
    Component: Component
  };
};

const routes: RouteObject[] = [
  {
    path: "/login",
    Component: LoginPage
  },
  PrivateRoute("/", ChatPage),
  PrivateRoute("/chat", ChatPage)
];

export const router = createBrowserRouter(routes, { basename: "" });
