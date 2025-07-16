export function consultarProduto() {
    let consultarProduto = document.getElementById("consultarProduto")
    let res = document.getElementById("res")
    consultarProduto.disabled = false
    consultarProduto.textContent = "Consultar"

    consultarProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        
        res.innerHTML = ``
        res.innerHTML = `<p>Consultando...</p>`
        
        let idProdutoConsultar = document.getElementById("idProdutoConsultar").value
        let nomeProdutoConsultar = document.getElementById("nomeProdutoConsultar").value

        if (nomeProdutoConsultar) {
            if (nomeProdutoConsultar.trim() === "") {
                alert("Por favor, informe um nome do produto válido a ser consultado.")
                return
            }
        }

        if (idProdutoConsultar) {
            if (isNaN(idProdutoConsultar)) {
                alert("Por favor, informe um COD do produto válido a ser consultado.")
                return
            }
        }

        consultarProduto.textContent = "Consultando..."
        consultarProduto.disabled = true

        if (idProdutoConsultar && nomeProdutoConsultar) {
            alert("Por favor, informe apenas um critério de consulta: COD ou nome do produto.")
            consultarProduto.textContent = "Consultar"
            consultarProduto.disabled = false
            document.getElementById("idProdutoConsultar").value = ""
            document.getElementById("nomeProdutoConsultar").value = ""
            return
        }
        else if (idProdutoConsultar && !nomeProdutoConsultar) {
            await fetch(`http://localhost:3000/produto/${idProdutoConsultar}`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                    return resp.json()
                })
                .then(produto => {
                    res.innerHTML = ``
                    if (produto) {
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
                    console.error("Erro ao consultar produto por COD:", err)
                    alert("Erro ao consultar produto. Verifique o COD e tente novamente.")
                    res.innerHTML = ``
                })
                .finally(() => {
                    consultarProduto.textContent = "Consultar"
                    consultarProduto.disabled = false
                    document.getElementById("idProdutoConsultar").value = ""
                    document.getElementById("nomeProdutoConsultar").value = ""
                })
        }
        else if (nomeProdutoConsultar && !idProdutoConsultar) {
            await fetch(`http://localhost:3000/produto/`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                    return resp.json()
                })
                .then(produto => {
                    const produtoExistente = produto.find(p => p.titulo.toLowerCase() === nomeProdutoConsultar.toLowerCase())
                    if (produtoExistente) {
                        res.innerHTML = ``
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
                                        <td>${produtoExistente.id}</td>
                                        <td>${produtoExistente.titulo}</td>
                                        <td>${produtoExistente.descricao}</td>
                                        <td>${produtoExistente.categoria}</td>
                                        <td>R$ ${produtoExistente.preco.toFixed(2)}</td>
                                        <td>${produtoExistente.percentualDesconto ? produtoExistente.percentualDesconto + "%" : "Não possui desconto"}</td>
                                        <td>${produtoExistente.estoque}</td>
                                        <td>${produtoExistente.marca || "Sem marca registrada"}</td>
                                        <td><img src="${produtoExistente.thumbnail}" alt="${produtoExistente.thumbnail}" max-width="75" max-height="60"></td>
                                    </tr>
                                </tbody>
                            </table>
                    `
                    } else {
                        res.innerHTML += `<p>Produto não encontrado.</p>`
                        alert("Produto não encontrado. Verifique o nome e tente novamente.")
                    }
                })
                .catch((err) => {
                    console.error("Erro ao consultar produto por nome:", err)
                    alert("Erro ao consultar produto. Verifique o nome e tente novamente.")
                    res.innerHTML = ``
                })
                .finally(() => {
                    consultarProduto.textContent = "Consultar"
                    consultarProduto.disabled = false
                    document.getElementById("idProdutoConsultar").value = ""
                    document.getElementById("nomeProdutoConsultar").value = ""
                })
        }
    })
}