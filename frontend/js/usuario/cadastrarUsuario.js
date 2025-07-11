function cadastrarUsuario() {
    let cadastroUsuario = document.getElementById("cadastroUsuario")
    let res = document.getElementById("res")
    cadastroUsuario.disabled = false
    cadastroUsuario.textContent = "Cadastrar"

    cadastroUsuario.addEventListener("click", async (e) => {
        e.preventDefault()

        let primeiroNome = document.getElementById("primeiroNome").value
        let segundoNome = document.getElementById("segundoNome").value
        let idade = parseInt(document.getElementById("idade").value)
        let telefone = document.getElementById("telefone").value
        let endereco = document.getElementById("endereco").value
        let cidade = document.getElementById("cidade").value
        let estado = document.getElementById("estado").value
        let dataNascimento = document.getElementById("dataNascimento").value
        let email = document.getElementById("email").value

        if (!nome || !email || !senha || !telefone || !endereco || !cidade || !estado || !dataNascimento) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        const valores = {
            primeiroNome: primeiroNome,
            segundoNome: segundoNome,
            idade: idade,
            telefone: telefone,
            endereco: endereco,
            cidade: cidade,
            estado: estado,
            dataNascimento: dataNascimento,
            email: email
        }

        cadastroUsuario.textContent = "Cadastrando..."
        cadastroUsuario.disabled = true

        await fetch("http://localhost:3000/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar usuário")
                return resp.json()
            })
            .then(usuario => {
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuário cadastrado com sucesso!</h2>`
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
                alert("Usuário cadastrado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar usuário:", err)
                alert("Erro ao cadastrar usuário. Verifique os dados e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formCadastroUsuario").reset()
                cadastroUsuario.textContent = "Cadastrar"
                cadastroUsuario.disabled = false
            })
    })
}
export default cadastrarUsuario