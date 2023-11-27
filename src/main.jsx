import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AppRouter } from "./Routes/AppRouter.jsx";
import { AuthContext } from "./Context/AuthContext.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContext>
        {" "}
        <AppRouter></AppRouter>
      </AuthContext>
    </QueryClientProvider>
  </React.StrictMode>,
);
