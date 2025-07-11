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
            resRelatCompras.innerHTML = `<h2>Relatório de Compras</h2><br>`
            resRelatCompras.innerHTML += `
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
                resRelatComprasText.innerHTML = ``
                resRelatComprasText.innerHTML += `
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
            `
            })
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
            resRelatCompEstoqCritic.innerHTML = `<h2>Relatório de Estoque Crítico</h2><br>`
            resRelatCompEstoqCritic.innerHTML += `
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
            dados.forEach(produto => {
                if (produto.estoque <= 10) {
                    // Considerando estoque crítico quando a quantidade é menor ou igual a 10
                    let resRelatEstoqCriticText = document.getElementById("resRelatEstoqCriticText")
                    resRelatEstoqCriticText.innerHTML += `
                    <tr>
                        <td>${produto.id}</td>
                        <td>${produto.titulo}</td>
                        <td>${produto.estoque}</td>
                        <td>${produto.preco.toFixed(2)}</td>
                    </tr>
                `
                }
                if (!produto.estoque.find(estoque => estoque <= 10)) {
                    resRelatCompEstoqCritic.innerHTML = `<p>Não foi encontrado nenhum produto com estoque crítico.</p>`
                }
            })
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de estoque crítico:", err)
            alert("Erro ao gerar relatório de estoque crítico. Tente novamente.")
            resRelatCompEstoqCritic.innerHTML = `<p>Erro ao gerar relatório de estoque crítico. Tente novamente.</p>`
        })

    resRelatCompConsolidado.innerHTML = ``
    resRelatCompConsolidado.innerHTML = `<label>Gerando relatório...</label>`

    let nomeUsuario = ""
    let nomeProduto = ""

    await fetch("http://localhost:3000/compra")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            resRelatCompConsolidado.innerHTML = `<h2>Relatório de Compras</h2><br>`
            resRelatCompConsolidado.innerHTML += `
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
                <tbody id="resRelatComprasText">

                </tbody>
            </table>
            `
            dados.forEach(async compra => {
                await fetch(`http://localhost:3000/usuario/${compra.idUsuario}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar usuário")
                        return resp.json()
                    })
                    .then(usuario => {
                        if (usuario) {
                            nomeUsuario = `${usuario.primeiroNome} ${usuario.segundoNome}`
                        } else {
                            nomeUsuario = "Usuário não encontrado"
                        }
                    })
                    .catch((err) => {
                        console.error("Erro ao consultar usuário:", err)
                    })

                await fetch(`http://localhost:3000/produto/${compra.idProduto}`)
                    .then(resp => {
                        if (!resp.ok) throw new Error("Erro ao receber a resposta no consultar produto")
                        return resp.json()
                    })
                    .then(produto => {
                        if (produto) {
                            nomeProduto = produto.titulo
                        } else {
                            nomeProduto = "Produto não encontrado"
                        }
                    })
                    .catch((err)=>{
                        console.error("Erro ao consultar produto:", err)
                    })

                let resRelatComprasText = document.getElementById("resRelatComprasText")
                resRelatComprasText.innerHTML = ``
                resRelatComprasText.innerHTML += `
                    <tr>
                        <td>${nomeUsuario}</td>
                        <td>${nomeProduto}</td>
                        <td>${compra.quantidade}</td>
                        <td>${compra.dataCompra}</td>
                        <td>${compra.formaPagamento}</td>
                        <td>${compra.status}</td>
                        <td>${(compra.precoUnitario * compra.quantidade).toFixed(2)}</td>
                    </tr>
                `
            })
        })
        .catch((err) => {
            console.error("Erro ao gerar relatório de compras:", err)
            alert("Erro ao gerar relatório de compras. Tente novamente.")
            resRelatCompConsolidado.innerHTML = `<p>Erro ao gerar relatório de compras. Tente novamente.</p>`
        })
}