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
document.addEventListener('DOMContentLoaded', function() {
  const runWorkflowButton = document.getElementById('run-workflow-button');

  runWorkflowButton.addEventListener('click', function() {
    const url = 'https://api.github.com/repos/Kimphunh/download-file/actions/workflows/download-file.yml/dispatches';
    const token = 'YOUR_GITHUB_TOKEN'; // Đảm bảo là một GitHub Personal Access Token có quyền truy cập repo

    const formData = {
      ref: 'main', // Hoặc thay bằng tên nhánh mà bạn muốn chạy workflow
      inputs: {
        file_url: 'YOUR_FILE_URL',
        file_name: 'YOUR_FILE_NAME'
      }
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `token ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to trigger workflow');
      }
      console.log('Workflow triggered successfully');
    })
    .catch(error => {
      console.error('Error triggering workflow:', error);
    });
  });
});
