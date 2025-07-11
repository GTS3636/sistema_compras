
async function listarUsuarios() {
    let res = document.getElementById("res")
    res.innerHTML = ``

    listarUsuarios.textContent = "Carregando..."
    listarUsuarios.disabled = true

    await fetch("http://localhost:3000/usuario")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar usuários")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhum usuário cadastrado.</p>`
            } else {
                res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD</th>
                                        <th>Nome</th>
                                        <th>Idade</th>
                                        <th>Email</th>
                                        <th>Telefone</th>
                                        <th>Endereço</th>
                                        <th>Cidade</th>
                                        <th>Estado</th>
                                        <th>Data de nascimento</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyUsuarios">
                                    
                                </tbody>
                            </table>
                        `
                data.forEach(usuario => {
                    res.querySelector("#tbodyUsuarios").innerHTML += `
                            <tr>
                                <td>${usuario.id}</td>
                                <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                                <td>${usuario.idade}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.telefone}</td>
                                <td>${usuario.endereco}</td>
                                <td>${usuario.cidade}</td>
                                <td>${usuario.estado}</td>
                                <td>${usuario.dataNascimento}</td>
                            </tr>
                        `
                })
            }
        })
        .catch((err) => {
            console.error("Erro ao listar usuários: ", err)
            alert("Erro ao listar usuários. Tente novamente.")
        })
        .finally(() => {
            listarUsuarios.textContent = "Listar Usuários"
            listarUsuarios.disabled = false
        })
}
export default listarUsuarios