import React from 'react'
import { Table, Button, Badge, Form, Modal } from "react-bootstrap"

class Registros extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            email: '',
            registers: [],
            showModal: false
        }
    }

    componentDidMount() {
        this.getRegister();
    }

    componentWillUnmount() {

    }

    getRegister = () => {
        fetch("http://localhost:3030/tasks")
            .then(response => response.json())
            .then(data => {
                this.setState({ registers: data })
            })
    }

    catchRegister = (id) => {
        fetch(`http://localhost:3030/tasks/${id}`, { method: 'GET' })
            .then(response => response.json())
            .then(register => {
                console.log(register)
                this.setState({
                    id: register.id,
                    name: register.name,
                    email: register.email
                })
                this.handleOpen();
            })
    }

    addRegister = (register) => {
        fetch(`http://localhost:3030/tasks`,
            {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(register)
            })
            .then(response => {
                if (response.ok) {
                    alert('Aluno adicionado com sucesso!');
                    this.getRegister();
                }
                else {
                    alert('Não foi possível adicionar o aluno!');
                    this.getRegister();
                }
            })
    }

    patchRegister = (register) => {
        fetch(`http://localhost:3030/tasks`,
            {
                method: 'PATCH',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(register)
            })
            .then(response => {
                if (response.ok) {
                    alert('Cadastro editado com sucesso!');
                    this.getRegister();
                }
                else {
                    alert('Não foi possível editar cadastro!');
                    this.getRegister();
                }
            })
    }

    deleteRegister = (id) => {
        fetch(`http://localhost:3030/tasks/${id}`, { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    alert('Aluno deletado com sucesso!');
                    this.getRegister();
                }
            })
    }


    updateName = (e) => {
        this.setState(
            {
                name: e.target.value
            }
        )
    }

    updateEmail = (e) => {
        this.setState(
            {
                email: e.target.value
            }
        )
    }

    submit = () => {

        // eslint-disable-next-line eqeqeq
        if (this.state.id == 0) {
            const register = {
                name: this.state.name,
                email: this.state.email
            }
            this.addRegister(register);
        } else {
            const register = {
                id: this.state.id,
                name: this.state.name,
                email: this.state.email
            }
            this.patchRegister(register);
            console.log(register);
        }
        this.handleClose();
    }

    reset = () => {
        this.setState(
            {
                id: 0,
                name: '',
                email: ''
            }
        )
        this.handleOpen();
    }

    handleClose = () => {
        this.setState(
            {
                showModal: false
            }
        )
    }

    handleOpen = () => {
        this.setState(
            {
                showModal: true
            }
        )
    }

    renderTable() {
        return (
            <div>
                <Table striped bordered hover>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Status</th>
                        <th>Opções</th>
                    </tr>
                    <tbody>

                        {
                            this.state.registers.map((register) =>
                                <tr>
                                    <td>{register.name}</td>
                                    <td>{register.email}</td>
                                    <td><Badge bg="success">{register.status}</Badge></td>
                                    <td><Button variant="outline-warning" onClick={() => this.catchRegister(register.id)}>Editar</Button>{'  '}
                                        <Button variant="outline-danger" onClick={() => this.deleteRegister(register.id)}>Excluir</Button></td>
                                </tr>
                            )
                        }

                    </tbody>
                </Table>
            </div>
        )
    };


    render() {
        return (
            <div>

                <Modal show={this.state.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cadastro do Aluno</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Label>ID</Form.Label>
                                <Form.Control type="text" value={this.state.id} readOnly={true} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Enter name" value={this.state.name} onChange={this.updateName} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.updateEmail} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.submit}>
                            Salvar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Button variant="primary" type="submit" onClick={this.reset}>
                    Cadastrar aluno
                </Button>

                {this.renderTable()}

            </div>
        )
    };

}

export default Registros;