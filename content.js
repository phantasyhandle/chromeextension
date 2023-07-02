
setInterval(removeShitThreads, 1000);

setInterval(removeShitHeads, 1000);

function removeShitThreads() {
    chrome.storage.sync.get(
        { threadsToIgnore: '', postToIgnore: '' },
        (items) => {
            const blockedWords = items.threadsToIgnore.split(',').map(s => s.toLowerCase().trim());
            if(blockedWords.length>0 && blockedWords[0]){
                var listOfShitThreads = Array.from(document.getElementsByClassName("hide_overflow"));
                for (let item of listOfShitThreads) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length){
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.style['display'] = 'none';
                        }
                    }
                    
                }
            }
            
        }
    );
}

function removeShitHeads() {
    chrome.storage.sync.get(
        { threadsToIgnore: '', postToIgnore: '' },
        (items) => {
            const blockedWords = items.postToIgnore.split(',').map(s => s.toLowerCase().trim());
            if(blockedWords.length>0 && blockedWords[0]){
                var listOfShitHeads = Array.from(document.getElementsByClassName("post_body_container"));
                for (let item of listOfShitHeads) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length){
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
