import styles from './Card.module.css'

export const Card = ({ listUsers, editarUsuario, excluirUsuario }) => {
    return (
        <>
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
                                <p>Endereço: {user.address}</p>
                                <p>Telefone: {user.phone}</p>
                            </div>
                            <div className={styles.flexColumn}>
                                <button onClick={() => editarUsuario(user.id)}>Editar</button>
                                <button onClick={() => excluirUsuario(user.id)}>Excluir</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    );
}