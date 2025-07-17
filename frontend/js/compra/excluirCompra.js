export function excluirCompra() {
    let excluirCompra = document.getElementById("excluirCompra")
    let res = document.getElementById("res")
    excluirCompra.disabled = false
    excluirCompra.textContent = "Excluir"

    excluirCompra.addEventListener("click", async (e) => {
        e.preventDefault()
        let idCompra = document.getElementById("idCompraExcluir").value
        let idProduto = 0

        let quantidadeCompra = 0
        let quantidadeProduto = 0
        let quantidadeFinal = 0

        if (!idCompra) {
            alert("Por favor, informe o ID da compra a ser excluída.")
            return
        }

        excluirCompra.disabled = true
        excluirCompra.textContent = "Excluindo..."

        await fetch(`http://localhost:3000/compra`)
            .then(resp => {
                if (!resp.ok) {
                    throw new Error("Erro no recebimento da resposta ao consultar a compra antes de excluir")
                } return resp.json()
            })
            .then(async compra => {
                const compraExixstente = compra.find(comp => comp.id === Number(idCompra))
                console.log(compraExixstente)
                if (compraExixstente) {
                    idProduto = compraExixstente.produtoId
                    quantidadeCompra = compraExixstente.quantidade
                    await fetch(`http://localhost:3000/compra/${idCompra}`, {
                        method: "DELETE"
                    })
                        .then(resp => {
                            if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir compra")
                            return resp.json()
                        })
                        .then(async () => {
                            res.innerHTML = ``
                            res.innerHTML += `<p>Compra ID ${idCompra} excluída com sucesso!</p>`
                            await fetch(`http://localhost:3000/produto/${idProduto}`)
                                .then(resp => {
                                    if (!resp.ok) {
                                        throw new Error("Erro no recebimento de dados ao consultar o produto")
                                    } return resp.json()
                                })
                                .then(async produto => {
                                    quantidadeProduto = produto.estoque
                                    quantidadeFinal = quantidadeProduto + quantidadeCompra
                                    await fetch(`http://localhost:3000/produto/${idProduto}`, {
                                        method: "PUT",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({ estoque: quantidadeFinal })
                                    })
                                        .then(resp => {
                                            if (!resp.ok) {
                                                throw new Error("Erro no recebimento dos dados ao atualizar o produto")
                                            } return resp.json()
                                        })
                                        .then(data => {
                                            console.log("Produto atualizado: ", data)
                                        })
                                        .catch((err) => {
                                            console.error("Erro no fetch ao atualizar o produto: ", err)
                                            res.innerHTML = `<p>Erro ao excluir a compra.</p>`
                                        })
                                })
                                .catch((err) => {
                                    console.error("Erro no fetch de consulta de dados ao consultar o produto: ", err)
                                    res.innerHTML = `<p>Erro ao excluir a compra</p>`
                                })
                        })
                        .catch((err) => {
                            console.error("Erro ao excluir compra:", err)
                            alert("Erro ao excluir compra. Verifique o ID e tente novamente.")
                        })
                        .finally(() => {
                            document.getElementById("formExcluirCompra").reset()
                            excluirCompra.textContent = "Excluir"
                            excluirCompra.disabled = false
                        })
                } else {
                    alert("O ID fornecido não está vinculado com nenhuma compra no banco de dados")
                    document.getElementById("formExcluirCompra").reset()
                    excluirCompra.textContent = "Excluir"
                    excluirCompra.disabled = false
                }
            })
            .catch((err) => {
                console.error("Erro no fetch de consulta na compra: ", err)
            })
    })
}