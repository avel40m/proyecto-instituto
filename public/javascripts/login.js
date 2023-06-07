function login(e){
    e.preventDefault();
    if (e.target[0].value == '' || e.target[1].value == '') {
        Swal.fire({
            icon: 'error',
            title:'Mensaje',
            text: 'Los campos no pueden estar vacios.',
            showConfirmButton: false,
            timer: 2500
          })
        return
    }
    fetch('http://localhost:3000/login',{
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
        console.log(data);
        if (data.message.includes('correctamente')) {
            Swal.fire({
                icon: 'success',
                title:'Mensaje',
                text: data.message,
                showConfirmButton: false,
                timer: 2500
              })
                setTimeout(() => {
                    window.location.href = '/';
                },2500)
                return
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