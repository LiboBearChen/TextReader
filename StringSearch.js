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
            
            document.getElementById("fileContent").innerHTML=currentBook;

            var elmnt=document.getElementById("fileContent");
            elmnt.scrollTop=0;
        }
    };
}