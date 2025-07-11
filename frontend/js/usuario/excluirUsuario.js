export function excluirUsuario() {
    let excluirUsuario = document.getElementById("excluirUsuario")
    let res = document.getElementById("res")
    excluirUsuario.disabled = false
    excluirUsuario.textContent = "Excluir"

    excluirUsuario.addEventListener("click", async (e) => {
        e.preventDefault()
        let idUsuarioExcluir = document.getElementById("idUsuarioExcluir").value

        if (!idUsuarioExcluir) {
            alert("Por favor, informe o ID do usuário a ser excluído.")
            return
        }

        excluirUsuario.disabled = true
        excluirUsuario.textContent = "Excluindo..."

        await fetch(`http://localhost:3000/usuario/${idUsuarioExcluir}`, {
            method: "DELETE"
        })
            .then(resp => {
                if (!resp.ok) throw new Error("Erro ao receber a resposta no excluir usuário")
                return resp.json()
            })
            .then(data => {
                res.innerHTML = ``
                res.innerHTML += `<p>${data.message}</p>`
                res.innerHTML += `<p>Usuário ID ${idUsuarioExcluir} excluído com sucesso!</p>`
                alert("Usuário excluído com sucesso!")
            })
            .catch((err) => {
                console.error("Erro ao excluir usuário:", err)
                alert("Erro ao excluir usuário. Verifique o ID e tente novamente.")
            })
            .finally(() => {
                document.getElementById("formExcluirUsuario").reset()
                excluirUsuario.textContent = "Excluir"
                excluirUsuario.disabled = false
            })
    })
}