export async function relatorioUsuario() {
    let resRelatUsu = document.getElementById("resRelatUsu")
    resRelatUsu.innerHTML = ``
    resRelatUsu.innerHTML = `<label>Gerando relatório...</label>`
    await fetch("http://localhost:3000/usuario")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            resRelatUsu.innerHTML = ``
            resRelatUsu.innerHTML = `
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
                        </tr>
                    </thead>
                    <tbody id="resRelatUsuText">

                    </tbody>
                </table>
                `
            dados.forEach(usuario => {
                let resRelatUsuText = document.getElementById("resRelatUsuText")
                resRelatUsuText.innerHTML += `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.primeiroNome} ${usuario.segundoNome}</td>
                    <td>${usuario.idade}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.telefone}</td>
                    <td>${usuario.endereco}</td>
                    <td>${usuario.cidade}</td>
                    <td>${usuario.estado}</td>
                </tr>
            `
            })
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de usuários:", err)
            alert("Erro ao gerar relatório de usuários. Tente novamente.")
            resRelatUsu.innerHTML = `<p>Erro ao gerar relatório de usuários. Tente novamente.</p>`
        })
}
