function consultarUsuario() {
    let consultarUsuario = document.getElementById("consultarUsuario")
    let res = document.getElementById("res")
    consultarUsuario.disabled = false
    consultarUsuario.textContent = "Consultar"

    consultarUsuario.addEventListener("click", async (e) => {
        e.preventDefault()
        let idUsuarioConsultar = document.getElementById("idUsuarioConsultar").value

        if (!idUsuarioConsultar) {
            alert("Por favor, informe o ID do usuário a ser consultado.")
            return
        }

        consultarUsuario.textContent = "Consultando..."
        consultarUsuario.disabled = true

        await fetch(`http://localhost:3000/usuario/${idUsuarioConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuário")
                return resp.json()
            })
            .then(usuario => {
                res.innerHTML = ``
                if (usuario) {
                    res.innerHTML += `<h3>Usuário Consultado:</h3>`
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
                                </tbody>
                            </table>
                    `
                } else {
                    res.innerHTML += `<p>Usuário não encontrado.</p>`
                    alert("Usuário não encontrado. Verifique o ID e tente novamente.")
                }
            })
            .catch((err) => {
                console.error("Erro ao consultar usuário:", err)
                alert("Erro ao consultar usuário. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                consultarUsuario.textContent = "Consultar"
                consultarUsuario.disabled = false
            })
    })
}
export default consultarUsuario