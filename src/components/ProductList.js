import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'; // Íconos adicionales


function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: ''
  });
  const [errors, setErrors] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = (search = '') => {
    const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/products?name=${search}`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          setIsLoggedIn(false); // Actualizar el estado de autenticación a falso
          throw new Error('No está autenticado');
        } else {
          throw new Error('Error al buscar productos');
        }
      })
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  };
  
  const handleDelete = (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');
    
    if (confirmDelete) {
      const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
      fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
        .then(() => fetchProducts(searchTerm))
        .catch(error => console.error('Error deleting product:', error));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateProduct(formData);

    console.log(JSON.stringify(formData))

    if (Object.keys(validationErrors).length === 0) {
      const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
      const method = selectedProduct ? 'PUT' : 'POST';
      const url = selectedProduct ? `${process.env.REACT_APP_SERVER_URL}/api/v1/products/${selectedProduct.id}` : `${process.env.REACT_APP_SERVER_URL}/api/v1/products`;
  
      fetch(url, {
        method,
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(() => {
          handleClose();
          fetchProducts(searchTerm);
        })
        .catch(error => console.error('Error submitting product:', error));
    } else {
      setErrors(validationErrors);
    }
  };  

  const handleShow = (product = null) => {
    setSelectedProduct(product);
    setFormData(product || {
      name: '',
      description: '',
      price: '',
      stock: '',
      category: '',
      image_url: ''
    });
    setShowModal(true);
  };

  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const validateProduct = (data) => {
    const errors = {};
    if (!data.name) errors.name = 'El nombre es obligatorio.';
    if (!data.price || isNaN(data.price) || data.price <= 0) errors.price = 'El precio debe ser un número positivo.';
    if (!data.stock || isNaN(data.stock) || data.stock < 0) errors.stock = 'El stock debe ser un número no negativo.';
    return errors;
  };

  const handleSearch = () => {
    fetchProducts(searchTerm);
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <Alert variant="warning">No estás autenticado. Por favor, inicia sesión para ver los productos.</Alert>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Lista de Productos</h1>
      <div className="d-flex align-items-center mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Buscar productos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} className="me-2">
          <FontAwesomeIcon icon={faSearch} /> {/* Ícono de consultar */}
        </Button>
        <Button variant="success" onClick={() => handleShow()}>
          <FontAwesomeIcon icon={faPlusCircle} /> {/* Ícono de agregar */}
        </Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td className="text-right">{Number(product.price).toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <Button variant="info" onClick={() => handleShow(product)}>
                  <FontAwesomeIcon icon={faEdit} /> {/* Ícono de editar */}
                </Button>
                <Button variant="danger" onClick={() => handleDelete(product.id)} className="ms-2">
                  <FontAwesomeIcon icon={faTrashAlt} /> {/* Ícono de eliminar */}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? 'Editar Producto' : 'Agregar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                isInvalid={!!errors.price}
                className="text-right" 
              />
              <Form.Control.Feedback type="invalid">
                {errors.price}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                isInvalid={!!errors.stock}
              />
              <Form.Control.Feedback type="invalid">
                {errors.stock}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formImageUrl">
              <Form.Label>URL de Imagen</Form.Label>
              <Form.Control
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {selectedProduct ? 'Actualizar' : 'Agregar'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ProductList;
