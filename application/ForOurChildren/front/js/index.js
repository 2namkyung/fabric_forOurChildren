const element = document.querySelector('#table_content')
element.innerHTML = '<tr><td>이남경</td><td>1000</td></tr>'

const elements = document.querySelector('#table_content')
for(var i=0; i<10; i++){
    var coin = i + 1000;
    elements.innerHTML += '<tr><td>' + i + '</td><td>' + coin + '</td></tr>' 
}
