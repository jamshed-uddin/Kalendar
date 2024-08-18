import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DataContextProvider from "./contexts/DataContextProvider.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AddEvent from "./pages/AddEvent.jsx";
import EventDetail from "./pages/EventDetail.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "addevent", element: <AddEvent /> },
  { path: "event/:id", element: <EventDetail /> },
  { path: "event/edit/:id", element: <AddEvent /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </DataContextProvider>
  </StrictMode>
);
