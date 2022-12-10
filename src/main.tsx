import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./main.css";
import { ContextProvider } from "./setup";
import { useEffect, useRef, useState } from "react";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import {
  AboutPage,
  ContactPage,
  ProjectPage,
  ProjectsPage,
  Success,
} from "./pages";
import Layout from "./setup/router/Layout";
import { HamburgerMenu } from "./components";

const Main = () => {
  const { pathname } = useLocation();

  const [showNavBtn, setShowNavBtn] = useState(false);

  const scrollContainerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container) return;

    const tailwindSMBreakpoint = 640;
    const isMobile = window.innerWidth < tailwindSMBreakpoint;

    isMobile
      ? setShowNavBtn(true)
      : container.addEventListener("scroll", (e) => {
          const scrolled = container.scrollTop;
          setShowNavBtn(scrolled > 400 ? true : false);
        });
  }, []);

  return (
    <main ref={scrollContainerRef} className="h-screen overflow-y-scroll">
      <HamburgerMenu showNavBtn={showNavBtn} setShowNavBtn={setShowNavBtn} />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="success" element={<Success />} />
        <Route element={<Layout />}>
          <Route path="projects">
            <Route index element={<ProjectsPage />} />
            <Route path=":projectName" element={<ProjectPage />} />
          </Route>
          <Route path="contact" element={<ContactPage />} />
          <Route path="about" element={<AboutPage />} />
        </Route>
      </Routes>
    </main>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);
