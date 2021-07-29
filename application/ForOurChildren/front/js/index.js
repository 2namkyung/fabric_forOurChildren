const elements = document.querySelector('#table_content')

fetch("http://localhost:4000/getAllInfo")
    .then((response) => response.json())
    .then(function(data){
        for(var i=0; i<data.length; i++){
            console.log(data[i].Record)
            elements.innerHTML += '<tr><td>' + data[i].Key + '</td><td>' + data[i].Record.coin + '</td></tr>' 
        }
    });



