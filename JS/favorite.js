let blogCarts = document.querySelector(".blog-carts")
let load = document.querySelector(".loadBlog")
let page=1
showData()
function showData(){
    fetch(`http://localhost:3000/favorite_blog?_page=${page}&_limit=3`)
    .then(res => res.json())
    .then(respons => {
        respons.map(element => {
            blogCarts.innerHTML += `
            <div class="cart">
            <div class="image">
                <img src="${element.image}" alt="picture">
            </div>
            <div class="descrip">
                <i class="bi bi-heart" onclick="blogFav(${element.id})"></i>
                <p>FEBRUARY 26, 2018</p>
                <h3>${element.name}</h3>
            </div>
            
            <div class="butttons">
                <button onclick="deleteFavblog(${element.id})">Delete</button>
            </div>
        </div>
        `
        })
    })
}

function deleteFavblog(id){
    axios.delete(`http://localhost:3000/favorite_blog/${id}`)
    .then(respons => {
        window.location.reload()
    })
}
load.addEventListener("click", ()=>{
    page++;
    showData();
})
