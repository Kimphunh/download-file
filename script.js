document.addEventListener('DOMContentLoaded', function() {
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  const fileSize = document.getElementById('file-size');
  const timeLeft = document.getElementById('time-left');
  const openFileButton = document.getElementById('open-file-button');

  // Update progress bar
  function updateProgress(percentage) {
    progressBar.style.width = percentage + '%';
    progressText.textContent = percentage + '%';
  }

  // Update file size
  function updateFileSize(size) {
    fileSize.textContent = 'File size: ' + size + ' MB';
  }

  // Update time left
  function updateTimeLeft(time) {
    timeLeft.textContent = 'Time left: ' + time + ' seconds';
  }

  // Simulate progress update
  let progress = 0;
  const fileSizeMB = 100;
  const downloadSpeedMBps = 10;
  const totalSeconds = fileSizeMB / downloadSpeedMBps;
  const updateInterval = totalSeconds / 100;

  const progressInterval = setInterval(() => {
    progress += 1;
    const percentage = Math.min(progress, 100);
    const time = Math.max(Math.ceil(totalSeconds - (progress * updateInterval)), 0);

    updateProgress(percentage);
    updateFileSize(fileSizeMB);
    updateTimeLeft(time);

    if (progress >= 100) {
      clearInterval(progressInterval);
      openFileButton.disabled = false;
    }
  }, updateInterval * 1000);

  // Open downloaded file
  openFileButton.addEventListener('click', function() {
    // Add logic to open downloaded file here
    console.log('Opening downloaded file...');
  });
});
