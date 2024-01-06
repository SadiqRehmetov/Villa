let blogImage = document.querySelector("input[type='file']")
let blogName = document.querySelector("input[type='text']")
let form = document.querySelector("form")
let editImage = document.querySelector(".editImage")
let id = new URLSearchParams(window.location.search).get("id")
if(id){
    fetch(`http://localhost:3000/blog/${id}`)
    .then(res=>res.json())
    .then(respons=>{
        editImage.src=respons.image,
        blogName.value = respons.name
    })
}else{
    editImage.src ="",
    blogName.value =""
    
}
blogImage.addEventListener("input", (e)=>{
    let file= e.target.files[0]
    if(file){
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload=function(){
            editImage.src=reader.result
        }
    }
})
form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(id){
        axios.patch(`http://localhost:3000/blog/${id}`,{
            image: editImage.src,
            name: blogName.value
        })
        .then(res=>{
            window.location="./index.html"
        })
    }else{
        axios.post(`http://localhost:3000/blog`,{
            image: editImage.src,
            name: blogName.value
            
        })
        .then(res=>{
            window.location="./index.html"
        })
    }
})