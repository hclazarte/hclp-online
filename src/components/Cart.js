import React, { useState, useEffect } from 'react';
import { Button, Table, Modal, ListGroup, Form, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faPlusCircle, faEye } from '@fortawesome/free-solid-svg-icons'; // Íconos para el carrito

function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]); // Lista de pedidos
  const [selectedOrder, setSelectedOrder] = useState(null); // Pedido seleccionado para el modal
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false); // Controla el modal de detalles del pedido
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [profile, setProfile] = useState(null);
  const [checkoutData, setCheckoutData] = useState({
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
  });

  useEffect(() => {
    fetchProducts();
    fetchOrders(); // Cargar los pedidos
    fetchProfile();
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);
  }, []);

  // Función para obtener la lista de productos
  const fetchProducts = (search = '') => {
    const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/products?search=${search}`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          setIsLoggedIn(false);
          throw new Error('No está autenticado');
        } else {
          throw new Error('Error al buscar productos');
        }
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching products:', error));
  };

  // Función para obtener los pedidos del usuario
  const fetchOrders = () => {
    const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/my_orders`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error('Error fetching orders:', error));
  };

  // Función para obtener el perfil del usuario logueado
  const fetchProfile = () => {
    const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/me`, {
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProfile(data);
        setCheckoutData({
          fullName: data.full_name || '',
          address: '',
          city: '',
          state: '',
          postalCode: '',
        });
      })
      .catch((error) => console.error('Error fetching profile:', error));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if (exist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setShowProductModal(false);
  };

  const decreaseQty = (productId) => {
    setCart((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.qty === 1) return acc;
          return [...acc, { ...item, qty: item.qty - 1 }];
        }
        return [...acc, item];
      }, [])
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.qty, 0).toFixed(2);
  };

  const handleCheckoutChange = (e) => {
    const { name, value } = e.target;
    setCheckoutData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();

    const token = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*=\s*([^;]*).*$)|^.*$/, "$1")}`;
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/v1/my_orders`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order: {
          profile_id: profile.id,
          status: 'pending',
          total: calculateTotal(),
          order_items_attributes: cart.map((item) => ({
            product_id: item.id,
            quantity: item.qty,
            price: item.price,
          }))
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Pedido creado:', data);
        setShowCheckoutModal(false); // Cerrar modal después del pago
        setCart([]); // Limpiar el carrito
        fetchOrders(); // Actualizar la lista de pedidos
      })
      .catch((error) => console.error('Error al crear el pedido:', error));
  };

  // Función para abrir el modal con el detalle del pedido
  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
    setShowOrderDetailsModal(true);
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <Alert variant="warning">No estás autenticado. Por favor, inicia sesión para hacer compras.</Alert>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Carrito de Compras</h3>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>${item.price}</td>
                <td>${(item.price * item.qty).toFixed(2)}</td>
                <td>
                  <Button variant="warning" onClick={() => decreaseQty(item.id)}>
                    -
                  </Button>{' '}
                  <Button variant="success" onClick={() => addToCart(item)}>
                    +
                  </Button>{' '}
                  <Button variant="danger" onClick={() => removeFromCart(item.id)}>
                    --
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h4>Total: ${calculateTotal()}</h4>

      {/* Mostrar botones incluso si el carrito está vacío */}
      <div className="mt-3">
        <Button variant="primary" onClick={() => setShowCheckoutModal(true)} disabled={cart.length === 0}>
          <FontAwesomeIcon icon={faCreditCard} /> {/* Ícono de realizar pago */}
              {' '}Realizar Pago
        </Button>
        <Button variant="primary" className="ms-2" onClick={() => setShowProductModal(true)}>
          <FontAwesomeIcon icon={faPlusCircle} /> {/* Ícono de añadir productos */}
              {' '}Añadir Productos
        </Button>
      </div>

      {/* Tabla de pedidos */}
      <h4 className="mt-4">Pedidos Recientes</h4>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Pedido</th>
            <th>Estado</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No hay pedidos recientes</td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.status}</td>
                <td>${order.total}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>
                  <Button variant="info" onClick={() => handleViewOrderDetails(order)}>
                    <FontAwesomeIcon icon={faEye} /> {/* Ícono de ver detalles */}
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Modal para mostrar la lista de productos */}
      <Modal show={showProductModal} onHide={() => setShowProductModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Lista de Productos Disponibles</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup>
            {products.length === 0 ? (
              <p>No hay productos disponibles</p>
            ) : (
              products.map((product) => (
                <ListGroup.Item
                  key={product.id}
                  action
                  onClick={() => addToCart(product)}
                >
                  {product.name} - ${product.price}
                </ListGroup.Item>
              ))
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowProductModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para mostrar los detalles del pedido */}
      <Modal show={showOrderDetailsModal} onHide={() => setShowOrderDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder ? (
            <div>
              <p><strong>ID Pedido:</strong> {selectedOrder.id}</p>
              <p><strong>Estado:</strong> {selectedOrder.status}</p>
              <p><strong>Total:</strong> ${selectedOrder.total}</p>
              <p><strong>Fecha:</strong> {new Date(selectedOrder.date).toLocaleDateString()}</p>
              <h5>Productos en el Pedido:</h5>
              <ListGroup>
                {selectedOrder.order_items.map((item) => (
                  <ListGroup.Item key={item.id}>
                    Producto ID: {item.product_id}, Cantidad: {item.quantity}, Precio: ${item.price}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : (
            <p>No se ha seleccionado ningún pedido.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowOrderDetailsModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para realizar el pago (Checkout) */}
      <Modal show={showCheckoutModal} onHide={() => setShowCheckoutModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Realizar Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCheckoutSubmit}>
            <Form.Group controlId="formFullName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control
                type="text"
                name="fullName"
                value={checkoutData.fullName}
                onChange={handleCheckoutChange}
                placeholder="Nombre Completo"
              />
            </Form.Group>
            <Form.Group controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={checkoutData.address}
                onChange={handleCheckoutChange}
                placeholder="Dirección"
              />
            </Form.Group>
            <Form.Group controlId="formCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={checkoutData.city}
                onChange={handleCheckoutChange}
                placeholder="Ciudad"
              />
            </Form.Group>
            <Form.Group controlId="formState">
              <Form.Label>Estado/Provincia</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={checkoutData.state}
                onChange={handleCheckoutChange}
                placeholder="Estado/Provincia"
              />
            </Form.Group>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Código Postal</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                value={checkoutData.postalCode}
                onChange={handleCheckoutChange}
                placeholder="Código Postal"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Pagar
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCheckoutModal(false)}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Cart;
