import React, { useState, useEffect } from 'react'
import { Table, Button, Badge, Form } from "react-bootstrap"


const Cadastros = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [register, setRegister] = useState([]);

    // GET with fetch API
    useEffect(() => {
        const fetchRegister = async () => {
            const response = await fetch(
                'http://localhost:3030/tasks'
            );
            const data = await response.json();
            console.log(data);
            setRegister(data);
        };
        fetchRegister();
    }, []);

    // Post with fetchAPI
    const addRegister = async (title, body) => {
        let response = await fetch('http://localhost:3030/tasks', {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                userId: Math.random().toString(36).slice(2),
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        let data = await response.json();
        setRegister((register) => [data, ...register]);
        setName('');
        setEmail('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addRegister(name, email);
    };

    // Delete with fetchAPI
    const deleteRegister = async (id) => {
        let response = await fetch(
            `http://localhost:3030/tasks/${id}`,
            {
                method: 'DELETE',
            }
        );
        if (response.status === 200) {
            setRegister(
                register.filter((aluno) => {
                    return aluno.id !== id;
                })
            );
        } else {
            return;
        }
    };


    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Enter name" value ={name} onChange={(e) => setName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value ={email} onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">Adicionar aluno</Button>
            </Form>

            <Table striped bordered hover>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Status</th>
                    <th>Opções</th>
                </tr>
                <tbody>

                    {
                        register.map((aluno) =>
                            <tr>
                                <td>{aluno.name}</td>
                                <td>{aluno.email}</td>
                                <td><Badge bg="success">{aluno.status}</Badge></td>
                                <td><Button variant="outline-warning">Editar</Button>{'  '}
                                    <Button variant="outline-danger" onClick={() => deleteRegister(aluno.id)}>Excluir</Button></td>
                            </tr>
                        )
                    }

                </tbody>
            </Table>
        </div>
    )
};



export default Cadastros;