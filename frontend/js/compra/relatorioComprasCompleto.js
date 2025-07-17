export async function relatorioComprasCompleto() {
    let resRelatCompras = document.getElementById("resRelatCompras")
    let resRelatCompEstoqCritic = document.getElementById("resRelatCompEstoqCritic")
    let resRelatCompConsolidado = document.getElementById("resRelatCompConsolidado")

    resRelatCompras.innerHTML = ``
    resRelatCompras.innerHTML = `<label>Gerando relatório...</label>`

    await fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            if (dados.length <= 0) {
                resRelatCompras.innerHTML = `<label>Nenhuma compra cadastrada.</label>`
            } else {
                resRelatCompras.innerHTML = `
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
                    <tbody id="resRelatComprasText">

                    </tbody>
                </table>
                `
                dados.forEach(compra => {
                    let resRelatComprasText = document.getElementById("resRelatComprasText")
                    resRelatComprasText.innerHTML += `
                        <tr>
                            <td>${compra.id}</td>
                            <td>${compra.usuarioId}</td>
                            <td>${compra.produtoId}</td>
                            <td>${compra.quantidade}</td>
                            <td>${compra.dataCompra ? new Date().toLocaleDateString("pt-BR") : "-"}</td>
                            <td>${compra.precoUnitario.toFixed(2)}</td>
                            <td>${compra.formaPagamento}</td>
                            <td>${compra.status}</td>
                        </tr>
                    `
                })
            }
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de compras:", err)
            alert("Erro ao gerar relatório de compras. Tente novamente.")
            resRelatCompras.innerHTML = `<p>Erro ao gerar relatório de compras. Tente novamente.</p>`
        })

    resRelatCompEstoqCritic.innerHTML = ``
    resRelatCompEstoqCritic.innerHTML = `<label>Gerando relatório...</label>`

    await fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            if (dados.length <= 0) {
                resRelatCompEstoqCritic.innerHTML = `<label>Nenhuma compra cadastrada.</label>`
            } else {
                resRelatCompEstoqCritic.innerHTML = `
                <table border="1">
                    <thead>
                        <tr>
                            <th>COD Produto</th>
                            <th>Nome</th>
                            <th>Quantidade</th>
                            <th>Preço unitário</th>
                        </tr>
                    </thead>
                    <tbody id="resRelatEstoqCriticText">

                    </tbody>
                </table>
                `
                if (!dados.filter(prod => prod.quantidade <= 10)) {
                    resRelatCompEstoqCritic.innerHTML = `<label>Não foi encontrado nenhum produto com estoque crítico.</label>`
                    return
                } else {
                    dados.forEach(async compra => {

                        try {
                            const respProduto = await fetch(`http://localhost:3000/produto/${compra.produtoId}`)
                            const produto = await respProduto.json()
                            let resRelatEstoqCriticText = document.getElementById("resRelatEstoqCriticText")
                            resRelatEstoqCriticText.innerHTML += `
                                <tr>
                                    <td>${produto.id}</td>
                                    <td>${produto.titulo}</td>
                                    <td>${produto.estoque}</td>
                                    <td>${produto.preco}</td>
                                </tr>
                            `
                        } catch (err) {
                            console.error("Erro ao consultar o produto no estoque crítico")
                        }
                    })
                }
            }
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de estoque crítico:", err)
            alert("Erro ao gerar relatório de estoque crítico. Tente novamente.")
            resRelatCompEstoqCritic.innerHTML = `<p>Erro ao gerar relatório de estoque crítico. Tente novamente.</p>`
        })

    resRelatCompConsolidado.innerHTML = ``
    resRelatCompConsolidado.innerHTML = `<label>Gerando relatório...</label>`

    await fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(async dados => {
            if (dados.length <= 0) {
                resRelatCompConsolidado.innerHTML = `<label>Nenhuma compra cadastrada.</label>`
            } else {
                resRelatCompConsolidado.innerHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>Nome do usuário</th>
                        <th>Nome do produto</th>
                        <th>Quantidade</th>
                        <th>Data da compra</th>
                        <th>Forma de pagamento</th>
                        <th>Status</th>
                        <th>Valor Final</th>
                    </tr>
                </thead>
                <tbody id="resRelatCompConsolidadoText">

                </tbody>
            </table>
            `
                for (const compra of dados) {
                    let nomeUsuario = ""
                    let nomeProduto = ""
                    try {
                        const respUsuario = await fetch(`http://localhost:3000/usuario/${compra.usuarioId}`)
                        const usuario = await respUsuario.json()
                        nomeUsuario = `${usuario.primeiroNome} ${usuario.segundoNome}`
                    } catch {
                        nomeUsuario = "Usuário não encontrado"
                    }
                    try {
                        const respProduto = await fetch(`http://localhost:3000/produto/${compra.produtoId}`)
                        const produto = await respProduto.json()
                        nomeProduto = produto.titulo
                    } catch {
                        nomeProduto = "Produto não encontrado"
                    }
                    let resRelatCompConsolidadoText = document.getElementById("resRelatCompConsolidadoText")
                    resRelatCompConsolidadoText.innerHTML += `
                        <tr>
                            <td>${nomeUsuario}</td>
                            <td>${nomeProduto}</td>
                            <td>${compra.quantidade}</td>
                            <td>${compra.dataCompra ? new Date(compra.dataCompra).toLocaleDateString("pt-BR") : "-"}</td>
                            <td>${compra.formaPagamento}</td>
                            <td>${compra.status}</td>
                            <td>${(compra.precoUnitario * compra.quantidade).toFixed(2)}</td>
                        </tr>
                    `
                }

            }
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de compras:", err)
            alert("Erro ao gerar relatório de compras. Tente novamente.")
            resRelatCompConsolidado.innerHTML = `<p>Erro ao gerar relatório de compras. Tente novamente.</p>`
        })
}