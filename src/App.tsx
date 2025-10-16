import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RouteHandler from "./RouteHandler";

const queryClient = new QueryClient();
function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouteHandler />
      </QueryClientProvider>
    </>
  );
}

export default App;
