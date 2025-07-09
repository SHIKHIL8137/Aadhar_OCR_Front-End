import { Route, Routes } from "react-router-dom";
import {Toaster} from 'sonner'
import { Suspense ,lazy} from "react";
import { SuspenseLoader } from "./components/SuspenseLoader";

const MainPage = lazy(()=>import("./pages/Home"));

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Suspense fallback={<SuspenseLoader />}></Suspense>
      <Routes>
        <Route path="/" element={<MainPage/>} />
      </Routes>
    </>
  );
}

export default App;
