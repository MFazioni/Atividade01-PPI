document.addEventListener("DOMContentLoaded", function() {

    const quantityInput = document.getElementById("quantity");
    const totalSpan = document.getElementById("total");
    const pricePerTicket = 25.00;


    quantityInput.addEventListener("input", function() {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity)) {
            totalSpan.textContent = "0.00"; 
        } else {
            const total = quantity * pricePerTicket;
            totalSpan.textContent = total.toFixed(2);
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {

    const quantityInput = document.getElementById("quantity2");
    const totalSpan = document.getElementById("total");
    const pricePerTicket = 35.00;


    quantityInput.addEventListener("input", function() {
        const quantity = parseInt(quantityInput.value);
        if (isNaN(quantity)) {
            totalSpan.textContent = "0.00"; 
        } else {
            const total = quantity * pricePerTicket;
            totalSpan.textContent = total.toFixed(2);
        }
    });
});
