import { useEffect, useState } from "react"
import axios from 'axios'

export default function Cadastro() {
    const [list, setList] = useState([])
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")

    useEffect(() => {
        getUsers()
    }, [])

    const handleRegister = async () => {
        if (senha == confirmarSenha) {
            await axios.post('http://localhost:3000/inserir', { nome, email, senha })
            console.log("Cadastrado!")
            await getUsers()
        }
        else { console.log("erro") }

    }

    const handleDelete = async (id) =>{
     await axios.delete(`http://localhost:3000/deletar/id/${id}`)
     console.log("Deletado")
     await getUsers()
    }

    const getUsers = async () => {
        const response = await axios.get('http://localhost:3000/users')
        setList(response.data)
        console.log(response.data)
    }

    const ArrayDataItems = ({ items }) => {

        return items.map((user, index) =>
            <>
                <tr key={index}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <button onClick={() => handleDelete(user.id)}>DELETAR</button>
                </tr>
            </>
        )
    }


    return (<>
        <div className="cadastro">
            <input onChange={(e) => setNome(e.target.value)} type="nome" id="nome" placeholder="Nome de usuário" required></input>
            <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="E-mail" required></input>
            <input onChange={(e) => setSenha(e.target.value)} type="senha" id="senha" placeholder="Senha" required></input>
            <input onChange={(e) => setConfirmarSenha(e.target.value)} type="senha" id="senha" placeholder="confirmar senha" required></input>
            <button type="button" onClick={handleRegister}>confirmar cadastro</button>

        </div>

        <table>
            <tr>
                <th></th>
               
            </tr>
            <tr>
                <ArrayDataItems items={list} />
            </tr>

        </table>
    </>
    )
}