let topIcon = document.querySelector(".bi-arrow-up-short")
let menuIcon = document.querySelector(".bi-list")
let nav = document.querySelector("nav")
let closeIcon = document.querySelector(".bi-x-lg")
let blogCarts=document.querySelector(".blog-carts")
let page=1
let load = document.querySelector(".loadBlog")
let favCount = document.querySelector(".favCount")
let searchInput = document.querySelector(".search")
topIcon.addEventListener("click",()=>{
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
})
window.addEventListener("scroll", () => {
    if (scrollY > 100) {
        topIcon.style.display="flex";
    } else {
        topIcon.style.display="none"; 
    }
})
menuIcon.addEventListener("click", ()=>{
    nav.style.transition="all 1s ease"
    document.querySelectorAll("section").forEach(element=>{
        element.style.display="none"
    })
    document.querySelector("footer").style.display="none"
    nav.style.display="flex"
    nav.style.zIndex="1000"
})
closeIcon.addEventListener("click", ()=>{
    nav.style.display="none"
    document.querySelectorAll("section").forEach(element=>{
        element.style.display="flex"
    })
    document.querySelector("footer").style.display="flex"
})
showData()
function showData(){
    fetch(`http://localhost:3000/blog?_page=${page}&_limit=3`)
    .then(res=> res.json())
    .then(respons=>{
        respons.map(element=>{
            blogCarts.innerHTML+=`
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
                            <a href="../details.html?id=${element.id}"><button> Details</button></a>
                            <a href="../add.html?id=${element.id}"><button>Update</button></a>
                            <button onclick="deleteBlog(${element.id})">Delete</button>
                        </div>
                    </div>
            `
        })
        searchInput.addEventListener("input", (e) => {
            let searchData = respons.filter(element => {
                return element.name.toLowerCase().startsWith((e.target.value).toLowerCase())
            });
            blogCarts.innerHTML = "";
            searchData.map(element => {
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
                            <a href="../details.html?id=${element.id}"><button> Details</button></a>
                            <a href="../add.html?id=${element.id}"><button>Update</button></a>
                            <button onclick="deleteBlog(${element.id})">Delete</button>
                        </div>
                    </div>
                `
            })
        })
    })
}
function deleteBlog(id){
    axios.delete(`http://localhost:3000/blog/${id}`)
    .then(res=>{
        window.location.reload()
    })
}
load.addEventListener("click", ()=>{
    page++;
    showData();
})
function blogFav(id){
    console.log(id);
    event.target.classList.remove("bi-heart");
    event.target.classList.add("bi-heart-fill");
    axios.get(`http://localhost:3000/blog/${id}`)
    .then(blog=>{
        return blog.data
    })
    .then(blog=>{
        axios.get(`http://localhost:3000/favorite_blog`)
        .then(blogData=>{
            let newId=blogData.data.find(f=>f.id===blogData.id);
            if(newId){
                axios.delete(`http://localhost:3000/favorite_blog/${newId}`)
            }else{
                axios.post(`http://localhost:3000/favorite_blog`, blog)
            }
        })
    })
    .catch(err => console.log(err))
}
fetch(`http://localhost:3000/favorite_blog`)
.then(res=>res.json())
.then(respons=>{
    favCount.innerHTML=respons.length
})