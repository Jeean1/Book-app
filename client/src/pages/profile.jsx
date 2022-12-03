import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup, Table } from "react-bootstrap";
import getConfig from "../utils/getConfig";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [reserves, setReserves] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/v1/users/getAllReserveBooks", getConfig())
      .then((res) => setReserves(res.data.reserves));
  }, []);

  const cleanLocalStorage = () => {
    swal("Session closed", "", "success");
    navigate("/");
    localStorage.clear();
  };

  return (
    <div className="profile_container">
      <div className="profile">
        <Card style={{ width: "18rem" }}>
          <Card.Img
            variant="top"
            src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
          />
          <Card.Body>
            <Card.Title>{user.name}</Card.Title>
            <Card.Text>
              Welcome to the book app, where you can see your books information
              and books reservers
            </Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Books actually reserved: {reserves?.data?.reserves ? reserves : 3}
            </ListGroup.Item>
            <ListGroup.Item>email: {user.email}</ListGroup.Item>
            <ListGroup.Item>role: {user.role}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            <Card.Link href="#">See books available</Card.Link>
            <br />
            <Button className="mt-3" type="buttom" onClick={cleanLocalStorage}>
              logg out
            </Button>
          </Card.Body>
        </Card>
      </div>

      <div className="list_book">
        <h3>Reserved books</h3>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Book 1</td>
              <td>Author 1</td>
              <td>Delete</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Book 2</td>
              <td>Author 2</td>
              <td>Delete</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Book 3</td>
              <td>Author 3</td>
              <td>Delete</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default Profile;
