let res = document.getElementById("res")
let cadastroProduto = document.getElementById("cadastroProduto")
cadastroProduto.addEventListener("click", async (e) => {
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
})