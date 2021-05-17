import { useContext } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { UserContext } from "../../storage/Contexts";
import { Globe } from "react-bootstrap-icons";
import styles from "../../style/style";

const NavBar = () => {
  const { data, setData } = useContext(UserContext);

  const clearData = () => {
    setData("");
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Globe style={{ marginLeft: 5 }} />
      <Navbar.Brand style={{ marginLeft: 5 }}>IRCTC DAPP</Navbar.Brand>
      <Nav className="mr-auto" style={{ float: "right" }}>
        <Nav.Link href="/home">Home</Nav.Link>
        <Nav.Link href="/bookTickets">Book Tickets</Nav.Link>
        <Nav.Link href="/history">Booking History</Nav.Link>
        <Nav.Link href="/" onClick={clearData}>
          Log out
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
