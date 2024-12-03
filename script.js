// Define units and their conversion factors relative to a base unit for each type
const units = {
    mass: {
        gram: 1,
        kilogram: 1000,
        pound: 453.592,
        ounce: 28.3495
    },
    volume: {
        liter: 1,
        milliliter: 0.001,
        gallon: 3.78541,
        pint: 0.473176
    },
    distance: {
        meter: 1,
        kilometer: 1000,
        mile: 1609.34,
        foot: 0.3048,
        inch: 0.0254
    },
    memory: {
        byte: 1,
        kilobyte: 1024,
        megabyte: 1048576,
        gigabyte: 1073741824,
        terabyte: 1099511627776
    },
    area: {
        'square meter': 1,
        'square kilometer': 1e6,
        'square mile': 2.59e6,
        'acre': 4046.86,
        'hectare': 10000
    },
    time: {
        second: 1,
        minute: 60,
        hour: 3600,
        day: 86400,
        week: 604800,
        year: 31536000
    }
};

// Get DOM elements
const unitTypeSelect = document.getElementById('unitType');
const fromUnitSelect = document.getElementById('fromUnit');
const toUnitSelect = document.getElementById('toUnit');
const fromValueInput = document.getElementById('fromValue');
const toValueInput = document.getElementById('toValue');

// Function to populate unit options based on selected unit type
function populateUnits() {
    const selectedUnitType = unitTypeSelect.value;
    const unitOptions = units[selectedUnitType];

    // Clear existing options
    fromUnitSelect.innerHTML = '';
    toUnitSelect.innerHTML = '';

    // Populate new options
    for (let unit in unitOptions) {
        const optionFrom = document.createElement('option');
        optionFrom.value = unit;
        optionFrom.textContent = unit;
        fromUnitSelect.appendChild(optionFrom);

        const optionTo = document.createElement('option');
        optionTo.value = unit;
        optionTo.textContent = unit;
        toUnitSelect.appendChild(optionTo);
    }

    // Perform initial conversion
    convertUnits();
}

// Function to perform the conversion
function convertUnits() {
    const input = parseFloat(fromValueInput.value);
    const fromUnit = fromUnitSelect.value;
    const toUnit = toUnitSelect.value;
    const selectedUnitType = unitTypeSelect.value;

    if (isNaN(input)) {
        toValueInput.value = '';
        return;
    }

    const fromFactor = units[selectedUnitType][fromUnit];
    const toFactor = units[selectedUnitType][toUnit];

    // Convert input to base unit, then to target unit
    const valueInBaseUnit = input * fromFactor;
    const convertedValue = valueInBaseUnit / toFactor;

    toValueInput.value = convertedValue;
}

// Initialize units on page load
populateUnits();

// Update units when unit type changes
unitTypeSelect.addEventListener('change', populateUnits);

// Add event listeners to inputs and selects
fromUnitSelect.addEventListener('change', convertUnits);
toUnitSelect.addEventListener('change', convertUnits);
fromValueInput.addEventListener('input', convertUnits);