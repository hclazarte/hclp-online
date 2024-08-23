import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import Cookies from 'js-cookie';
import config from '../config'; // Asegúrate de que la ruta sea correcta
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
    setApiError('');
  };

  const validate = () => {
    const errors = {};

    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico es obligatorio y debe ser válido.';
    }
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'La contraseña es obligatoria y debe tener al menos 6 caracteres.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        const response = await fetch(`${config.serverUrl}/oauth/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            grant_type: 'password',
            username: formData.email,
            password: formData.password,
            client_id: config.clientId,
            client_secret: config.clientSecret,
            scopes: 'wrie',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          // Guardar el token en una cookie
          Cookies.set('access_token', data.access_token, { expires: 1 }); // La cookie expirará en 1 día
          // Redireccionar o realizar otras acciones necesarias
          console.log('Inicio de sesión exitoso');
          // Ejemplo: redireccionar a la página principal
          window.location.href = '/';
        } else {
          // Manejar errores de autenticación
          setApiError(data.error_description || 'Credenciales inválidas. Por favor, intenta de nuevo.');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
        setApiError('Ocurrió un error al conectar con el servidor. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container centered-content">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Iniciar Sesión</h1>
        {apiError && <Alert variant="danger">{apiError}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formEmail">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="juan.perez@example.com"
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="******"
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Iniciar Sesión'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
