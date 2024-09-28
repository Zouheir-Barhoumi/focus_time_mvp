const readline = require('readline');

let hours = 0, minutes = 0, seconds = 0;
let intervalId = null;

// Function to update the display of the timer
function updateDisplay() {
    const h = String(hours).padStart(2, '0');
    const m = String(minutes).padStart(2, '0');
    const s = String(seconds).padStart(2, '0');
    console.clear();
    // console.log(`\nTimer: ${h}:${m}:${s}\n`);
    console.log(`\nTimer:\n
    ————————————————————————————————————
    |           |           |           |                                
    |    ${h}     |    ${m}     |    ${s}     |
    |           |           |           |                                
    ————————————————————————————————————
\n
`);
}

// Countdown logic
function startCountdown() {
    if (intervalId !== null) return; // Prevent multiple intervals

    intervalId = setInterval(() => {
        if (hours === 0 && minutes === 0 && seconds === 0) {
            clearInterval(intervalId);
            intervalId = null;
            console.log("\nTime's up!\n");
            process.exit(0);
        }

        if (seconds === 0) {
            if (minutes === 0) {
                hours--;
                minutes = 59;
            } else {
                minutes--;
            }
            seconds = 59;
        } else {
            seconds--;
        }
        updateDisplay();
    }, 1000);
}

// Setup for command-line interaction
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askAction() {
    console.log(`Actions: 
    1. Increment Hours
    2. Decrement Hours
    3. Increment Minutes
    4. Decrement Minutes
    5. Increment Seconds
    6. Decrement Seconds
    7. Start Timer
    8. Quit\n`);

    rl.question('Choose an action (1-8): ', (answer) => {
        handleAction(answer);
    });
}

function handleAction(action) {
    switch (action) {
        case '1':
            hours = (hours + 1) % 100;
            updateDisplay();
            askAction();
            break;
        case '2':
            hours = (hours - 1 + 100) % 100;
            updateDisplay();
            askAction();
            break;
        case '3':
            minutes = (minutes + 1) % 60;
            updateDisplay();
            askAction();
            break;
        case '4':
            minutes = (minutes - 1 + 60) % 60;
            updateDisplay();
            askAction();
            break;
        case '5':
            seconds = (seconds + 1) % 60;
            updateDisplay();
            askAction();
            break;
        case '6':
            seconds = (seconds - 1 + 60) % 60;
            updateDisplay();
            askAction();
            break;
        case '7':
            startCountdown();
            break;
        case '8':
            console.log('Exiting...');
            process.exit(0);
            break;
        default:
            console.log('Invalid action, please choose a valid option.');
            askAction();
    }
}

// Initial timer display and start the action loop
updateDisplay();
askAction();

