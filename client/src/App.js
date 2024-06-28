import React from "react";
import MainRoutes from "./routes/MainRoutes";
import { ToastContainer, Bounce } from "react-toastify";

const App = () => {
  return (
    <>
        <MainRoutes />
        <ToastContainer
          position="top-right"
          autoClose={1300}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="colored"
          transition={Bounce}
        />
    </>
  );
};

export default App;
