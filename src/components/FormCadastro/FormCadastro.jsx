import { useFormik } from 'formik';
import { useState } from 'react';
import InputMask from 'react-input-mask';
import { Card } from '../Card/Card';
import styles from './FormCadastro.module.css'


export const FormCadastro = () => {

    const [listUsers, setListUsers] = useState([])
    const [id, setId] = useState(1)
    const [isEditing, setIsEditing] = useState(false)
    const [buttonTitle, setButtonTitle] = useState('Cadastrar')

    const validate = values => {
        const errors = {}

        // Validação do firstName
        if (!values.firstName) {
            errors.firstName = 'Campo obrigatório'
        } else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(values.firstName)) {
            errors.firstName = 'Permitido apenas letras neste campo.'
        }
        //Validação do sobrenome
        if (!values.lastName) {
            errors.lastName = 'Campo obrigatório'
        } else if (!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(values.lastName)) {
            errors.lastName = 'Permitido apenas letras neste campo.'
        }
        //Validação do e-mail
        if (!values.email) {
            errors.email = 'Campo obrigatório';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Email inválido';
        }
        if (!values.address) {
            errors.address = 'Campo obrigatório';
        }
        if (!values.phone) {
            errors.phone = 'Campo obrigatório';
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: ''
        },
        enableReinitialize: true,
        validate,
        onSubmit: values => {
            if (!isEditing) {
                setId(id + 1);
                values.id = id;
                setListUsers([...listUsers, values]);
                formik.resetForm();
            }
            else {
                let i = id - 1
                listUsers[i] = values
                let userEdited = listUsers[i]
                setListUsers([...listUsers.filter(user => user.id !== userEdited.id), userEdited].sort((a, b) => a - b))
                console.log(userEdited.id)
                formik.resetForm();
                setButtonTitle('Cadastrar')
                setIsEditing(false)
            }
        },
    })

    const editarUsuario = id => {
        setIsEditing(true)
        setButtonTitle('Salvar alterações')
        const usuario = listUsers.find(user => user.id === id)
        formik.setValues(usuario)
    }

    const excluirUsuario = id => {
        const usuariosFiltrados = listUsers.filter(user => user.id !== id)
        setListUsers(usuariosFiltrados)
    }

    return (
        <>
            <div className="container">
                <div className={styles.title}>
                    <h2>Cadastro</h2>
                </div>

                <form onSubmit={formik.handleSubmit} className={styles.formCadastro}>
                    <div>
                        <label htmlFor="firstName">Nome:</label>
                        <input
                            type="text"
                            name="firstName"
                            id="firstName"
                            maxLength="50"
                            placeholder="Ex: John"
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                        {formik.errors.firstName && (
                            <span>{formik.errors.firstName}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="lastName">Sobrenome:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            maxLength="50"
                            placeholder="Ex: Doe"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                        {formik.errors.lastName && (
                            <span>{formik.errors.lastName}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            maxLength="50"
                            placeholder="Ex: gg@gg.com"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        {formik.errors.email && (
                            <span>{formik.errors.email}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="address">Endereço:</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            maxLength="80"
                            placeholder="Ex: Rua dos Alfeneiros, Nº 4"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                        {formik.errors.address && (
                            <span>{formik.errors.address}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone:</label>
                        <InputMask
                            mask="99 99999 9999"

                            placeholder="Ex: 92 99999 9999"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            name="phone"
                            id="phone" />
                        {formik.errors.phone && (
                            <span>{formik.errors.phone}</span>
                        )}
                    </div>
                    <div>
                        <button type="submit">
                            {buttonTitle}
                        </button>
                    </div>
                </form>
            </div>
            
            <Card listUsers={listUsers} editarUsuario={editarUsuario} excluirUsuario={excluirUsuario}/>
        </>
    );
}

