import React, { useEffect, useState } from 'react';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from '../../components/sidebar';
import { fetchCategories, removeCategory, setCategory } from '../../modules/categories/actions';
import { client } from '../../utils/api';
import styled from 'styled-components';

const ActionLink = styled.button`
    background: transparent;
    border: none;
    padding: 0;
`;

function Categories() {
    const [show, setShow] = useState(false);
    const [categoryId, setCategoryId] = useState(null);
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const { register, handleSubmit, errors, reset } = useForm();

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    async function submit(data) {
        let category;

        if (!categoryId) {
            category = await client('category', { method: 'POST', body: data });
        } else {
            category = await client(`category/${categoryId}`, { method: 'PATCH', body: data });
        }

        dispatch(setCategory(category));
        close();
    }

    function edit(category) {
        setCategoryId(category.id);
        reset(category);
        setShow(true);
    }

    function close() {
        setShow(false);
        reset({ name: '' });
    }

    async function destroy(categoryId) {
        await client(`category/${categoryId}`, { method: 'DELETE' });
        dispatch(removeCategory(categoryId));
    }

    return (
        <>
            <Row className="justify-content-center">
                <Col lg="7">
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 style={{ margin: 0 }}>Kategorie</h2>
                        <Button onClick={() => setShow(true)} variant="outline-primary">+ Nowa</Button>
                    </div>
                    <hr />

                    <ListGroup>
                        {Object.entries(categories).map(([_, category]) => (
                            <ListGroup.Item className="d-flex justify-content-between align-items-lg-center">
                                <div>
                                    {category.name}
                                </div>
                                <div style={{ fontSize: '0.775rem' }}>
                                    <ActionLink onClick={() => edit(category)} className="text-primary mr-2">edycja</ActionLink>
                                    <ActionLink onClick={() => destroy(category.id)} className="text-primary">usuń</ActionLink>
                                </div>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
            <Sidebar open={show} className="p-3 h-100 bg-white border-left">
                <Form onSubmit={handleSubmit(submit)}>
                    <Form.Group>
                        <Form.Label>Nazwa</Form.Label>
                        <Form.Control
                            tabIndex="1"
                            type="text"
                            name="name"
                            ref={register({ required: true })}
                            isInvalid={errors.name}
                        />
                    </Form.Group>
                    <Button variant="outline-primary" onClick={close}>Zamknij</Button>
                    <Button tabIndex="2" variant="primary" type="submit" className="float-right">
                        Zapisz
                    </Button>
                </Form>
            </Sidebar>
        </>
    );
}

export default Categories;
