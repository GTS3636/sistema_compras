export function cadastrarCompra(e) {
    let cadastroCompra = document.getElementById("cadastrarCompra")
    let res = document.getElementById("res")
    cadastroCompra.disabled = false
    cadastroCompra.textContent = "Cadastrar"

    cadastroCompra.addEventListener("click", async (e) => {
        e.preventDefault()

        let idUsuario = document.getElementById("idUsuario").value
        let idProduto = document.getElementById("idProduto").value
        let quantidade = Number(document.getElementById("quantidade").value)
        let formaPagamento = document.getElementById("formaPagamento").value
        let status = document.getElementById("status").value

        if (!idUsuario || !idProduto || !quantidade) {
            alert("Por favor, preencha todos os campos.")
            return
        }

        cadastroCompra.textContent = "Cadastrando..."
        cadastroCompra.disabled = true

        let estoqueProduto = 0
        let precoUnitarioProduto = 0
        let dataAtual = new Date().toISOString("pt-BR").split("T")

        await fetch(`http://localhost:3000/produto/${idProduto}`)
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                return resp.json()
            })
            .then(produto => {
                estoqueProduto = produto.estoque
                console.log("Estoque produto antes da subtração: ", estoqueProduto)
                if (quantidade > estoqueProduto) {
                    alert("Quantidade solicitada excede o estoque disponível.")
                    cadastroCompra.textContent = "Cadastrar"
                    cadastroCompra.disabled = false
                    quantidade.focus()
                    throw new Error("Quantidade solicitada excede o estoque disponível.")
                }
                precoUnitarioProduto = produto.preco
            })
            .catch((err) => {
                console.error("Erro no fetch para consultar o estoque do produto: ", err)
                res.innerHTML = `<p>Erro ao consultar o produto.</p>`
            })

        const valores = {
            usuarioId: idUsuario,
            produtoId: idProduto,
            quantidade: quantidade,
            dataCompra: dataAtual,
            formaPagamento: formaPagamento,
            precoUnitario: precoUnitarioProduto,
            status: status
        }

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
            .then(async compra => {
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
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody id="tbodyCompras">
                                    <tr>
                                        <td>${compra.id}</td>
                                        <td>${idUsuario}</td>
                                        <td>${idProduto}</td>
                                        <td>${compra.quantidade}</td>
                                        <td>${compra.dataCompra ? compra.dataCompra : "Não definida"}</td>
                                        <td>R$ ${compra.precoUnitario.toFixed(2)}</td>
                                        <td>${compra.formaPagamento}</td>
                                        <td>${compra.status}</td>
                                        <td>${(quantidade * precoUnitarioProduto).toFixed(2)}</td>
                                    </tr>
                                </tbody>
                            </table>
                `
                estoqueProduto -= quantidade
                console.log("Estoque produto depois da subtração: ",estoqueProduto)
                await fetch(`http://localhost:3000/produto/${idProduto}`,{
                    method: "PUT",
                    headers:{ "Content-Type":"application/json" },
                    body:JSON.stringify({estoque:estoqueProduto})
                })
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no atualizar o estoque do produto")
                        return resp.json()
                    })
                    .then(produto => {
                        console.log("Produto atualizado: ",produto)
                    })
                    .catch((err)=>{
                        console.error("Erro no fetch de atualizar o estoque do produto: ",err)
                    })
            })
            .catch((err) => {
                console.error("Erro ao cadastrar compra:", err)
                res.innerHTML = `<p>Erro ao cadastrar a compra.</p>`
            })
            .finally(() => {
                document.getElementById("formCadastroCompra").reset()
                cadastroCompra.textContent = "Cadastrar"
                cadastroCompra.disabled = false
            })
    })
}