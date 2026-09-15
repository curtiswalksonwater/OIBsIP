const temperatureInput = document.getElementById('temperature');
const unitSelect = document.getElementById('unit');
const convertBtn = document.getElementById('convertBtn');
const celsiusResult = document.getElementById('celsiusResult');
const fahrenheitResult = document.getElementById('fahrenheitResult');
const kelvinResult = document.getElementById('kelvinResult');
const errorMessage = document.getElementById('errorMessage');
const errorDisplay = document.getElementById('errorDisplay');

function celsiusToFahrenheit(celsius) {
    return (celsius * 9/5) + 32;
}

function celsiusToKelvin(celsius) {
    return celsius + 273.15;
}

function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5/9;
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15;
}

function validateInput(value, unit) {
    if (value === '' || isNaN(value)) {
        return { valid: false, message: 'Please enter a valid number' };
    }

    const numValue = parseFloat(value);

    if (unit === 'celsius' && numValue < -273.15) {
        return { valid: false, message: 'Temperature cannot be below absolute zero (-273.15°C)' };
    }
    if (unit === 'fahrenheit' && numValue < -459.67) {
        return { valid: false, message: 'Temperature cannot be below absolute zero (-459.67°F)' };
    }
    if (unit === 'kelvin' && numValue < 0) {
        return { valid: false, message: 'Temperature cannot be below absolute zero (0 K)' };
    }

    return { valid: true, value: numValue };
}

function convertTemperature() {
    const inputValue = temperatureInput.value.trim();
    const unit = unitSelect.value;

    errorMessage.textContent = '';
    errorDisplay.classList.remove('show');
    temperatureInput.classList.remove('error');

    const validation = validateInput(inputValue, unit);

    if (!validation.valid) {
        errorMessage.textContent = validation.message;
        temperatureInput.classList.add('error');
        return;
    }

    const value = validation.value;
    let celsius, fahrenheit, kelvin;

    switch (unit) {
        case 'celsius':
            celsius = value;
            fahrenheit = celsiusToFahrenheit(value);
            kelvin = celsiusToKelvin(value);
            break;
        case 'fahrenheit':
            celsius = fahrenheitToCelsius(value);
            fahrenheit = value;
            kelvin = celsiusToKelvin(celsius);
            break;
        case 'kelvin':
            celsius = kelvinToCelsius(value);
            fahrenheit = celsiusToFahrenheit(celsius);
            kelvin = value;
            break;
    }

    celsiusResult.textContent = celsius.toFixed(2) + ' °C';
    fahrenheitResult.textContent = fahrenheit.toFixed(2) + ' °F';
    kelvinResult.textContent = kelvin.toFixed(2) + ' K';

    if (celsius < -273.15) {
        errorDisplay.textContent = 'Warning: The converted temperature is below absolute zero!';
        errorDisplay.classList.add('show');
    }
}

convertBtn.addEventListener('click', convertTemperature);

temperatureInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        convertTemperature();
    }
});

temperatureInput.addEventListener('input', () => {
    if (temperatureInput.classList.contains('error')) {
        temperatureInput.classList.remove('error');
        errorMessage.textContent = '';
    }
});
