function calculateGST() {
    const amount = parseFloat(document.getElementById("amount").value);
    const gstPercentage = parseFloat(document.getElementById("gst").value);

    if (isNaN(amount) || isNaN(gstPercentage)) {
        document.getElementById("result").innerHTML = "Please enter valid numbers.";
        return;
    }

    const gstAmount = (amount * gstPercentage) / 100;
    const totalAmount = amount + gstAmount;

    document.getElementById("result").innerHTML = `GST Amount: $${gstAmount.toFixed(2)}<br>Total Amount: $${totalAmount.toFixed(2)}`;
}

function resetFields() {
    document.getElementById("amount").value = "";
    document.getElementById("gst").value = "";
    document.getElementById("result").innerHTML = "";
}