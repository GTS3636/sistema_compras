export function loteProduto() {
    let cadastrarLote = document.getElementById("cadastrarLote")
    let res = document.getElementById("res")
    let valores = []
    cadastrarLote.disabled = false
    cadastrarLote.textContent = "Cadastrar Lote"

    cadastrarLote.addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch("https://dummyjson.com/products")
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote")
                return resp.json()
            })
            .then(async data => {
                cadastrarLote.disabled = true
                cadastrarLote.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `
                                <table border="1">
                                <thead>
                                    <tr>
                                        <th>Título</th>
                                        <th>Descrição</th>
                                        <th>Categoria</th>
                                        <th>Preço</th>
                                        <th>Desconto</th>
                                        <th>Estoque</th>
                                        <th>Marca</th>
                                        <th>Thumbnail</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyProdutos">
                                    
                                </tbody>
                            </table>
                            `
                data.products.forEach(async produto => {
                    let dadosProduto = {
                        titulo: produto.title,
                        descricao: produto.description,
                        categoria: produto.category,
                        preco: produto.price,
                        percentualDesconto: produto.discountPercentage,
                        estoque: produto.stock,
                        marca: produto.brand || "Sem marca registrada",
                        thumbnail: produto.thumbnail
                    }
                    valores.push(dadosProduto)
                    res.querySelector("#tbodyProdutos").innerHTML += `
                            <tr>
                                <td>${produto.title}</td>
                                <td>${produto.description}</td>
                                <td>${produto.category}</td>
                                <td>R$ ${produto.price.toFixed(2)}</td>
                                <td>${produto.discountPercentage ? produto.discountPercentage + "%" : "Não possui desconto"}</td>
                                <td>${produto.stock}</td>
                                <td>${produto.brand || "Sem marca registrada"}</td>
                                <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" width="75" height="60"></td>
                            </tr>
                        `
                })
                console.log(valores)
                await fetch("http://localhost:3000/produto/lote", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote")
                        return resp.json()
                    })
                    .catch((err) => {
                        console.error("Erro ao cadastrar lote de produtos:", err)
                    })
                    .finally(() => {
                        cadastrarLote.textContent = "Cadastrar Lote"
                        cadastrarLote.disabled = false
                    })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar lote de produtos:", err)
                alert("Erro ao cadastrar lote de produtos. Tente novamente.")
            })
    })
}
