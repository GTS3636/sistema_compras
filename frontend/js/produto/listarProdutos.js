async function listarProdutos() {
    let res = document.getElementById("res")
    res.innerHTML = ``

    listarProdutos.textContent = "Carregando..."
    listarProdutos.disabled = true

    await fetch("http://localhost:3000/produto")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar produtos")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhum produto cadastrado.</p>`
            } else {
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
                data.forEach(produto => {
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
            }
            listarProdutos.textContent = "Listar Produtos"
            listarProdutos.disabled = false
        })
        .catch((err) => {
            console.error("Erro ao listar produtos: ", err)
            alert("Erro ao listar produtos. Tente novamente.")
            listarProdutos.textContent = "Listar Produtos"
            listarProdutos.disabled = false
        })
}
export default listarProdutos