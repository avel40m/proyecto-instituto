function register(e){
    e.preventDefault();
    if (e.target[0].value == '' || e.target[1].value == '') {
        Swal.fire({
            icon: 'error',
            title:'Mensaje',
            text: 'Los campos no pueden estár vacios.',
            showConfirmButton: false,
            timer: 2500
          })
        return
    }

    fetch('http://localhost:3000/register',{
        method: 'POST',
        headers:{
            'content-type':'application/json'
        },
        body: JSON.stringify({
            username:e.target[0].value,
            password:e.target[1].value,
        })
    }).then(response => response.json())
    .then(data => {
        if (data.message.includes('correctamente')) {
            Swal.fire({
                icon: 'success',
                title:'Mensaje',
                text: data.message,
                showConfirmButton: false,
                timer: 2500
              })
                setTimeout(() => {
                    window.location.href = '/login';
                },2500)
        } else{
            Swal.fire({
                icon: 'error',
                title:'Mensaje',
                text: data.message,
                showConfirmButton: false,
                timer: 2500
              })
              return
        }
    })
    .catch(error => console.log(error));

}