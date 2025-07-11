export function loteUsuarios() {
    let cadastrarLoteUsuarios = document.getElementById("cadastrarLoteUsuarios")
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
            .then(data => {
                cadastrarLoteUsuarios.disabled = true
                cadastrarLoteUsuarios.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `<h2>Usuários Cadastrados:</h2>`
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
                data.users.forEach(async usuario => {
                    const valores = {
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
                    await fetch("http://localhost:3000/usuario", {
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
                        .then(usuario => {
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
                                    <td>${usuario.dataNascimento ? usuario.dataNascimento = new Date(usuario.dataNascimento).toLocaleDateString("pt-BR") : usuario.dataNascimento}</td>
                                </tr>
                            `
                        })
                        .catch((err) => {
                            console.error("Erro ao cadastrar lote de usuários:", err)
                            alert("Erro ao cadastrar lote de usuários. Verifique os dados e tente novamente.")
                        })
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
