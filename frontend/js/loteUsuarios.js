let res = document.getElementById("res")
let cadastrarLote = document.getElementById("cadastrarLote")
cadastrarLote.addEventListener("click", async (e) => {
    e.preventDefault()
    res.innerHTML = "" // Limpa o conteúdo da div de resultados
    await fetch("https://dummyjson.com/users")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta da API externa.")
            } return resp.json()
        })
        .then(dados => {
            dados.forEach(async usuarios => {
                const valores = {
                    firstName: usuarios.firstName,
                    lastName: usuarios.lastName,
                    age: usuarios.age,
                    email: usuarios.email,
                    phone: usuarios.phone,
                    address: usuarios.address,
                    city: usuarios.city,
                    state: usuarios.state,
                    birthDate: usuarios.birthDate
                    // colocar variáveis banco:api
                }
                await fetch("http://localhost:3000/usuarios", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) {
                            throw new Error("Erro na resposta do banco de dados.")
                        } return resp.json()
                    })
                    .then(data => {
                        data.forEach(async usuario => {
                            res.innerHTML += `` // colocar variáveis recebidas do banco de dados na res do html em formato de tabela
                        })
                    })
                    .catch((err) => {
                        console.error("Erro em enviar os dados para o banco de dados: ", err)
                    })
            })
        })
        .catch((err) => {
            console.error("Erro no processamento dos dados vindos da API externa: ", err)
        })
})