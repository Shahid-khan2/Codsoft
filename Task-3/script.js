function appendToDisplay(value) {
    const display = document.getElementById('result');
    
    // Prevent multiple decimals
    if (value === '.' && display.value.includes('.')) {
        return;
    }
    
    // Prevent operators at start
    if ('+-*/%'.includes(value) && !display.value) {
        return;
    }
    
    display.value += value;
    
    // Add subtle animation
    display.style.transform = 'scale(1.02)';
    setTimeout(() => {
        display.style.transform = 'scale(1)';
    }, 100);
}

function clearDisplay() {
    const display = document.getElementById('result');
    display.value = '';
    
    // Add animation
    display.style.backgroundColor = 'var(--light-pink)';
    setTimeout(() => {
        display.style.backgroundColor = 'var(--soft-blue)';
    }, 300);
}

function backspace() {
    const display = document.getElementById('result');
    display.value = display.value.slice(0, -1);
    
    // Add animation
    display.style.transform = 'translateX(-3px)';
    setTimeout(() => {
        display.style.transform = 'translateX(0)';
    }, 100);
}

function calculate() {
    const display = document.getElementById('result');
    try {
        let expression = display.value;
        // Replace × with * for calculation
        expression = expression.replace(/×/g, '*');
        // Handle percentage calculations
        expression = expression.replace(/(\d+)%/g, '($1/100)');
        const result = eval(expression);
        display.value = result;
        
        // Success animation
        display.style.color = 'var(--light-pink)';
        setTimeout(() => {
            display.style.color = 'var(--text-color)';
        }, 300);
    } catch (error) {
        display.value = 'Error';
        display.style.color = '#ff6b6b';
        setTimeout(() => {
            clearDisplay();
        }, 1000);
    }
}

// Keyboard support
document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (/[0-9\.\+\-\*\/%]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        backspace();
    } else if (key === 'Escape' || key === 'c') {
        clearDisplay();
    }
});

// Add button press animation
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transform = 'translateY(2px)';
        this.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.05)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.05)';
    });
});