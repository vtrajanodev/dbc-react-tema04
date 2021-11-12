import { useFormik } from 'formik';
import { useState } from 'react';
import styles from './FormCadastro.module.css'


export const FormCadastro = () => {

    const [listUsers, setListUsers] = useState([])
    const [id, setId] = useState(1)

    // const validate = values => {
    //     const errors = {}

    //     if (!values.email) {
    //         errors.email = 'Required';
    //     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //         errors.email = 'Invalid email address';
    //     }

    //     return errors
    // }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            address: '',
            phone: ''
        },

        onSubmit: values => {
            setId(id + 1);
            values.id = id;
            setListUsers([...listUsers, values]);
            formik.resetForm();
            console.log(values);
        }
    })

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
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Sobrenome:</label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.lastName}
                        />
                    </div>
                    <div>
                        <label htmlFor="email">E-mail:</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Endereço:</label>
                        <input
                            id="address"
                            name="address"
                            type="text"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone:</label>
                        <input
                            id="phone"
                            name="phone"
                            type="number"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                        />
                    </div>
                    <div>
                        <button type="submit">
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>

            <div className="container">
                <div className={styles.title}>
                    <h2>Lista de Usuários</h2>
                </div>

                <div className={styles.divCards}>
                    {listUsers.map((user, index) => (
                        <div key={index} className={styles.card}>
                            <div>
                                <h3>Nome: {user.firstName}</h3>
                                <h3>Sobrenome: {user.lastName}</h3>
                                <p>E-mail: {user.email}</p>
                                <p>Endereço: {user.addres}</p>
                                <p>Telefone: {user.phone}</p>
                            </div>
                            <div className={styles.flexColumn}>
                                <button>Editar</button>
                                <button>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

