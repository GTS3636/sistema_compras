
function cadastrarCompra() {
    let cadastroCompra = document.getElementById("cadastroCompra")
    let res = document.getElementById("res")
    cadastroCompra.disabled = false
    cadastroCompra.textContent = "Cadastrar"

    cadastroCompra.addEventListener("click", async (e) => {
        e.preventDefault()

        let idUsuario = document.getElementById("idUsuarioCompra").value
        let idProduto = document.getElementById("idProdutoCompra").value
        let quantidade = parseInt(document.getElementById("quantidade").value)
        let dataCompra = new Date().toISOString().slice(0, 10) || document.getElementById("dataCompra").value // Formato YYYY-MM-DD
        let formaPagamento = document.getElementById("formaPagamento").value
        let precoUnitario = parseFloat(document.getElementById("precoUnitario").value)
        let status = document.getElementById("status").value


        if (!idUsuario || !idProduto || !quantidade) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        const valores = {
            idUsuario: idUsuario,
            idProduto: idProduto,
            quantidade: quantidade,
            dataCompra: dataCompra,
            formaPagamento: formaPagamento,
            precoUnitario: precoUnitario,
            status: status
        }

        cadastroCompra.textContent = "Cadastrando..."
        cadastroCompra.disabled = true

        await fetch("http://localhost:3000/compra", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(valores)
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no cadastrar compra")
                return resp.json()
            })
            .then(compra => {
                res.innerHTML = ``
                res.innerHTML += `<h2>Compra cadastrada com sucesso!</h2>`
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
                                        <td>${compra.precoUnitario}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                `
                alert("Compra cadastrada com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao cadastrar compra:", err)
                alert("Erro ao cadastrar compra. Verifique os dados e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formCadastroCompra").reset()
                cadastroCompra.textContent = "Cadastrar"
                cadastroCompra.disabled = false
            })
    })
}
export default cadastrarCompra