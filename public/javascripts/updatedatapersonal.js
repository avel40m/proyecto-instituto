function updateData (e) {
    e.preventDefault();
    
    fetch('http://localhost:3000/datapersonal',{
        method:'put',
        headers:{
            'content-type':'Application/json'
        },
        body: JSON.stringify({
            last_name: e.target[0].value,
            first_name: e.target[1].value,
            second_name: e.target[2].value,
            city: e.target[3].value,
            province: e.target[4].value,
            country: e.target[5].value,
            phone: e.target[6].value,
            email: e.target[7].value,
            social_network: e.target[8].value,
        })
    }).then(response => response.json())
    .then(data => {
        Swal.fire({
            icon: 'success',
            title:'Mensaje',
            text: data.message,
            showConfirmButton: false,
            timer: 2500
          })
    })
    .catch(err => console.log(err));

}