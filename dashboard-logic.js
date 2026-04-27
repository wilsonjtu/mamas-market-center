function updateRefreshTime() {
    var now = new Date();
    var dat = (now.getMonth() + 1) + "/" + (((now.getDate() < 10) ? "0" : "") + now.getDate()) + "/" + now.getFullYear();
    var hours = now.getHours();
    var ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var tim = hours + (((now.getMinutes() < 10) ? ":0" : ":") + now.getMinutes()) + (((now.getSeconds() < 10) ? ":0" : ":") + now.getSeconds()) + ampm;
    
    var clockEl = document.getElementById('clock');
    if(clockEl) {
        clockEl.innerHTML = "Last Refresh: " + dat + " - " + tim;
    }
}

let currentDuration = 1; // Default to 1 day

function updateRefreshTime() {
    var now = new Date();
    var dat = (now.getMonth() + 1) + "/" + (((now.getDate() < 10) ? "0" : "") + now.getDate()) + "/" + now.getFullYear();
    var hours = now.getHours();
    var ampm = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    var tim = hours + (((now.getMinutes() < 10) ? ":0" : ":") + now.getMinutes()) + (((now.getSeconds() < 10) ? ":0" : ":") + now.getSeconds()) + ampm;
    
    var clockEl = document.getElementById('clock');
    if(clockEl) clockEl.innerHTML = "Last Refresh: " + dat + " - " + tim;
}

function refreshCharts() {
    const charts = document.querySelectorAll('.chart-table img');
    charts.forEach(img => {
        const url = new URL(img.src);
        // Apply the duration parameter
        url.searchParams.set('duration', currentDuration);
        // Force refresh with a timestamp
        url.searchParams.set('t', new Date().getTime());
        img.src = url.href;
    });
    updateRefreshTime();
}

function setChartDuration(days, btnElement) {
    currentDuration = days;
    
    // Update active button styling
    document.querySelectorAll('.dur-btn').forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');
    
    // Refresh immediately to show the new timeframe
    refreshCharts();
}

// Initial load
refreshCharts();
setInterval(refreshCharts, 300000);
