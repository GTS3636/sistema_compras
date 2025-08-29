export function loteUsuarios() {
    let cadastrarLoteUsuarios = document.getElementById("cadastrarLoteUsuarios")
    let valores = []
    let res = document.getElementById("res")
    cadastrarLoteUsuarios.disabled = false
    cadastrarLoteUsuarios.textContent = "Cadastrar Lote"

    cadastrarLoteUsuarios.addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch("https://dummyjson.com/users")
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote de usuários")
                return resp.json()
            })
            .then(async data => {
                cadastrarLoteUsuarios.disabled = true
                cadastrarLoteUsuarios.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuários Cadastrados:</h2>`
                res.innerHTML += `
                                <table border="1">
                                <thead>
                                    <tr>
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
                data.users.forEach(async usuario => {
                    let dadosUser = {
                        primeiroNome: usuario.firstName,
                        segundoNome: usuario.lastName,
                        idade: usuario.age,
                        telefone: usuario.phone,
                        endereco: usuario.address.address,
                        cidade: usuario.address.city,
                        estado: usuario.address.state,
                        dataNascimento: usuario.birthDate,
                        email: usuario.email
                    }
                    valores.push(dadosUser)
                    res.querySelector("#tbodyUsuarios").innerHTML += `
                            <tr>
                                <td>${usuario.firstName} ${usuario.lastName}</td>
                                <td>${usuario.age}</td>
                                <td>${usuario.email}</td>
                                <td>${usuario.phone}</td>
                                <td>${usuario.address.address}</td>
                                <td>${usuario.address.city}</td>
                                <td>${usuario.address.state}</td>
                                <td>${usuario.birthDate ? usuario.birthDate = new Date(usuario.birthDate).toLocaleDateString("pt-BR") : usuario.birthDate}</td>
                            </tr>
                        `
                })
                console.log(valores)
                await fetch("http://localhost:3000/usuario/lote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote de usuários")
                        return resp.json()
                    })
                    .catch((err) => {
                        console.error("Erro ao cadastrar lote de usuários:", err)
                        alert("Erro ao cadastrar lote de usuários. Verifique os dados e tente novamente.")
                    })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar lote de usuários:", err)
                alert("Erro ao cadastrar lote de usuários. Tente novamente.")
            })
            .finally(() => {
                cadastrarLoteUsuarios.textContent = "Cadastrar Lote"
                cadastrarLoteUsuarios.disabled = false
            })
    })
}
