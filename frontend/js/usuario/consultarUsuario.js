export function consultarUsuario() {
    let consultarUsuario = document.getElementById("consultarUsuario")
    let res = document.getElementById("res")
    res.innerHTML = ``

    consultarUsuario.disabled = false
    consultarUsuario.textContent = "Consultar"

    consultarUsuario.addEventListener("click", async (e) => {
        e.preventDefault()

        res.innerHTML = ``
        res.innerHTML = `<p>Consultando...</p>`

        let idUsuarioConsultar = document.getElementById("idUsuarioConsultar").value
        let nomeUsuarioConsultar = document.getElementById("nomeUsuarioConsultar").value

        console.log(idUsuarioConsultar, nomeUsuarioConsultar)

        if (idUsuarioConsultar) {
            if (isNaN(idUsuarioConsultar)) {
                alert("Por favor, informe o COD do usuário a ser consultado.")
                return
            }
        }

        if (nomeUsuarioConsultar) {
            if (nomeUsuarioConsultar.trim() === "") {
                alert("Por favor, informe o nome do usuário a ser consultado.")
                return
            }
        }

        consultarUsuario.textContent = "Consultando..."
        consultarUsuario.disabled = true

        if (idUsuarioConsultar && nomeUsuarioConsultar) {
            alert("Por favor, informe apenas um critério de consulta: COD ou nome do usuário.")
            consultarUsuario.textContent = "Consultar"
            consultarUsuario.disabled = false
            document.getElementById("idUsuarioConsultar").value = ""
            document.getElementById("nomeUsuarioConsultar").value = ""
            return
        }
        else if (idUsuarioConsultar && !nomeUsuarioConsultar) {
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
                                        <td>${usuario.dataNascimento ? usuario.dataNascimento = new Date(usuario.dataNascimento).toLocaleDateString("pt-BR") : usuario.dataNascimento}</td>
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
                    document.getElementById("idUsuarioConsultar").value = ""
                    document.getElementById("nomeUsuarioConsultar").value = ""
                })
        }
        else if (nomeUsuarioConsultar && !idUsuarioConsultar) {
            await fetch(`http://localhost:3000/usuario/`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuario")
                    return resp.json()
                })
                .then(usuario => {
                    const usuarioExistente = usuario.find(user => user.titulo.toLowerCase() === nomeUsuarioConsultar.toLowerCase())
                    if (usuarioExistente) {
                        res.innerHTML = ``
                        res.innerHTML = `<h3>Usuário Consultado:</h3>`
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
                                        <td>${usuarioExistente.id}</td>
                                        <td>${usuarioExistente.primeiroNome} ${usuarioExistente.segundoNome}</td>
                                        <td>${usuarioExistente.idade}</td>
                                        <td>${usuarioExistente.email}</td>
                                        <td>${usuarioExistente.telefone}</td>
                                        <td>${usuarioExistente.endereco}</td>
                                        <td>${usuarioExistente.cidade}</td>
                                        <td>${usuarioExistente.estado}</td>
                                        <td>${usuarioExistente.dataNascimento ? usuarioExistente.dataNascimento = new Date(usuarioExistente.dataNascimento).toLocaleDateString("pt-BR") : usuarioExistente.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                    `
                    } else {
                        res.innerHTML += `<p>Usuário não encontrado.</p>`
                        alert("Usuário não encontrado. Verifique o nome e tente novamente.")
                    }
                })
                .catch((err) => {
                    console.error("Erro ao consultar usuário por nome:", err)
                    alert("Erro ao consultar usuário. Verifique o nome e tente novamente.")
                })
                .finally(() => {
                    consultarUsuario.textContent = "Consultar"
                    consultarUsuario.disabled = false
                    document.getElementById("idUsuarioConsultar").value = ""
                    document.getElementById("nomeUsuarioConsultar").value = ""
                })
        }
    })
}