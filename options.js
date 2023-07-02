// Saves options to chrome.storage
const saveOptions = () => {
  const threadsToIgnore = document.getElementById('threadsToIgnore').value;
  const postToIgnore = document.getElementById('postToIgnore').value;
  chrome.storage.sync.set(
    { threadsToIgnore: threadsToIgnore, postToIgnore: postToIgnore },
    () => {
      // Update status to let user know options were saved.
      const status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    }
  );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
  chrome.storage.sync.get(
    { threadsToIgnore: '', postToIgnore: '' },
    (items) => {
      document.getElementById('threadsToIgnore').value = items.threadsToIgnore;
      document.getElementById('postToIgnore').value = items.postToIgnore;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
