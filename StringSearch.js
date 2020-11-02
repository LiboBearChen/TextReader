function loadBook(fileName,displayName){
    let currentBook="";
    let url="books/"+fileName;

    document.getElementById("fileName").innerHTML=displayName;
    document.getElementById("searchstat").innerHTML="";
    document.getElementById("keyword").value="";

    var xhr=new XMLHttpRequest();
    xhr.open("GET",url,true);
    xhr.send();

    xhr.onreadystatechange=function(){
        if(xhr.readyState==4 && xhr.status==200){
            currentBook = xhr.responseText;

            getDocStats(currentBook);

            currentBook = currentBook.replace(/(?:\r\n|\r|\n)/g, '<br>');

            document.getElementById("fileContent").innerHTML=currentBook;

            var elmnt=document.getElementById("fileContent");
            elmnt.scrollTop = 0;
        }
    };
}

function getDocStats(fileContent) {
    var docLength = document.getElementById("docLength");
    var wordCount = document.getElementById("wordCount");
    var charCount = document.getElementById("charCount");

    let text = fileContent.toLowerCase();
    let wordArray = text.match(/\b\S+\b/g);
    let wordDictionary = {};

    var uncommonWords = [];

    uncommonWords = filterStopWords(wordArray);

    for (const word of uncommonWords) {
        
        if (wordDictionary[word] > 0) {
            wordDictionary[word] += 1;
        }
        else {
            wordDictionary[word] = 1;
        }
    }

    let wordList = sortProperties(wordDictionary);

    var top5Words = wordList.slice(0, 6);
    var least5Words = wordList.slice(-6, wordList.length);

    ULTemplate(top5Words, document.getElementById("mostUsed"));
    ULTemplate(least5Words, document.getElementById("leastUsed"));
}

function ULTemplate(items, element) {
    let resultsHTML = "";

    for (i = 0; i < items.length - 1; i++) {
            resultsHTML += "<li>" + items[i][0] + " : " + items[i][1] + " time(s) </li>";
    }

    element.innerHTML = resultsHTML;
}

function sortProperties(obj) {

    let rtnArray = Object.entries(obj);

    rtnArray.sort(function (first, second) {
        return second[1] - first[1];
    });

    return rtnArray;
}

function filterStopWords(wordArray) {
    var commonWords = getStopWords();
    var commonObj = {};
    var uncommonArr = [];

    for (i = 0; i < commonWords.length; i++) {
        commonObj[commonWords[i].trim()] = true;
    }

    for (i = 0; i < wordArray.length; i++) {
        word = wordArray[i].trim().toLowerCase();
        if (!commonObj[word]) {
            uncommonArr.push(word);
        }
    }

    return uncommonArr;
}

function getStopWords() {
    return ["such", "up", "down", "man", "one", "page", "out", "now", "very", "a", "able", "about", "across", "after", "all", "almost", "also", "am", "among", "an", "and", "any", "are", "as", "at", "be", "because", "been", "but", "by", "can", "cannot", "could", "dear", "did", "do", "does", "either", "else", "ever", "every", "for", "from", "get", "got", "had", "has", "have", "he", "her", "hers", "him", "his", "how", "however", "i", "if", "in", "into", "is", "it", "its", "just", "least", "let", "like", "likely", "may", "me", "might", "most", "must", "my", "neither", "no", "nor", "not", "of", "off", "often", "on", "only", "or", "other", "our", "own", "rather", "said", "say", "says", "she", "should", "since", "so", "some", "than", "that", "the", "their", "them", "then", "there", "these", "they", "this", "tis", "to", "too", "twas", "us", "wants", "was", "we", "were", "what", "when", "where", "which", "while", "who", "whom", "why", "will", "with", "would", "yet", "you", "your", "ain't", "aren't", "can't", "could've", "couldn't", "didn't", "doesn't", "don't", "hasn't", "he'd", "he'll", "he's", "how'd", "how'll", "how's", "i'd", "i'll", "i'm", "i've", "isn't", "it's", "might've", "mightn't", "must've", "mustn't", "shan't", "she'd", "she'll", "she's", "should've", "shouldn't", "that'll", "that's", "there's", "they'd", "they'll", "they're", "they've", "wasn't", "we'd", "we'll", "we're", "weren't", "what'd", "what's", "when'd", "when'll", "when's", "where'd", "where'll", "where's", "who'd", "who'll", "who's", "why'd", "why'll", "why's", "won't", "would've", "wouldn't", "you'd", "you'll", "you're", "you've"];
}