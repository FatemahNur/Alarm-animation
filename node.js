let alarmTime;
let alarmTimeout;
let snoozeTimeout;
let alarmRunning = false;

function setAlarm() {
    const inputTime = document.getElementById('alarmTime').value;
    if (!inputTime) {
        alert('Please set a valid time for the alarm.');
        return;
    }

    const alarmMessage = document.getElementById('alarm-message');
    alarmMessage.innerText = `Alarm set for ${inputTime}`;

    const [hours, minutes] = inputTime.split(':');
    const now = new Date();
    alarmTime = new Date();

    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);

    const timeDifference = alarmTime.getTime() - now.getTime();

    if (timeDifference <= 0) {
        alert('The selected time has already passed. Please select a future time.');
        return;
    }

    clearTimeout(alarmTimeout);
    alarmTimeout = setTimeout(triggerAlarm, timeDifference);
}

function triggerAlarm() {
    const alarmMessage = document.getElementById('alarm-message');
    alarmMessage.innerText = 'ALARM! Wake up!';
    
    const alarmAnimation = document.getElementById('alarm-animation');
    alarmAnimation.style.display = 'block';

    const alarmControls = document.getElementById('alarm-controls');
    alarmControls.style.display = 'block';

    const audio = document.getElementById('alarm-sound');
    audio.play();
    alarmRunning = true;
}

function stopAlarm() {
    const alarmMessage = document.getElementById('alarm-message');
    alarmMessage.innerText = '';
    
    const alarmAnimation = document.getElementById('alarm-animation');
    alarmAnimation.style.display = 'none';

    const alarmControls = document.getElementById('alarm-controls');
    alarmControls.style.display = 'none';

    const audio = document.getElementById('alarm-sound');
    audio.pause();
    audio.currentTime = 0;

    clearTimeout(alarmTimeout);
    clearTimeout(snoozeTimeout);
    alarmRunning = false;
}

function snoozeAlarm() {
    stopAlarm();
    const snoozeTime = 5 * 60 * 1000; // 5 minutes snooze
    snoozeTimeout = setTimeout(triggerAlarm, snoozeTime);

    const alarmMessage = document.getElementById('alarm-message');
    alarmMessage.innerText = `Snoozed for 5 minutes`;
}
