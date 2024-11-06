// Function to remove unwanted threads and posts
function removeShitHeadsAndShitThreads() {
    chrome.storage.sync.get(
        { shitHeadsAndShitThreadsToIgnore: ''},
        (items) => {
            const blockedWords = items.shitHeadsAndShitThreadsToIgnore.split(',').map(s => s.toLowerCase().trim());
            if (blockedWords.length > 0 && blockedWords[0]) {
                // Process thread titles
                var listOfShitThreads = Array.from(document.getElementsByClassName("hide_overflow"));
                for (let item of listOfShitThreads) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length) {
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.style['display'] = 'none';
                        }
                    }
                }

                // Process thread authors
                listOfShitThreads = Array.from(document.getElementsByClassName("topic_author_display_name"));
                for (let item of listOfShitThreads) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length) {
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.style['display'] = 'none';
                        }
                    }
                }

                // Process post content
                var listOfShitPosts = Array.from(document.getElementsByClassName("post_body_container"));
                for (let item of listOfShitPosts) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length) {
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.parentElement.style['display'] = 'none';
                        }
                    }
                }

                // Process post authors
                listOfShitPosts = Array.from(document.getElementsByClassName("poster_name"));
                for (let item of listOfShitPosts) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length) {
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.parentElement.style['display'] = 'none';
                        }
                    }
                }
            }
        }
    );
}

// Create a MutationObserver to monitor changes to the DOM
const observer = new MutationObserver((mutationsList, observer) => {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            removeShitHeadsAndShitThreads();
        }
    }
});

// Start observing the document body for changes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Run once initially
removeShitHeadsAndShitThreads();
