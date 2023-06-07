const comments = document.querySelector('#comentario');
const notRead = document.querySelector('#no-leido');

function messages(e,message,id,read){
    e.preventDefault();
    if(read == 0 && notRead.innerHTML != 0){
        notRead.innerHTML = notRead.innerHTML - 1;
        
        fetch(`http://localhost:3000/message/${id}`,{method:'put'})
        .then(response => response.json())
        .catch(err => err);
    }
    comments.innerHTML = message
}