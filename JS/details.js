let id = new URLSearchParams(window.location.search).get("id")
let blogCarts = document.querySelector(".blog-carts")
console.log(id);
fetch(`http://localhost:3000/blog/${id}`)
.then(res=>res.json())
.then(respons=>{
    blogCarts.innerHTML=`
    <div class="cart">
                        <div class="image">
                            <img src="${respons.image}" alt="picture">
                        </div>
                        <div class="descrip">
                            <p>FEBRUARY 26, 2018</p>
                            <h3>${respons.name}</h3>
                        </div>
                    </div>
    `
})