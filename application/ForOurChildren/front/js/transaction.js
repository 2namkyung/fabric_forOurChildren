// Web View
// const elements_ = document.querySelector('#table_content')
// for(var i=0; i<10; i++){
//     elements_.innerHTML += '<tr><td>' + (i+1) +' </td><td>이남경</td><td>100000</td><td>2021-07-30 12:30</td></tr>'
// }


// transaction
const elements = document.querySelector('#table_content')

fetch("http://localhost:4000/getTransaction/Joo")
    .then((response) => response.json())
    .then(function(data){
        for(var i=0; i<data.length; i++){
            console.log(data[i].Value)
            const json = data[i].Value;
            const obj = JSON.parse(json)
            if(obj.time==undefined){
                obj.time = "초기금액"
            }
            elements.innerHTML += '<tr><td>' + (i+1) + '</td><td>' + obj.name + '</td><td>' + obj.coin + '</td><td>' + obj.time + '</td></tr>' 
        }
    });









