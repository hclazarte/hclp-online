import React, { useEffect, useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Profile() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Para manejar el estado de autenticación
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga
  const [error, setError] = useState(''); // Para manejar errores de fetch

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`
        console.log(token)
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/me`, {
          method: 'GET',
          headers: {
            'Authorization': `${token}`, // Incluir el token en el encabezado Authorization
            'Content-Type': 'application/json',
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFormData({
            fullName: data.full_name || '',
            email: data.email || '',
            phone: data.phone || '',
            address: data.address || '',
            city: data.city || '',
            state: data.state || '',
            postalCode: data.postal_code || '',
            newPassword: '',
            confirmPassword: '',
          });
        } else if (response.status === 401) {
          setIsLoggedIn(false); // Usuario no autenticado
        } else {
          setError('Hubo un error al cargar los datos del perfil.'); // Otro error
        }
      } catch (err) {
        setError('Hubo un problema de conexión.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    const nameRegex = /^[a-zA-ZáéíóúñÁÉÍÓÚÑ\s]+$/;

    if (!formData.fullName || formData.fullName.length < 6 || !nameRegex.test(formData.fullName)) {
      errors.fullName = 'El nombre completo es obligatorio, debe tener al menos 6 caracteres y solo contener letras y espacios.';
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El correo electrónico es obligatorio y debe ser válido.';
    }
    if (formData.phone && !/^\+?\d*$/.test(formData.phone)) {
      errors.phone = 'El teléfono debe ser un número válido.';
    }
    if (!formData.city || !nameRegex.test(formData.city)) {
      errors.city = 'La ciudad es obligatoria y debe contener solo letras y espacios.';
    }
    if (!formData.state || !nameRegex.test(formData.state)) {
      errors.state = 'El estado/provincia es obligatorio y debe contener solo letras y espacios.';
    }
    if (formData.newPassword.length < 6) {
      errors.newPassword = 'La nueva contraseña debe tener al menos 6 caracteres.';
    }
    if (formData.newPassword !== formData.confirmPassword) {
      errors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Manejar el envío del formulario
      console.log('Formulario enviado', formData);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se obtienen los datos
  }

  if (!isLoggedIn) {
    return <Alert variant="warning">No estás autenticado. Por favor, inicia sesión para ver tu perfil.</Alert>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>; // Mostrar un mensaje de error si ocurrió un problema
  }

  return (
    <div className="container">
      <h1>Perfil de Usuario</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFullName">
          <Form.Label>Nombre Completo</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Juan Pérez"
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.fullName}
          </Form.Control.Feedback>
        </Form.Group>

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
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPhone">
          <Form.Label>Teléfono</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1234567890"
            isInvalid={!!errors.phone}
          />
          <Form.Control.Feedback type="invalid">
            {errors.phone}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formAddress">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            as="textarea"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Calle Falsa 123, Ciudad, País"
          />
        </Form.Group>

        <Form.Group controlId="formCity">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Ciudad de Bolivia"
            isInvalid={!!errors.city}
          />
          <Form.Control.Feedback type="invalid">
            {errors.city}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formState">
          <Form.Label>Estado/Provincia</Form.Label>
          <Form.Control
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Pando"
            isInvalid={!!errors.state}
          />
          <Form.Control.Feedback type="invalid">
            {errors.state}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formPostalCode">
          <Form.Label>Código Postal</Form.Label>
          <Form.Control
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="12345"
          />
        </Form.Group>

        <Form.Group controlId="formNewPassword">
          <Form.Label>Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="******"
            isInvalid={!!errors.newPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.newPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirmar Nueva Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="******"
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">
            {errors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Guardar Cambios
        </Button>
      </Form>
    </div>
  );
}

export default Profile;
