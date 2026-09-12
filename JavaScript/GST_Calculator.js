document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('gstForm');
    const amountInput = document.getElementById('amount');
    const gstRateInput = document.getElementById('gstRate');
    const resultBox = document.getElementById('result');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const amount = parseFloat(amountInput.value);
        const gstRate = parseFloat(gstRateInput.value);

        if (isNaN(amount) || isNaN(gstRate)) {
            resultBox.textContent = 'Please enter valid numbers.';
            return;
        }

        if (amount < 0 || gstRate < 0) {
            resultBox.textContent = 'Amount and GST rate cannot be negative.';
            return;
        }

        const gstAmount = (amount * gstRate) / 100;
        const totalWithGst = amount + gstAmount;

        resultBox.textContent = `GST: ${gstAmount.toFixed(2)} | Total: ${totalWithGst.toFixed(2)}`;
    });
});
