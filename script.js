document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity");
    const totalSpan = document.getElementById("total");
    const pricePerTicket = 25.00;  // Exemplo de preço por ingresso

    quantityInput.addEventListener("input", function() {
        const quantity = parseInt(quantityInput.value);
        const total = quantity * pricePerTicket;
        totalSpan.textContent = total.toFixed(2);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const quantityInput = document.getElementById("quantity2");
    const totalSpan = document.getElementById("total");
    const pricePerTicket = 35.00;

    quantityInput.addEventListener("input", function() {
        const quantity = parseInt(quantityInput.value);
        const total = quantity * pricePerTicket;
        totalSpan.textContent = total.toFixed(2);
    });
});