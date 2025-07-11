function atualizarProduto() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()
        let idProduto = document.getElementById("idProduto").value
        let titulo = document.querySelector("input[name='titulo']").value
        let descricao = document.querySelector("textarea[name='descricao']").value
        let categoria = document.getElementById("categoria").value
        let preco = parseFloat(document.getElementById("preco").value)
        let percentualDesconto = parseFloat(document.getElementById("percetualDesconto").value) || 0
        let estoque = parseInt(document.getElementById("estoque").value)
        let marca = document.getElementById("marca").value

        if (selecaoAcao.value === "none") {
            return
        } else if (selecaoAcao.value === "consultar" || "atualizar" && !idProduto) {
            res.innerHTML = `<p>Por favor, informe o ID do produto para consulta.</p>`
            alert("Por favor, informe o ID do produto para consulta.")
            return
        } else if (selecaoAcao.value === "consultar") {
            await fetch(`http://localhost:3000/produto/consultar/${idProduto}`)
                .then(resp => {
                    if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                    return resp.json()
                })
                .then(data => {
                    if (data) {
                        res.innerHTML = `
                            <h3>Produto Consultado:</h3>
                            <p>Título: ${data.titulo}</p>
                            <p>Descrição: ${data.descricao}</p>
                            <p>Categoria: ${data.categoria}</p>
                            <p>Preço: R$${data.preco.toFixed(2)}</p>
                            <p>Estoque: ${data.estoque}</p>
                            <p>Marca: ${data.marca}</p>
                        `
                    } else {
                        res.innerHTML = `<p>Produto não encontrado.</p>`
                        alert("Produto não encontrado. Verifique o ID e tente novamente.")
                    }
                    marca = data.marca ? data.marca : "Sem marca registrada"
                    titulo = data.titulo ? data.titulo : titulo
                    descricao = data.descricao ? data.descricao : descricao
                    categoria = data.categoria ? data.categoria : categoria
                    preco = data.preco ? parseFloat(data.preco) : preco
                    estoque = data.estoque ? parseInt(data.estoque) : estoque
                    percentualDesconto = data.percentualDesconto ? parseFloat(data.percentualDesconto) : percentualDesconto
                })
                .catch((err) => {
                    console.error("Erro ao consultar produto:", err)
                    alert("Erro ao consultar produto. Verifique o ID e tente novamente.")
                })
        }
        else if (selecaoAcao.value === "atualizar") {

        }

        const valores = {
            titulo: titulo,
            descricao: descricao,
            categoria: categoria,
            preco: preco,
            percentualDesconto: percentualDesconto,
            estoque: estoque,
            marca: marca
        }

        if (selecaoAcao.value === "consultar") {
            // Implementar lógica de consulta aqui
            res.innerHTML = `<p>Consulta realizada com sucesso!</p>`
        } else if (selecaoAcao.value === "atualizar") {
            // Implementar lógica de atualização aqui
            res.innerHTML = `<p>Atualização realizada com sucesso!</p>`
        } else {
            res.innerHTML = `<p>Selecione uma ação válida.</p>`
        }
    })
}
export default atualizarProduto