let head = document.querySelector("head").document.addEventListener("change", async (e) => {
    let res = document.getElementById("res")
    e.preventDefault()
    res.innerHTML = "" // Limpa o conteúdo da div de resultados
    const valores = {
        title: document.getElementById("titulo").value,
        description: document.getElementById("descricao").value,
        category: document.getElementById("categoria").value,
        price: parseFloat(document.getElementById("preco").value),
        discountPercentual: parseFloat(document.getElementById("percentualDesconto").value),
        stock: parseInt(document.getElementById("estoque").value),
        brand: document.getElementById("marca").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    await fetch("http://localhost:3000/produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(valores)
    })
        .then(resp => {
            if (!resp.ok) {
                throw new Error("Erro ao enviar os dados ao banco de dados")
            } return resp.json()
        })
        .then(dados => {
            res.innerHTML = ``
            res.innerHTML = `
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Desconto (%)</th>
                        <th>Valor em Estoque</th>
                        <th>Estoque</th>
                        <th>Marca</th>
                        <th>Thumbnail</th>
                    </tr>
                </thead>
                <tbody id="resRelatProdText">

                </tbody>
            </table>
            `
            let resRelatProdText = document.getElementById("resRelatProdText")
            resRelatProdText.innerHTML = ``
            resRelatProdText.innerHTML += `
                <tr>
                    <td>${dados.id}</td>
                    <td>${dados.title}</td>
                    <td>${dados.category}</td>
                    <td>${dados.description}</td>
                    <td>${(dados.price).toFixed(2)}</td>
                    <td>${dados.discountPercentual}%</td>
                    <td>${(dados.stock * dados.price).toFixed(2)}</td>
                    <td>${dados.stock}</td>
                    <td>${dados.brand}</td>
                    <td><img class="thumbnail" src="${dados.thumbnail}" alt="${dados.thumbnail}"></td>
                </tr>
            `
        })
})