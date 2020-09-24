import React, { useState } from 'react';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../index.jsx';

// create baseUrl for local testing of front end and Node js server
// if (process.env.url != null) {
//   var baseUrl = process.env.url;
// } else {
//   var baseUrl = 'vfa.herokuapp.com';
// }

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  /**
   * Function stores new user credentials in DB
   * @function handleSubmit
   * @param {e} onClick event
   * @returns {Promise<object>} response payload from POST request
   */

  const handleSubmit = (e) => {
    // prevents the default refresh after submit button has been clicked
    e.preventDefault();
    // console.log(username, password, birthday, email);

    /* Send a request to the server for authentication */
    axios
      .post(`${BASE_URL}/users`, {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        // console.log(data);
        window.open('/client', '_self');
      })
      .catch((e) => {
        let alert_errors = 'PLEASE CHECK THE FOLLOWING ERRORS \n\n';
        if (typeof e.response.data == 'string') {
          alert(`${alert_errors} ${e.response.data}`);
        } else {
          let error_obj = e.response.data.errors;
          // loop through errors and add them to the alert string
          for (let i = 0; i < error_obj.length; i++) {
            alert_errors += `${error_obj[i].msg} \n`;
          }
          //
          alert(alert_errors);
          console.log(e.response.data.errors);
        }
      });
  };

  return (
    <Container>
      <h1>Register an account</h1>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Birth Date:</Form.Label>
          <Form.Control
            type="string"
            value={birthday}
            placeholder="01/01/2001"
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Link to={`/`}>
          <Button
            variant="btn-lg btn-dark btn-block"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
