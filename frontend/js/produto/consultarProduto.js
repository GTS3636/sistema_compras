function consultarProduto() {
    let consultarProduto = document.getElementById("consultarProduto")
    let res = document.getElementById("res")
    consultarProduto.disabled = false
    consultarProduto.textContent = "Consultar"

    consultarProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let idProdutoConsultar = document.getElementById("idProdutoConsultar").value

        if (!idProdutoConsultar) {
            alert("Por favor, informe o ID do produto a ser consultado.")
            return
        }

        consultarProduto.textContent = "Consultando..."
        consultarProduto.disabled = true

        await fetch(`http://localhost:3000/produto/consultar/${idProdutoConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                if (data) {
                    res.innerHTML = `<h3>Produto Consultado:</h3>`
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
                                </tbody>
                            </table>
                    `
                } else {
                    res.innerHTML += `<p>Produto não encontrado.</p>`
                    alert("Produto não encontrado. Verifique o ID e tente novamente.")
                }
            })
            .catch((err) => {
                console.error("Erro ao consultar produto:", err)
                alert("Erro ao consultar produto. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                consultarProduto.textContent = "Consultar"
                consultarProduto.disabled = false
            })
    })
}
export default consultarProduto