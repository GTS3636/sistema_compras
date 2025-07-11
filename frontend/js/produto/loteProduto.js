
function loteProduto() {
    let cadastrarLote = document.getElementById("cadastrarLote")
    let res = document.getElementById("res")
    cadastrarLote.disabled = false
    cadastrarLote.textContent = "Cadastrar Lote"

    cadastrarLote.addEventListener("click", async (e) => {
        e.preventDefault()
        await fetch("https://dummyjson.com/products")
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar lote")
                return resp.json()
            })
            .then(data => {
                cadastrarLote.disabled = true
                cadastrarLote.textContent = "Cadastrando Lote..."
                res.innerHTML = ``
                res.innerHTML += `
                                <table border="1">
                                <thead>
                                    <tr>
                                        <th>ID</th>
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
                data.forEach(async produto => {
                    const valores = {
                        titulo: produto.title,
                        descricao: produto.description,
                        categoria: produto.category,
                        preco: produto.price,
                        percentualDesconto: produto.discountPercentage || 0,
                        estoque: produto.stock,
                        marca: produto.brand || "Sem marca registrada",
                        thumbnail: produto.thumbnail
                    }
                    await fetch("http://localhost:3000/produto", {
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
                        .then(produto => {
                            res.querySelector("#tbodyProdutos").innerHTML += `
                                        <tr>
                                            <td>${produto.id}</td>
                                            <td>${produto.titulo}</td>
                                            <td>${produto.descricao}</td>
                                            <td>${produto.categoria}</td>
                                            <td>R$ ${produto.preco.toFixed(2)}</td>
                                            <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                            <td>${produto.estoque}</td>
                                            <td>${produto.marca || "Sem marca registrada"}</td>
                                            <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" max-width="75" max-height="60"></td>
                                        </tr>
                                    `
                        })
                        .catch((err) => {
                            console.error("Erro ao cadastrar lote de produtos:", err)
                            alert("Erro ao cadastrar lote de produtos. Verifique os dados e tente novamente.")
                        })
                        .finally(() => {
                            cadastrarLote.textContent = "Cadastrar Lote"
                            cadastrarLote.disabled = false
                        })
                })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar lote de produtos:", err)
                alert("Erro ao cadastrar lote de produtos. Tente novamente.")
            })
    })
}
export default loteProduto