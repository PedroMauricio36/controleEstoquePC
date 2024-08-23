document.addEventListener("DOMContentLoaded", function () {
    if (document.getElementById("searchForm")) { // Código para a página de Consulta 
        const searchForm = document.getElementById("searchForm");
        const resultContent = document.getElementById("resultContent");

        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const searchBarcode = document.getElementById("searchBarcode").value;

            // Enviando a consulta ao servidor
            fetch(`/api/equipamentos/${searchBarcode}`)
                .then(response => response.json())
                .then(data => {
                    if (data.error) {
                        resultContent.textContent = "Equipamento não encontrado.";
                    } else {
                        resultContent.innerHTML = `
                            <strong>Nome:</strong> ${data.name}<br>
                            <strong>Descrição:</strong> ${data.description}
                        `;
                    }
                })
                .catch(error => {
                    console.error("Erro ao buscar equipamento:", error);
                    resultContent.textContent = "Ocorreu um erro ao consultar o equipamento.";
                });
        });
    }

    if (document.getElementById("registerForm")) { // Código para a página de Cadastramento
        const registerForm = document.getElementById("registerForm");

        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const barcode = document.getElementById("barcode").value;
            const name = document.getElementById("name").value;
            const description = document.getElementById("description").value;

            // Dados a serem enviados ao servidor
            const equipamento = {
                barcode,
                name,
                description
            };

            // Enviando o cadastro ao servidor
            fetch("/api/equipamentos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(equipamento)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert("Equipamento cadastrado com sucesso!");
                        registerForm.reset(); // Limpa o formulário após o sucesso
                    } else {
                        alert("Erro ao cadastrar equipamento: " + data.message);
                    }
                })
                .catch(error => {
                    console.error("Erro ao cadastrar equipamento:", error);
                    alert("Ocorreu um erro ao cadastrar o equipamento.");
                });
        });
    }
});