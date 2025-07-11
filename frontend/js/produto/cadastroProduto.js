function cadastrarProduto() {
    let cadastroProduto = document.getElementById("cadastroProduto")
    let res = document.getElementById("res")
    cadastroProduto.disabled = false
    cadastroProduto.textContent = "Cadastrar"
    res.innerHTML = ``

    cadastroProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let titulo = document.getElementById("titulo").value
        let descricao = document.querySelector("textarea[id='descricao']").value
        let categoria = document.getElementById("categoria").value
        let preco = parseFloat(document.getElementById("preco").value)
        let percentualDesconto = parseFloat(document.getElementById("percetualDesconto").value) || 0
        let estoque = parseInt(document.getElementById("estoque").value)
        let marca = document.getElementById("marca").value
        let thumbnail = document.getElementById("thumbnail").files[0]

        const valores = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            preco: preco,
            percentualDesconto: percentualDesconto,
            estoque: estoque,
            marca: marca,
            thumbnail: thumbnail ? thumbnail.name : null
        }

        cadastroProduto.textContent = "Cadastrando..."
        cadastroProduto.disabled = true

        await fetch("http://localhost:3000/produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar produto")
                return resp.json()
            })
            .then(produto => {
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
                alert("Produto cadastrado com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar produto:", err)
                alert("Erro ao cadastrar produto. Verifique os dados e tente novamente.")
                cadastroProduto.textContent = "Cadastrar"
                cadastroProduto.disabled = false
            })
            .finally(() => {
                document.getElementById("formCadastroProduto").reset()
                cadastroProduto.textContent = "Cadastrar"
                cadastroProduto.disabled = false
            })
    })
}
export default cadastrarProduto