import { useState } from "react";
import { FormCadastro } from "./components/FormCadastro/FormCadastro";

function App() {
    const [id, setId] = useState(0)
    return (
        <>
            <FormCadastro id={id} setId={setId}/>
        </>
    );
}

export default App;
