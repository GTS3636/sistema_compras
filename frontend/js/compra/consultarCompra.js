function consultarCompra() {
    let consultarCompra = document.getElementById("consultarCompra")
    let res = document.getElementById("res")
    consultarCompra.disabled = false
    consultarCompra.textContent = "Consultar"

    consultarCompra.addEventListener("click", async (e) => {
        e.preventDefault()
        let idCompraConsultar = document.getElementById("idCompraConsultar").value

        if (!idCompraConsultar) {
            alert("Por favor, informe o ID da compra a ser consultada.")
            return
        }

        consultarCompra.textContent = "Consultando..."
        consultarCompra.disabled = true

        await fetch(`http://localhost:3000/compra/${idCompraConsultar}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar compra")
                return resp.json()
            })
            .then(compra => {
                res.innerHTML = ``
                if (compra) {
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
                                        <td>${compra.dataCompra}</td>
                                        <td>${compra.precoUnitario.toFixed(2)}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                    `
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
                consultarCompra.textContent = "Consultar"
                consultarCompra.disabled = false
            })
    })
}
export default consultarCompra