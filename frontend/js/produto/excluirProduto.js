export function excluirProduto() {
    let excluirProduto = document.getElementById("excluirProduto")
    let res = document.getElementById("res")
    excluirProduto.disabled = false
    excluirProduto.textContent = "Excluir"

    excluirProduto.addEventListener("click", async (e) => {
        e.preventDefault()
        let idProdutoExcluir = document.getElementById("idProdutoExcluir").value

        if (!idProdutoExcluir) {
            alert("Por favor, informe o ID do produto a ser excluído.")
            return
        }

        excluirProduto.textContent = "Excluindo..."
        excluirProduto.disabled = true

        await fetch(`http://localhost:3000/produto/${idProdutoExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir produto")
                return resp.json()
            })
            .then(() => {
                res.innerHTML = ``
                res.innerHTML += `<p>Produto ID ${idProdutoExcluir} excluído com sucesso!</p>`
                alert("Produto excluído com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir produto:", err)
                alert("Erro ao excluir produto. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirProduto").reset()
                excluirProduto.textContent = "Excluir"
                excluirProduto.disabled = false
            })
    })
}