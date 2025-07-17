export async function relatorioProduto() {
    let resRelatProd = document.getElementById("resRelatProd")
    resRelatProd.innerHTML = ``
    resRelatProd.innerHTML = `<label>Gerando relatório...</label>`
    await fetch("http://localhost:3000/produto")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            resRelatProd.innerHTML = `
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
                resRelatProdText.innerHTML += `
                <tr>
                    <td>${produto.titulo}</td>
                    <td>${produto.categoria}</td>
                    <td>${produto.preco}</td>
                    <td>${produto.percentualDesconto}%</td>
                    <td>${(produto.estoque * produto.preco).toFixed(2)}</td>
                </tr>
            `
            })
        })
        .catch((err)=>{
            console.error("Erro no recebimento dos dados no relatório do produto: ",err)
        })
}
