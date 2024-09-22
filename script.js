document.getElementById('calculateButton').addEventListener('click', function() {
    const input = document.getElementById('fibonacciInput').value;
    const result = document.getElementById('result');
    const chartCanvas = document.getElementById('fibonacciChart');

    if (input === "" || input < 0) {
        result.textContent = "Please enter a valid number.";
        return;
    }

    const fibonacci = (num) => {
        let sequence = [0, 1];
        for (let i = 2; i <= num; i++) {
            sequence.push(sequence[i - 1] + sequence[i - 2]);
        }
        return sequence;
    };

    const fibSequence = fibonacci(input);

    result.textContent = `Fibonacci(${input}) = ${fibSequence[input]}`;

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

    // Stworzenie nowego wykresu
    window.fibChart = new Chart(chartCanvas, config);
});
