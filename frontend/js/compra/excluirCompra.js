function excluirCompra() {
    let excluirCompra = document.getElementById("excluirCompra")
    let res = document.getElementById("res")
    excluirCompra.disabled = false
    excluirCompra.textContent = "Excluir"

    excluirCompra.addEventListener("click", async (e) => {
        e.preventDefault()
        let idCompraExcluir = document.getElementById("idCompraExcluir").value

        if (!idCompraExcluir) {
            alert("Por favor, informe o ID da compra a ser excluída.")
            return
        }

        excluirCompra.disabled = true
        excluirCompra.textContent = "Excluindo..."

        await fetch(`http://localhost:3000/compra/${idCompraExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir compra")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                res.innerHTML += `<p>${data.message}</p>`
                res.innerHTML += `<p>Compra ID ${idCompraExcluir} excluída com sucesso!</p>`
                alert("Compra excluída com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir compra:", err)
                alert("Erro ao excluir compra. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirCompra").reset()
                excluirCompra.textContent = "Excluir"
                excluirCompra.disabled = false
            })
    })
}
export default excluirCompra