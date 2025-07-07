let res = document.getElementById("res")
let cadastrarLote = document.getElementById("cadastrarLote")
cadastrarLote.addEventListener("click", async (e) => {
    e.preventDefault()
    res.innerHTML = ""
    await fetch("https://dummyjson.com/products")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta da API externa.")
            } return resp.json()
        })
        .then(dados => {
            dados.forEach(async produtos => {
                const valores = {
                    title: produtos.title,
                    description: produtos.description,
                    category: produtos.category,
                    price: produtos.price,
                    discountPercentual: produtos.discountPercentual,
                    stock: produtos.stock,
                    brand: produtos.brand,
                    thumbnail: produtos.thumbnail
                    // colocar variáveis banco:api
                }
                await fetch("http://localhost:3000/produtos", {
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
                        data.forEach(async produto => {
                            res.innerHTML += `` // colocar variáveis recebidas da API na res do html em formato de tabela
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