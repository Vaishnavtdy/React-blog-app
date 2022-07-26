import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";

function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav navbar-inverse navbar-static-top" />
        <Navbar.Brand as={Link} to="/">
          BlogApp
        </Navbar.Brand>
        <Navbar.Collapse id="responsive-navbar-nav navbar-inverse navbar-static-top">
          {isLoggedIn && <Nav className="ms-5 me-auto">
            <Nav.Link as={Link} to="/">
              All Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/myblogs">
              My Blogs
            </Nav.Link>
            <Nav.Link as={Link} to="/addblogs">
              Add Blog
            </Nav.Link>
          </Nav>}
        </Navbar.Collapse>
        {!isLoggedIn ? (
          <Button onClick={() => navigate("/login")} variant="success me-2">
            Login
          </Button>
        ) : (
          <Button
            LinkComponent={Link}
            to="/auth"
            onClick={handleLogout}
            variant="danger ms-2"
          >
            Logout
          </Button>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
