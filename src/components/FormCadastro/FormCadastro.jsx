import { useFormik } from 'formik';
import { useState } from 'react';
import styles from './FormCadastro.module.css'


export const FormCadastro = () => {

    const [listUsers, setListUsers] = useState([])
    const [id, setId] = useState(1)

    const validate = values => {
        const errors = {}

        //Validação do firstName
        if(!values.firstName){
            errors.firstName = 'Campo obrigatório'
        }else if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(values.firstName)){
            errors.firstName = 'Permitido apenas letras neste campo.'
        }
        //Validação do sobrenome
        if(!values.lastName){
            errors.lastName = 'Campo obrigatório'
        }else if(!/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/.test(values.lastName)){
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
        validate,
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
                            placeholder="Ex: Rua dos Alfeneiros, Nº 4, Harry Potter."
                            onChange={formik.handleChange}
                            value={formik.values.address}
                        />
                        {formik.errors.address && (
                            <span>{formik.errors.address}</span>
                        )}
                    </div>
                    <div>
                        <label htmlFor="phone">Telefone:</label>
                        <input
                            id="phone"
                            name="phone"
                            placeholder="Ex: 92 9999-9999"
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

