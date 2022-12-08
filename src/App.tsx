import { useEffect, useRef } from "react";
import { Route, Routes } from "react-router-dom";
import { initialRequest } from "./utils/movies";
import Login from "./Login";
import CreateAccount from "./CreateAccount";
import Main from "./Main";
import Header from "./Header";
import Footer from "./Footer";
import About from "./About";

function App() {
  const dialogAbout = useRef<any>(null);

  useEffect(() => {
    // first server approach
    initialRequest();

    closeDialog();
    openDialog();
  }, []);

  const openDialog = () => {
    dialogAbout.current.showModal();
  };

  const closeDialog = () => {
    dialogAbout.current.close();
  };

  return (
    <div>
      <dialog ref={dialogAbout}>
        <About closeDialog={closeDialog} />
      </dialog>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/createAccount" element={<CreateAccount />} />
        <Route path="/main/*" element={<Main />} />
      </Routes>
      <Footer openDialog={openDialog} />
    </div>
  );
}

export default App;
