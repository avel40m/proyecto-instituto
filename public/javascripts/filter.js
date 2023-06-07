const listitem = document.querySelectorAll('.filter li');
const listado = document.querySelectorAll('.card-container');

listitem.forEach(li => {
    li.onclick = function(){
        listitem.forEach(li => {
            li.className = ""
        })
        li.className = "active";
        const value = li.textContent;
        listado.forEach(listas => {
            listas.style.display = "none";
            if(listas.getAttribute('data-filter') == value.trim() || value.trim() == "Mostrar todos"){
                listas.style.display = "block";
            }
        })
    }

})
