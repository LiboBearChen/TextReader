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
            currentBook=xhr.responseText;

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
}