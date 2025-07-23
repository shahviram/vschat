import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { api } from '../../Service/ApiCalls';
import withAuth from '../../utils/withAuth';
import Navigation from '../Common/Navigation';
import './ManageDocuments.css';

const ManageDocuments = () => {
    const [myDocuments, setMyDocuments] = useState([]);
    const [sharedDocuments, setSharedDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [uploading, setUploading] = useState(false);

    const fetchDocuments = async () => {
        try {
            const [myDocs, sharedDocs] = await Promise.all([
                api.getMyDocuments(),
                api.getSharedDocuments()
            ]);
            setMyDocuments(myDocs);
            setSharedDocuments(sharedDocs);
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to load documents',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    const fetchUsers = async () => {
        try {
            const users = await api.getAllUsers();
            setAllUsers(users);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    useEffect(() => {
        fetchDocuments();
        fetchUsers();
    }, []);

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const allowedTypes = [
            'text/plain',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];

        if (!allowedTypes.includes(file.type)) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Invalid file type. Please upload Text, Excel, PDF, Word, or PPT files only.',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
            return;
        }

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            await api.uploadDocument(formData);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Document uploaded successfully',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            await fetchDocuments();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to upload document',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        } finally {
            setUploading(false);
        }
    };

    const handleDownload = async (document) => {
        try {
            const response = await api.downloadDocument(document.id);
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', document.name);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to download document',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    const handleShare = async () => {
        try {
            await api.shareDocument(selectedDocument.id, selectedUsers);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Document shared successfully',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            setShowShareModal(false);
            setSelectedUsers([]);
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to share document',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    const handleDelete = async () => {
        try {
            await api.deleteDocument(selectedDocument.id);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Document deleted successfully',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            setShowDeleteModal(false);
            await fetchDocuments();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to delete document',
                    type: 'error'
                }
            });
            window.dispatchEvent(event);
        }
    };

    const handleRemoveSharing = async (documentId) => {
        try {
            await api.removeSharing(documentId);
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Document removed from shared list',
                    type: 'success'
                }
            });
            window.dispatchEvent(event);
            await fetchDocuments();
        } catch (error) {
            const event = new CustomEvent('showNotification', {
                detail: {
                    message: 'Failed to remove document from shared list',
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
                <h2 className="text-center mb-4">Manage Documents</h2>

                {/* Upload Section */}
                <section className="upload-section mb-4">
                    <h3>Upload Document</h3>
                    <p className="text-muted">Supported formats: Text, Excel, PDF, Word, PPT</p>
                    <Form.Group>
                        <Form.Control
                            type="file"
                            accept=".txt,.xls,.xlsx,.pdf,.doc,.docx,.ppt,.pptx"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </Form.Group>
                </section>

                {/* My Documents Section */}
                <section className="my-documents-section mb-4">
                    <h3>My Uploaded Documents</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Upload Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myDocuments.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.name}</td>
                                    <td>{doc.type}</td>
                                    <td>{new Date(doc.uploadDate).toLocaleDateString()}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleDownload(doc)}
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            variant="info"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => {
                                                setSelectedDocument(doc);
                                                setShowShareModal(true);
                                            }}
                                        >
                                            Share
                                        </Button>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={() => {
                                                setSelectedDocument(doc);
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
                </section>

                {/* Shared Documents Section */}
                <section className="shared-documents-section">
                    <h3>Shared Documents</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Shared By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sharedDocuments.map((doc) => (
                                <tr key={doc.id}>
                                    <td>{doc.name}</td>
                                    <td>{doc.type}</td>
                                    <td>{doc.sharedBy}</td>
                                    <td>
                                        <Button
                                            variant="primary"
                                            size="sm"
                                            className="me-2"
                                            onClick={() => handleDownload(doc)}
                                        >
                                            Download
                                        </Button>
                                        <Button
                                            variant="warning"
                                            size="sm"
                                            onClick={() => handleRemoveSharing(doc.id)}
                                        >
                                            Remove
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </section>

                {/* Share Modal */}
                <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Share Document</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Select Users to Share With</Form.Label>
                            <Form.Control
                                as="select"
                                multiple
                                value={selectedUsers}
                                onChange={(e) => setSelectedUsers(
                                    Array.from(e.target.selectedOptions, option => option.value)
                                )}
                            >
                                {allUsers.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {`${user.firstname} ${user.lastname} (${user.emailId})`}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowShareModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleShare}>
                            Share
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this document?
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

export default withAuth(ManageDocuments);
