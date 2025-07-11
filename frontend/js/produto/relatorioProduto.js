async function relatorioProduto() {
    let resRelatProd = document.getElementById("resRelatProd")
    resRelatProd.innerHTML = ``
    resRelatProd.innerHTML = `<label>Gerando relatório...</label>`
    await fetch("http://localhost:3000/produtos")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            resRelatProd.innerHTML = `<h2>Relatório de Produtos</h2><br>`
            resRelatProd.innerHTML += `
                <table border="1">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Desconto (%)</th>
                            <th>Valor em Estoque</th>
                        </tr>
                    </thead>
                    <tbody id="resRelatProdText">

                    </tbody>
                </table>
                `
            dados.forEach(produto => {
                let resRelatProdText = document.getElementById("resRelatProdText")
                resRelatProdText.innerHTML = ``
                resRelatProdText.innerHTML += `
                <tr>
                    <td>${produto.title}</td>
                    <td>${produto.category}</td>
                    <td>${(produto.price).toFixed(2)}</td>
                    <td>${produto.discountPercentual}%</td>
                    <td>${(produto.stock * produto.price).toFixed(2)}</td>
                </tr>
            `
            })
        })
}
export default relatorioProduto