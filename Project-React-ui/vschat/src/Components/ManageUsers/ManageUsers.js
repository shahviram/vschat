import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { api } from '../../Service/ApiCalls';
import withAuth from '../../utils/withAuth';
import Navigation from '../Common/Navigation';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [editForm, setEditForm] = useState({
        firstname: '',
        lastname: '',
        emailId: ''
    });

    const fetchUsers = async () => {
        try {
            const resp = await api.getAllUsers();
            setUsers(resp.data);
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to load users',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditForm({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        setShowEditModal(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.updateUser(selectedUser.id, editForm);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'User updated successfully',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            setShowEditModal(false);
            await fetchUsers();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to update user',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    const handleDelete = async () => {
        try {
            await api.deleteUser(selectedUser.id);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'User deleted successfully',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            setShowDeleteModal(false);
            await fetchUsers();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to delete user',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    return (
        <>
            <Navigation />
            <Container className="mt-4">
                <h2 className="text-center mb-4">Manage Users</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <Button
                                        variant="info"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowViewModal(true);
                                        }}
                                    >
                                        View
                                    </Button>
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => {
                                            setSelectedUser(user);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* View Modal */}
                <Modal show={showViewModal} onHide={() => setShowViewModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>User Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedUser && (
                            <div>
                                <p><strong>First Name:</strong> {selectedUser.firstName}</p>
                                <p><strong>Last Name:</strong> {selectedUser.lastName}</p>
                                <p><strong>Email:</strong> {selectedUser.email}</p>
                            </div>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleEditSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editForm.firstName}
                                    onChange={(e) => setEditForm({
                                        ...editForm,
                                        firstName: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editForm.lastName}
                                    onChange={(e) => setEditForm({
                                        ...editForm,
                                        lastName: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={editForm.email}
                                    onChange={(e) => setEditForm({
                                        ...editForm,
                                        email: e.target.value
                                    })}
                                    required
                                />
                            </Form.Group>
                            <Button type="submit" variant="primary">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this user?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>
    );
};

export default withAuth(ManageUsers);
