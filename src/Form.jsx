import Button from 'react-bootstrap/Button';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form'
import styles from './Form.module.css'

function App() {
    const [Peso, setPeso] = useState(0);
    const [Altura, setAltura] = useState(0);
    const [Carregando, setCarregando] = useState(false);
    const [Resultado, setResultado] = useState(false);
    const IMC = Math.round(Peso / (Altura * Altura))

    const resultado = (() => {
        setCarregando(true)
        setTimeout(() => {
            setCarregando(false)
            setResultado(true)
        }, 3000)
    })

    const limpaResult = (() => {
        setResultado(false)
        document.location.reload(true);
    })

    const diagnostico = () => {
        if (IMC <= 24) return ('Peso Ideal')
        else if (IMC <= 29) return ('Sobrepeso')
        else if (IMC <= 34) return ('Obesidade Grau I')
        else if (IMC <= 39) return ('Obesidade Grau II')
        else if (IMC >= 40) return ('Obesidade Grau III')
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <img className={styles.logo} src="./src/Img/1.png" alt="" />
                <h1>Calculadora de IMC</h1>
            </div>
            <Form preventDefault className={styles.form}>
                <Form.Group className="mb-3">
                    <Form.Label>Seu Peso</Form.Label>
                    <Form.Control id="peso" required onChange={evento => setPeso(evento.target.value)} type="number" placeholder="Ex.: 74" />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Sua Altura</Form.Label>
                    <Form.Control id="altura" onBlur={evento => resultado()} required onChange={evento => setAltura(evento.target.value)} type="text" placeholder="Ex.: 1.70" />
                </Form.Group>
            </Form>

            {Carregando ? (
                <h5 className={styles.container}> Estamos calculando seu resultado...</h5>
            ) : (<></>)}
            {Resultado ? (
                <div className={styles.resultado}>
                    <Button type='submit' onClick={evento => limpaResult()} className={styles.button}>Refazer Teste</Button>
                    <h3>Resultado</h3>
                    <h6>Seu IMC é de <span className={styles.valorIMC}>{IMC}</span>, o que de acordo com a tabela é considerado <span className={styles.valorIMC}> {diagnostico()}</span></h6>
                    <img src="./src/Img/tabela.jpg" alt="" />
                </div>
            ) : (<></>)}
        </div >
    )
}


export default App