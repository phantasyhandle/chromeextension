// Saves options to chrome.storage
const saveOptions = () => {
  const shitHeadsAndShitThreadsToIgnore = document.getElementById('shitHeadsAndShitThreadsToIgnore').value;
  chrome.storage.sync.set(
    { shitHeadsAndShitThreadsToIgnore: shitHeadsAndShitThreadsToIgnore},
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
    { shitHeadsAndShitThreadsToIgnore: ''},
    (items) => {
      document.getElementById('shitHeadsAndShitThreadsToIgnore').value = items.shitHeadsAndShitThreadsToIgnore;
    }
  );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('saveBtn').addEventListener('click', saveOptions);
