
fetch('http://localhost:3000/get-message-read',{method: 'get'})
    .then(response => response.json())
    .then(data => {
        if (data.cookie == 'admin') {
            const mensajes = document.querySelector('.mensajes');
            if (data.valor[0].mensajes == 0) {
                mensajes.setAttribute("style","display:none");
            } else {
                mensajes.setAttribute("style","display:block");

            }
        }
    })
    .catch(err => console.error(err))
