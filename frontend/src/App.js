import React from "react";
import { Toaster } from "sonner";
import LandingPage from "@/pages/LandingPage";

function App() {
  return (
    <div className="App">
      <LandingPage />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#14110f",
            border: "1px solid #2a2623",
            color: "#f5f0ea",
            borderRadius: 2,
          },
        }}
      />
    </div>
  );
}

export default App;
