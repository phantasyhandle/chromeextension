document.addEventListener('DOMNodeInserted', removeShitHeadsAndShitThreads);

function removeShitHeadsAndShitThreads() {
    chrome.storage.sync.get(
        { shitHeadsAndShitThreadsToIgnore: ''},
        (items) => {
            const blockedWords = items.shitHeadsAndShitThreadsToIgnore.split(',').map(s => s.toLowerCase().trim());
            if(blockedWords.length>0 && blockedWords[0]){
                //looks for shit words in thread title
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

                //looks for shithead author of thread
                listOfShitThreads = Array.from(document.getElementsByClassName("topic_author_display_name"));
                for (let item of listOfShitThreads) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length){
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.style['display'] = 'none';
                        }
                    }
                }
                //removes shit words in post
                var listOfShitPosts = Array.from(document.getElementsByClassName("post_body_container"));
                for (let item of listOfShitPosts) {
                    const text = (item.textContent || '').toLowerCase();
                    if (text.length){
                        var stringIncludesShit = blockedWords.some(shit => text.includes(shit));
                        if (stringIncludesShit) {
                            item.parentElement.parentElement.style['display'] = 'none';
                        }
                    }
                }
                
                //removes posts by shithead author
                var listOfShitPosts = Array.from(document.getElementsByClassName("poster_name"));
                for (let item of listOfShitPosts) {
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
