let resRelatProd = document.getElementById("resRelatProd")
let exibirRelatProd = document.getElementById("exibirRelatProd")

exibirRelatProd.addEventListener("click", async (e) => {
    e.preventDefault()
    resRelatProd.innerHTML = ""
    await fetch("http://localhost:3000/produtos")
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro na resposta do banco de dados.")
            } return resp.json()
        })
        .then(dados => {
            dados.forEach(produto => {
                resRelatProd.innerHTML = `
                <table border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Categoria</th>
                            <th>Preço</th>
                            <th>Desconto (%)</th>
                            <th>Valor em Estoque</th>
                        </tr>
                    </thead>
                    <tbody id="resRelatProdText">
                        <!-- Dados serão inseridos aqui -->
                    </tbody>
                </table>
                `
                let resRelatProdText = document.getElementById("resRelatProdText")
                resRelatProdText.innerHTML = ``
                resRelatProdText.innerHTML += `
                <tr>
                    <td>${produto.id}</td>
                    <td>${produto.title}</td>
                    <td>${produto.category}</td>
                    <td>${(produto.price).toFixed(2)}</td>
                    <td>${produto.discountPercentual}%</td>
                    <td>${(produto.stock * produto.price).toFixed(2)}</td>
                </tr>
            `
            })
        })
})