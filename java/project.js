// Set the deadline date
const deadline = new Date();
deadline.setDate(deadline.getDate() + 10);

// Function to update the countdown timer display
const updateCountdown = () => {
    const now = new Date().getTime();
    const remainingTime = deadline - now;

    if (remainingTime < 0) {
        clearInterval(timer);
        displayExpirationMessage();
        return;
    }

    const { days, hours, minutes, seconds } = calculateTimeUnits(remainingTime);

    updateTimerDisplay(days, hours, minutes, seconds);
};

// Function to calculate days, hours, minutes, and seconds from milliseconds
const calculateTimeUnits = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
};

// Function to update the timer display with days, hours, minutes, and seconds
const updateTimerDisplay = (days, hours, minutes, seconds) => {
    document.querySelector('.days').textContent = formatTimeUnit(days);
    document.querySelector('.hours').textContent = formatTimeUnit(hours);
    document.querySelector('.minutes').textContent = formatTimeUnit(minutes);
    document.querySelector('.seconds').textContent = formatTimeUnit(seconds);
};

// Function to format time units (add leading zero if needed)
const formatTimeUnit = (value) => value.toString().padStart(2, '0');

// Function to display expiration message
const displayExpirationMessage = () => {
    document.querySelector('.deadline').innerHTML = `<h4 class="expired-message">
Sorry, this giveaway has expired!<br/> Please check back soon.</h4>`;
    document.querySelector('.expired-message').classList.add('expired');
};

// Function to format the date
const formatDate = (date) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};

// Initialize the countdown timer and display the formatted deadline
updateCountdown();
const timer = setInterval(updateCountdown, 1000);
document.querySelector('.giveaway').textContent = `Giveaway ends on ${formatDate(deadline)}`;