export function atualizarUsuario() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    let primeiroNome = document.getElementById("primeiroNome")
    let segundoNome = document.getElementById("segundoNome")
    let idade = document.getElementById("idade")
    let telefone = document.getElementById("telefone")
    let endereco = document.getElementById("endereco")
    let cidade = document.getElementById("cidade")
    let estado = document.getElementById("estado")
    let dataNascimento = document.getElementById("dataNascimento")
    let anoAtual = Number(new Date().getFullYear())

    primeiroNome.disabled = true
    segundoNome.disabled = true
    telefone.disabled = true
    endereco.disabled = true
    cidade.disabled = true
    estado.disabled = true
    dataNascimento.disabled = true

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()
        let idUsuario = document.getElementById("idUsuario").value
        let optionSelection = selecaoAcao.value

        if ((optionSelection === "consultar" && !idUsuario) || (optionSelection === "atualizar" && !idUsuario)) {
            res.innerHTML = `<p>Por favor, informe o ID do usuário.</p>`
            alert("Por favor, informe o ID do usuário.")
            return
        }

        switch (optionSelection) {
            case "none":
                return
            case "consultar":
                await fetch(`http://localhost:3000/usuario/${idUsuario}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuário")
                        return resp.json()
                    })
                    .then(usuario => {
                        if (usuario) {
                            primeiroNome.value = usuario.primeiroNome
                            segundoNome.value = usuario.segundoNome
                            idade.value = usuario.dataNascimento ? anoAtual - new Date(usuario.dataNascimento).getFullYear() : ""
                            telefone.value = usuario.telefone
                            endereco.value = usuario.endereco
                            cidade.value = usuario.cidade
                            estado.value = usuario.estado
                            dataNascimento.value = usuario.dataNascimento ? new Date(usuario.dataNascimento).toISOString().split('T')[0] : ""

                            res.innerHTML = ``
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
                                        <td>${usuario.dataNascimento ? new Date(usuario.dataNascimento).toISOString().split('T')[0] : ""}</td>
                                    </tr>
                                </tbody>
                            </table>
                            `
                            primeiroNome.disabled = false
                            segundoNome.disabled = false
                            telefone.disabled = false
                            endereco.disabled = false
                            cidade.disabled = false
                            estado.disabled = false
                            dataNascimento.disabled = false
                        } else {
                            res.innerHTML += `
                            <p>Usuário não encontrado.</p>
                            `
                            alert("Usuário não encontrado. Verifique o ID e tente novamente.")
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar usuário:", err)
                        alert("Erro ao consultar usuário. Verifique o ID e tente novamente.")
                    })
                    .finally(() => {
                        selecaoAcao.value = "none"
                    })
                break
            case "atualizar":
                const valores = {
                    primeiroNome: primeiroNome.value,
                    segundoNome: segundoNome.value,
                    idade: idade.value,
                    telefone: telefone.value,
                    endereco: endereco.value,
                    cidade: cidade.value,
                    estado: estado.value,
                    dataNascimento: dataNascimento.value ? new Date(dataNascimento.value).toISOString().split('T')[0] : dataNascimento.value
                }
                await fetch(`http://localhost:3000/usuario/${idUsuario}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar usuário")
                        return resp.json()
                    })
                    .then(usuario => {
                        res.innerHTML = ``
                        res.innerHTML += `<h3>Usuário Atualizado:</h3>`
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
                                        <td>${usuario.dataNascimento ? usuario.dataNascimento = new Date().toLocaleDateString("pt-BR") : usuario.dataNascimento}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                        alert("Usuário atualizado com sucesso!")
                    })
                    .catch((err) => {
                        console.error("Erro ao atualizar usuário:", err)
                        alert("Erro ao atualizar usuário. Verifique os dados e tente novamente.")
                    })
                    .finally(() => {
                        primeiroNome.value = ""
                        segundoNome.value = ""
                        idade.value = ""
                        telefone.value = ""
                        endereco.value = ""
                        cidade.value = ""
                        estado.value = ""
                        dataNascimento.value = ""
                        selecaoAcao.value = "none"
                    })
                break
            default:
                return
        }
    })
}