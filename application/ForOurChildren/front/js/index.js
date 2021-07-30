// Web View
// const elements_ = document.querySelector('#table_content')
// elements_.innerHTML += '<tr><td>이남경</td><td>10000</td></tr>'
// elements_.innerHTML += '<tr><td>이남경</td><td>10000</td></tr>'
// elements_.innerHTML += '<tr><td>이남경</td><td>10000</td></tr>'
// elements_.innerHTML += '<tr><td>이남경</td><td>10000</td></tr>'
// elements_.innerHTML += '<tr><td>이남경</td><td>10000</td></tr>'


// index
const elements = document.querySelector('#table_content')

fetch("http://localhost:4000/getAllInfo")
    .then((response) => response.json())
    .then(function(data){
        for(var i=0; i<data.length; i++){
            console.log(data[i].Record)
            elements.innerHTML += '<tr><td><a href="/getTransaction/' + data[i].Key + '">' + data[i].Key + '</a></td><td>' + data[i].Record.coin + '</td></tr>' 
        }
    });









