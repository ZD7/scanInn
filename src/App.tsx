import MainLayout from "./pages/main_layout";
import Search from "./pages/search";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login_page";
import Header from "./pages/common/header";
import Footer from "./pages/common/footer";

const App = () => {
  return (
    <AppWrapper>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />}></Route>
        <Route path="/search" element={<Search />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
      </Routes>
      <Footer />
    </AppWrapper>
  );
};

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1440px;
  justify-content: center;
`;

export default App;
