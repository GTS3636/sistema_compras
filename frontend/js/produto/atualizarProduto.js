export function atualizarProduto() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    let titulo = document.querySelector("input[name='titulo']")
    let descricao = document.querySelector("textarea[name='descricao']")
    let categoria = document.getElementById("categoria")
    let preco = document.getElementById("preco")
    let percentualDesconto = document.getElementById("percetualDesconto")
    let estoque = document.getElementById("estoque")
    let marca = document.getElementById("marca")
    let thumbnail = document.getElementById("thumbnail").files[0]

    titulo.disabled = true
    descricao.disabled = true
    categoria.disabled = true
    preco.disabled = true
    percentualDesconto.disabled = true
    estoque.disabled = true
    marca.disabled = true
    thumbnail.disabled = true

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()
        let idProduto = document.getElementById("idProduto").value
        console.log(idProduto)

        if (selecaoAcao.value === "none") {
            return
        } else if (selecaoAcao.value === "consultar" && !idProduto  || "atualizar" && !idProduto) {
            res.innerHTML = `<p>Por favor, informe o ID do produto para consulta.</p>`
            alert("Por favor, informe o ID do produto para consulta.")
            return
        } else if (selecaoAcao.value === "consultar") {
            await fetch(`http://localhost:3000/produto/${idProduto}`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                    return resp.json()
                })
                .then(produto => {
                    if (produto) {
                        console.log(produto)
                        res.innerHTML = `
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
                                        <td>R$ ${produto.preco}</td>
                                        <td>${produto.percentualDesconto ? produto.percentualDesconto + "%" : "Não possui desconto"}</td>
                                        <td>${produto.estoque}</td>
                                        <td>${produto.marca || "Sem marca registrada"}</td>
                                        <td><img src="${produto.thumbnail}" alt="${produto.thumbnail}" width="75" height="60"></td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                    } else {
                        res.innerHTML = `<p>Produto não encontrado.</p>`
                        alert("Produto não encontrado. Verifique o ID e tente novamente.")
                    }

                    titulo.disabled = false
                    descricao.disabled = false
                    categoria.disabled = false
                    preco.disabled = false
                    percentualDesconto.disabled = false
                    estoque.disabled = false
                    marca.disabled = false

                    marca.value = produto.marca ? produto.marca : "Sem marca registrada"
                    titulo.value = produto.titulo ? produto.titulo : titulo
                    descricao.value = produto.descricao ? produto.descricao : descricao
                    categoria.value = produto.categoria ? produto.categoria : categoria
                    preco.value = produto.preco ? produto.preco : preco
                    estoque.value = produto.estoque ? produto.estoque : estoque
                    percentualDesconto.value = produto.percentualDesconto ? produto.percentualDesconto : percentualDesconto
                })
                .catch((err) => {
                    console.error("Erro ao consultar produto:", err)
                    alert("Erro ao consultar produto. Verifique o ID e tente novamente.")
                })
        }
        else if (selecaoAcao.value === "atualizar") {
            const valores = {
                titulo: titulo,
                descricao: descricao,
                categoria: categoria,
                preco: parseFloat(preco),
                percentualDesconto: percentualDesconto,
                estoque: parseInt(estoque),
                marca: marca,
                thumbnail: thumbnail ? thumbnail.name : null
            }
            await fetch(`http://localhost:3000/produto/${idProduto}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(valores)
            })
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar produto")
                    return resp.json()
                })
                .then(produto => {
                    res.innerHTML = `<h3>Produto Atualizado:</h3>`
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
                                </tr>
                            </tbody>
                        </table>
                    `
                    titulo.disabled = true
                    descricao.disabled = true
                    categoria.disabled = true
                    preco.disabled = true
                    percentualDesconto.disabled = true
                    estoque.disabled = true
                    marca.disabled = true
                    thumbnail.disabled = true
                })
                .catch((err) => {
                    console.error("Erro ao atualizar produto:", err)
                    alert("Erro ao atualizar produto. Verifique os dados e tente novamente.")
                })
                .finally(() => {
                    selecaoAcao.value = "none"
            })
        }
    })
}