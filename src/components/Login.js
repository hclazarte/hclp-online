import React, { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert, Spinner } from 'react-bootstrap';
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [createUserForm, setCreateUserForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postal_code: '',
    password: '',
    password_confirmation: '',
  });
  const [createUserErrors, setCreateUserErrors] = useState({}); // Errores del formulario de crear usuario
  const [createUserLoading, setCreateUserLoading] = useState(false);

  // Cargar datos del perfil si está logueado
  useEffect(() => {
    const token = Cookies.get('access_token');
    if (token) {
      setIsLoggedIn(true);
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserName(data.full_name);
        })
        .catch((error) => {
          console.error('Error al obtener el perfil del usuario:', error);
        });
    }
  }, []);

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
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/oauth/token`, {
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
            scopes: 'write',
          }),
        });

        const data = await response.json();

        if (response.ok) {
          Cookies.set('access_token', data.access_token, { expires: 1 });
          setIsLoggedIn(true);
          setUserName(data.user.full_name);
          window.location.href = '/';
        } else {
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

  const handleLogout = () => {
    Cookies.remove('access_token');
    setIsLoggedIn(false);
    setUserName('');
    window.location.href = '/';
  };

  const handleShowCreateUser = () => {
    setShowCreateUserModal(true);
  };

  const handleCloseCreateUser = () => {
    setShowCreateUserModal(false);
  };

  const handleCreateUserChange = (e) => {
    const { name, value } = e.target;
    setCreateUserForm({ ...createUserForm, [name]: value });
    setCreateUserErrors({ ...createUserErrors, [name]: '' });
  };

  const validateCreateUser = () => {
    const errors = {};
    if (!createUserForm.full_name) errors.full_name = 'El nombre es obligatorio.';
    if (!createUserForm.email || !/\S+@\S+\.\S+/.test(createUserForm.email)) {
      errors.email = 'El correo electrónico es obligatorio y debe ser válido.';
    }
    if (!createUserForm.password || createUserForm.password.length < 6) {
      errors.password = 'La contraseña es obligatoria y debe tener al menos 6 caracteres.';
    }
    if (createUserForm.password !== createUserForm.password_confirmation) {
      errors.password_confirmation = 'Las contraseñas no coinciden.';
    }
    setCreateUserErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateUserSubmit = async (e) => {
    e.preventDefault();
    if (validateCreateUser()) {
      setCreateUserLoading(true);
      
      console.log(JSON.stringify({
        profile: createUserForm,
      }))

      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/profiles`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            profile: createUserForm,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setShowCreateUserModal(false); // Cerrar el modal
          setFormData({ email: createUserForm.email, password: '' }); // Rellenar el campo de email en el login
          setApiError(''); // Limpiar errores previos
        } else {
          setApiError('Error al crear el usuario.');
        }
      } catch (error) {
        console.error('Error al crear el usuario:', error);
        setApiError('Ocurrió un error al conectar con el servidor. Por favor, intenta más tarde.');
      } finally {
        setCreateUserLoading(false);
      }
    }
  };

  return (
    <div className="container centered-content">
      {isLoggedIn ? (
        <div className="col-md-6 offset-md-3 text-center">
          <h1>Bienvenido, {userName}</h1>
          <Button variant="danger" onClick={handleLogout} className="mt-3">
            Cerrar Sesión
          </Button>
        </div>
      ) : (
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

          <Button variant="link" onClick={handleShowCreateUser} className="mt-3">
            Crear Usuario
          </Button>
        </div>
      )}

      {/* Modal para crear un nuevo usuario */}
      <Modal show={showCreateUserModal} onHide={handleCloseCreateUser}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateUserSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={createUserForm.full_name}
                onChange={handleCreateUserChange}
                isInvalid={!!createUserErrors.full_name}
              />
              <Form.Control.Feedback type="invalid">
                {createUserErrors.full_name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={createUserForm.email}
                onChange={handleCreateUserChange}
                isInvalid={!!createUserErrors.email}
              />
              <Form.Control.Feedback type="invalid">
                {createUserErrors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={createUserForm.phone}
                onChange={handleCreateUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={createUserForm.address}
                onChange={handleCreateUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={createUserForm.city}
                onChange={handleCreateUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formState">
              <Form.Label>Estado/Provincia</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={createUserForm.state}
                onChange={handleCreateUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formPostalCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="postal_code"
                value={createUserForm.postal_code}
                onChange={handleCreateUserChange}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={createUserForm.password}
                onChange={handleCreateUserChange}
                isInvalid={!!createUserErrors.password}
              />
              <Form.Control.Feedback type="invalid">
                {createUserErrors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPasswordConfirmation">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                value={createUserForm.password_confirmation}
                onChange={handleCreateUserChange}
                isInvalid={!!createUserErrors.password_confirmation}
              />
              <Form.Control.Feedback type="invalid">
                {createUserErrors.password_confirmation}
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" disabled={createUserLoading}>
              {createUserLoading ? <Spinner animation="border" size="sm" /> : 'Crear Usuario'}
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateUser}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Login;
