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

    for (const word of wordArray) {
        
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