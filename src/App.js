import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router , Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

import EditProduct from "./components/product/edit.component";
import ProductList from "./components/product/list.component";
import CreateProduct from "./components/product/create.component";
import Login from "./components/auth/login.component";
import SignUp from "./components/auth/signup.component";
import NavBar from "./components/layout/navbar.component";

import { Provider } from "react-redux";
import store from "./store";

const PageContent = (
  <Routes>
    <Route path="/product/create" element={<CreateProduct />} />
    <Route path="/product/edit/:id" element={<EditProduct />} />
    <Route exact path='/' element={<ProductList />} />
  </Routes>
);

const Auth = (
  <Routes>
    <Route exact path='/' element={<Login/>} />
    <Route path="/sign-in" element={<Login/>} />
    <Route path="/sign-up" element={<SignUp/>} />
  </Routes>
);

function App() {

  return (
  <Provider store={store}>
    <Router>
      <NavBar />

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            {localStorage.getItem("token")? (
              PageContent
            ):
            (
              Auth
            )
            }

          </Col>
        </Row>
      </Container>
    </Router>
  </Provider>
  );
}

export default App;