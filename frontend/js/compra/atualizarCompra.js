export async function atualizarCompra() {
    let res = document.getElementById("res")
    let selecaoAcao = document.getElementById("selecaoAcao")

    let idUsuario = document.getElementById("idUsuarioCompra")
    let idProduto = document.getElementById("idProdutoCompra")
    let quantidade = parseInt(document.getElementById("quantidade"))
    let dataCompra = document.getElementById("dataCompra")
    let formaPagamento = document.getElementById("formaPagamento")
    let precoUnitario = parseFloat(document.getElementById("precoUnitario").value)
    let status = document.getElementById("status")

    idUsuario.disabled = true
    idProduto.disabled = true
    quantidade.disabled = true
    dataCompra.disabled = true
    formaPagamento.disabled = true
    precoUnitario.disabled = true
    status.disabled = true

    selecaoAcao.addEventListener("change", async (e) => {
        e.preventDefault()

        let idCompra = document.getElementById("idCompra").value

        if (selecaoAcao.value === "none") {
            return
        } else if (selecaoAcao.value === "consultar" || "atualizar" && !idCompra) {
            res.innerHTML = `<p>Por favor, informe o ID da compra.</p>`
            alert("Por favor, informe o ID da compra.")
            return
        }

        switch (selecaoAcao.value) {
            case "consultar":
                await fetch(`http://localhost:3000/compra/${idCompra}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar compra")
                        return resp.json()
                    })
                    .then(compra => {
                        if (compra) {
                            idUsuario.value = compra.idUsuario
                            idProduto.value = compra.idProduto
                            quantidade.valueOf = compra.quantidade
                            dataCompra.value = compra.dataCompra
                            formaPagamento.value = compra.formaPagamento
                            precoUnitario.valueOf = compra.precoUnitario
                            status.value = compra.status

                            res.innerHTML = ``
                            res.innerHTML += `<h3>Compra Consultada:</h3>`
                            res.innerHTML += `
                                <table border="1">
                                    <thead>
                                        <tr>
                                            <th>COD Compra</th>
                                            <th>COD Usuário</th>
                                            <th>COD Produto</th>
                                            <th>Quantidade</th>
                                            <th>Data da compra</th>
                                            <th>Preço unitário</th>
                                            <th>Forma de pagamento</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody id="tbodyCompras">
                                        <tr>
                                            <td>${compra.id}</td>
                                            <td>${compra.idUsuario}</td>
                                            <td>${compra.idProduto}</td>
                                            <td>${compra.quantidade}</td>
                                            <td>${compra.dataCompra ? compra.dataCompra = new Date().toLocaleDateString("pt-BR") : compra.dataCompra}</td>
                                            <td>${compra.precoUnitario.toFixed(2)}</td>
                                            <td>${compra.formaPagamento}</td>
                                            <td>${compra.status}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                `
                            idUsuario.disabled = false
                            idProduto.disabled = false
                            quantidade.disabled = false
                            dataCompra.disabled = false
                            formaPagamento.disabled = false
                            precoUnitario.disabled = false
                            status.disabled = false
                        } else {
                            res.innerHTML += `<p>Compra não encontrada.</p>`
                            alert("Compra não encontrada. Verifique o ID e tente novamente.")
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar compra:", err)
                        alert("Erro ao consultar compra. Verifique o ID e tente novamente.")
                    })
                    .finally(() => {
                        selecaoAcao.value = "none"
                    })
            case "atualizar":
                const valores = {
                    idUsuario: idUsuario.value,
                    idProduto: idProduto.value,
                    quantidade: quantidade.value,
                    dataCompra: dataCompra.value,
                    formaPagamento: formaPagamento.value,
                    precoUnitario: precoUnitario,
                    status: status.value
                }
                await fetch(`http://localhost:3000/compra/${idCompra}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    }, body: JSON.stringify(valores)
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar compra")
                        return resp.json()
                    })
                    .then(compra => {
                        res.innerHTML = ``
                        res.innerHTML += `<h2>Compra Atualizada:</h2>`
                        res.innerHTML += `
                            <table border="1">
                                <thead>
                                    <tr>
                                        <th>COD Compra</th>
                                        <th>COD Usuário</th>
                                        <th>COD Produto</th>
                                        <th>Quantidade</th>
                                        <th>Data da compra</th>
                                        <th>Preço unitário</th>
                                        <th>Forma de pagamento</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">
                                    <tr>
                                        <td>${compra.id}</td>
                                        <td>${compra.idUsuario}</td>
                                        <td>${compra.idProduto}</td>
                                        <td>${compra.quantidade}</td>
                                        <td>${compra.dataCompra}</td>
                                        <td>${compra.precoUnitario.toFixed(2)}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        `
                        alert("Compra atualizada com sucesso!")
                    })
                    .catch((err) => {
                        console.error("Erro ao atualizar compra:", err)
                        alert("Erro ao atualizar compra. Verifique os dados e tente novamente.")
                    })
                    .finally(() => {
                        idUsuario.value = ""
                        idProduto.value = ""
                        quantidade.valueOf = ""
                        dataCompra.value = ""
                        formaPagamento.value = ""
                        precoUnitario.valueOf = ""
                        status.value = ""

                        selecaoAcao.value = "none"

                        idUsuario.disabled = true
                        idProduto.disabled = true
                        quantidade.disabled = true
                        dataCompra.disabled = true
                        formaPagamento.disabled = true
                        precoUnitario.disabled = true
                        status.disabled = true
                    })
        }
    })
}