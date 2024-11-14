document.getElementById('calculateButton').addEventListener('click', function() {
const input = document.getElementById('fibonacciInput').value;
const result = document.getElementById('result');
const chartCanvas = document.getElementById('fibonacciChart');
    
const numberInput = Number(input);
if (isNaN(numberInput) || !Number.isInteger(numberInput) || numberInput < 0) {
result.textContent = "Please enter a valid non-negative integer.";
return;
}

const fibonacci = (num) => {
let sequence = [0, 1];
for (let i = 2; i <= num; i++) {
sequence.push(sequence[i - 1] + sequence[i - 2]);
}
return sequence;
};

const fibSequence = fibonacci(numberInput);

if (!Array.isArray(fibSequence) || fibSequence.length === 0) {
result.textContent = "Error calculating the Fibonacci sequence.";
return;
}

result.textContent = `Fibonacci(${numberInput}) = ${fibSequence[numberInput]}`;

// Konfiguracja wykresu
const labels = [...Array(fibSequence.length).keys()];
const data = {
labels: labels,
datasets: [{
label: 'Fibonacci Sequence',
backgroundColor: '#1e90ff',
borderColor: '#4682b4',
data: fibSequence,
fill: false,
}]
};

const config = {
type: 'line',
data: data,
        options: {
         responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'n-th Fibonacci Number'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Value'
                    },
                    beginAtZero: true
                }
            }
        }
    };

    // Usunięcie starego wykresu, jeśli istnieje
    if (window.fibChart) {
        window.fibChart.destroy();
    }

    // Stworzenie nowego wykresu, jeśli dane są poprawne
    if (fibSequence.every(num => Number.isFinite(num))) {
        window.fibChart = new Chart(chartCanvas, config);
    } else {
        result.textContent = "Invalid data for chart generation.";
    }
});
