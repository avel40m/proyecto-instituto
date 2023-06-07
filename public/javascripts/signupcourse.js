function inscribirme(event){
    event.preventDefault();
    const elemento = event.target;
    const parametro = elemento.getAttribute('data-parametro');

    const url = `http://localhost:3000/singup-course/${parametro}`;

    fetch(url, {
        method: 'POST',  
        headers: {
        'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data =>{
            Swal.fire({
                icon: 'info',
                title:'Mensaje',
                text: data.message,
                showConfirmButton: false,
                timer: 2500
              })
        })
        .catch(err => console.error(err));
}