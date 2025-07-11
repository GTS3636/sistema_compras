export function listarCompras() {
    let res = document.getElementById("res")
    res.innerHTML = ``
    res.innerHTML += `Carregando...`

    fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) throw new Error("Erro ao receber a resposta no listar compras")
            return resp.json()
        })
        .then(data => {
            res.innerHTML = ``
            if (data.length <= 0) {
                res.innerHTML += `<p>Nenhuma compra cadastrada.</p>`
                return
            }
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
                                
                            </tbody>
                        </table>
                    `
            data.forEach(compra => {
                res.querySelector("#tbodyCompras").innerHTML += `
                        <tr>
                            <td>${compra.id}</td>
                            <td>${compra.usuarioId}</td>
                            <td>${compra.produtoId}</td>
                            <td>${compra.quantidade}</td>
                            <td>${compra.dataCompra ? compra.dataCompra = new Date().toLocaleDateString("pt-BR") : compra.dataCompra}</td>
                            <td>${compra.precoUnitario.toFixed(2)}</td>
                            <td>${compra.formaPagamento}</td>
                            <td>${compra.status}</td>
                        </tr>
                    `
            })
        })
        .catch((err) => {
            console.error("Erro ao listar compras: ", err)
            alert("Erro ao listar compras. Tente novamente.")
        })
}