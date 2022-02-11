
document.addEventListener('DOMContentLoaded',function(){
    var result = document.getElementById("result")
    var form = document.getElementById("form")
    var searchbox = document.getElementById("searchbox")
    var top = document.getElementsByClassName('top')
    function anime(arr){
        result.innerHTML="";
        for(var i=0;i<arr.length;i++){
            result.innerHTML+=`<div class="res">
            <a href="${arr[i]["url"]}"><img src="${arr[i]["image_url"]}"></a>
            <br>
            <b>${arr[i]["title"]}</b></div>`
        }
    }
    function topAnime(arr){
        top[0].innerHTML="<span>Popular</span>"
        for(let i=0;i<10;i++){
            top[0].innerHTML+=`<a href="${arr[i]["url"]}">${arr[i]["title"]}</a>`
        }
    }
    function favorite(arr){
        top[0].innerHTML+="<span>Top Ranked</span>"
        for(let i=0;i<10;i++){
            top[0].innerHTML+=`<a href="${arr[i]["url"]}">${arr[i]["title"]}</a>`
        }
    }
    async function populate(){
        await fetch('https://api.jikan.moe/v3/top/anime/1/bypopularity').then(res=>res.json()).then(res=>{
        topAnime(res.top)
        anime(res.top)
        })
        await fetch('https://api.jikan.moe/v3/top/anime/1/favorite').then(res=>res.json()).then(res=>{
            favorite(res.top)
            })

    }

    populate()

    form.addEventListener('submit',function(event){
        event.preventDefault()
        fetch(`https://api.jikan.moe/v3/search/anime?q=${searchbox.value}&order_by=titles&sort=asc&limit=50`).then(res=>res.json()).then(res=>anime(res.results))
    })
})
