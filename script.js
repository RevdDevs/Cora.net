document.addEventListener('DOMContentLoaded', () => {
  const guestModeButton = document.getElementById('guestModeButton');
  const inputForm = document.getElementById('inputForm');
  const guestModeScreen = document.getElementById('guestModeScreen');
  const upButton = document.getElementById('upButton');
  const evidenceInput = document.getElementById('evidence');
  const previewImage = document.getElementById('previewImage');
  const previewVideo = document.getElementById('previewVideo');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const previewContainer = document.getElementById('previewContainer');
  const uploadButton = document.getElementById('uploadButton');
  const displayArea = document.getElementById('displayArea');

  inputForm.style.display = 'none';
  guestModeScreen.style.display = 'flex';

  guestModeButton.addEventListener('click', function() {
    inputForm.style.display = 'none';
    guestModeScreen.style.display = 'flex';
  });

  upButton.addEventListener('click', function() {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000';

    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#333';
    modalContent.style.padding = '20px';
    modalContent.style.borderRadius = '5px';
    modalContent.style.textAlign = 'center';

    const label = document.createElement('label');
    label.textContent = 'Please enter the code to proceed:';
    label.style.display = 'block';
    label.style.marginBottom = '10px';
    label.style.color = '#eee';

    const input = document.createElement('input');
    input.type = 'password';
    input.style.width = '200px';
    input.style.padding = '8px';
    input.style.margin = '5px 0';
    input.style.backgroundColor = '#444';
    input.style.color = '#eee';
    input.style.border = '1px solid #555';
    input.style.borderRadius = '4px';

    const confirmButton = document.createElement('button');
    confirmButton.textContent = 'Confirm';
    confirmButton.style.backgroundColor = '#5cb85c';
    confirmButton.style.color = 'white';
    confirmButton.style.padding = '10px 15px';
    confirmButton.style.border = 'none';
    confirmButton.style.borderRadius = '4px';
    confirmButton.style.cursor = 'pointer';
    confirmButton.style.marginRight = '10px';

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.backgroundColor = '#d9534f';
    cancelButton.style.color = 'white';
    cancelButton.style.padding = '10px 15px';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '4px';
    cancelButton.style.cursor = 'pointer';

    modalContent.appendChild(label);
    modalContent.appendChild(input);
    modalContent.appendChild(confirmButton);
    modalContent.appendChild(cancelButton);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    confirmButton.addEventListener('click', function() {
      const enteredCode = input.value;
      if (enteredCode === "CORALOGS") {
        inputForm.style.display = 'block';
        guestModeScreen.style.display = 'none';
        modal.remove();
      } else {
        alert("Incorrect code. Access denied.");
        modal.remove();
      }
    });

    cancelButton.addEventListener('click', function() {
      modal.remove();
    });
  });

  evidenceInput.addEventListener('change', function(e) {
    const file = e.target.files[0];

    if (file) {
      const fileType = file['type'];
      const imageExtensions = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff'];
      const videoExtensions = ['video/mp4', 'video/webm', 'video/ogg'];

      if (imageExtensions.includes(fileType)) {
        previewVideo.style.display = 'none';
        previewImage.style.display = 'inline-block';
        previewVideo.pause();

        const reader = new FileReader();
        reader.onload = function(e) {
          previewImage.src = e.target.result;
          fullscreenButton.style.display = 'block';
        }
        reader.readAsDataURL(file);

      } else if (videoExtensions.includes(fileType)) {
        previewImage.style.display = 'none';
        previewVideo.style.display = 'inline-block';
        previewImage.src = "";

        previewVideo.src = URL.createObjectURL(file);
        fullscreenButton.style.display = 'block';

      } else {
        previewImage.style.display = 'none';
        previewVideo.style.display = 'none';
        previewVideo.pause();
        previewVideo.src = "";
        previewImage.src = "";
        alert('Unsupported file type. Please select an image or video.');
        fullscreenButton.style.display = 'none';
        return;
      }
    } else {
      previewImage.style.display = 'none';
      previewVideo.style.display = 'none';
      previewVideo.pause();
      previewVideo.src = "";
      previewImage.src = "";
      fullscreenButton.style.display = 'none';
    }
  });

  fullscreenButton.addEventListener('click', function() {
    if (previewContainer.requestFullscreen) {
      previewContainer.requestFullscreen();
    } else if (previewContainer.mozRequestFullScreen) { /* Firefox */
      previewContainer.mozRequestFullScreen();
    } else if (previewContainer.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      previewContainer.webkitRequestFullscreen();
    } else if (previewContainer.msRequestFullscreen) { /* IE/Edge */
      previewContainer.msRequestFullscreen();
    }
  });

  uploadButton.addEventListener('click', function() {
    const playerName = document.getElementById('playerName').value;
    const reason = document.getElementById('reason').value;
    const length = document.getElementById('length').value;
    const gameMode = document.getElementById('gameMode').value;
    const banType = document.getElementById('banType').value;
    const evidence = document.getElementById('evidence').files[0];
    const code = document.getElementById('code').value;

    if (!playerName || !reason || !length || !evidence || !code) {
      alert('Please fill in all fields and select a file.');
      return;
    }

    const fileType = evidence['type'];
    const imageExtensions = ['image/png', 'image/jpeg', 'image/gif', 'image/bmp', 'image/tiff'];
    const videoExtensions = ['video/mp4', 'video/webm', 'video/ogg'];

    let mediaElement;
    if (imageExtensions.includes(fileType)) {
      mediaElement = document.createElement('img');
      mediaElement.src = previewImage.src;
      mediaElement.style.maxWidth = '200px';
      mediaElement.style.maxHeight = '150px';
    } else if (videoExtensions.includes(fileType)) {
      mediaElement = document.createElement('video');
      mediaElement.src = previewVideo.src;
      mediaElement.controls = true;  
      mediaElement.style.width = '100%'; 
    } else {
      alert('Unsupported file type.');
      return;
    }

    const uploadInfo = document.createElement('div');
    uploadInfo.style.marginBottom = '10px';
    const infoText = document.createElement('div');
    infoText.innerHTML = `
          <p style="font-size: 0.8em;"><strong>Player Name:</strong> ${playerName}</p>
          <p style="font-size: 0.8em;"><strong>Reason:</strong> ${reason}</p>
          <p style="font-size: 0.8em;"><strong>Length:</strong> ${length}</p>
          <p style="font-size: 0.8em;"><strong>Game Mode:</strong> ${gameMode}</p>
          <p style="font-size: 0.8em;"><strong>Ban Type:</strong> ${banType}</p>
      `;

    uploadInfo.appendChild(mediaElement);
    uploadInfo.appendChild(infoText);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      const modal = document.createElement('div');
      modal.style.position = 'fixed';
      modal.style.top = '0';
      modal.style.left = '0';
      modal.style.width = '100%';
      modal.style.height = '100%';
      modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
      modal.style.display = 'flex';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '1000';

      const modalContent = document.createElement('div');
      modalContent.style.backgroundColor = '#333';
      modalContent.style.padding = '20px';
      modalContent.style.borderRadius = '5px';
      modalContent.style.textAlign = 'center';

      const label = document.createElement('label');
      label.textContent = 'Please enter the code to delete this upload:';
      label.style.display = 'block';
      label.style.marginBottom = '10px';
      label.style.color = '#eee';

      const input = document.createElement('input');
      input.type = 'password';
      input.style.width = '200px';
      input.style.padding = '8px';
      input.style.margin = '5px 0';
      input.style.backgroundColor = '#444';
      input.style.color = '#eee';
      input.style.border = '1px solid #555';
      input.style.borderRadius = '4px';

      const confirmButton = document.createElement('button');
      confirmButton.textContent = 'Confirm';
      confirmButton.style.backgroundColor = '#5cb85c';
      confirmButton.style.color = 'white';
      confirmButton.style.padding = '10px 15px';
      confirmButton.style.border = 'none';
      confirmButton.style.borderRadius = '4px';
      confirmButton.style.cursor = 'pointer';
      confirmButton.style.marginRight = '10px';

      const cancelButton = document.createElement('button');
      cancelButton.textContent = 'Cancel';
      cancelButton.style.backgroundColor = '#d9534f';
      cancelButton.style.color = 'white';
      cancelButton.style.padding = '10px 15px';
      cancelButton.style.border = 'none';
      cancelButton.style.borderRadius = '4px';
      cancelButton.style.cursor = 'pointer';

      modalContent.appendChild(label);
      modalContent.appendChild(input);
      modalContent.appendChild(confirmButton);
      modalContent.appendChild(cancelButton);
      modal.appendChild(modalContent);
      document.body.appendChild(modal);

      confirmButton.addEventListener('click', function() {
        const enteredCode = input.value;
        if (enteredCode === code) {
          uploadInfo.remove();
          modal.remove();
        } else {
          alert("Incorrect code. Deletion failed.");
          modal.remove();
        }
      });

      cancelButton.addEventListener('click', function() {
        modal.remove();
      });
    });
    uploadInfo.appendChild(deleteButton);

    displayArea.appendChild(uploadInfo);

    alert('Upload successful!');

    document.getElementById('playerName').value = '';
    document.getElementById('reason').value = '';
    document.getElementById('length').value = '';
    document.getElementById('code').value = '';
    evidenceInput.value = ''; 
    previewImage.style.display = 'none';
    previewVideo.style.display = 'none';
    previewVideo.pause();
    previewVideo.src = "";
    previewImage.src = "";
    fullscreenButton.style.display = 'none';
  });
});