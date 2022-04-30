

const input = document.getElementById("search-item")
const searchButton = document.getElementById("search-button")
// searchButton.addEventListener("click", function() {
//     const inputData = input.value
//     if(input.value) {
//         let searchUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${inputData}`
//         getData(searchUrl);
//     } 
// })
input.addEventListener("input", function(e) {
    document.getElementById("search-result").innerHTML ='<div class="search-result mx-auto my-0 d-flex flex-column p-0"  id="text-content"></div>'
    let inputData = e.target.value;
    if(input.value) {
        let searchUrl = `https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&limit=10&format=json&search=${inputData}`
        getData(searchUrl);
    } 
})    
    
    

async function getDataQuery(url, detail) {
    try {
        const dataQuery = await fetch(url)
        const response = await dataQuery.json()
        const data = response?.query?.pages
        const resultData = Object.values(data)
        const title = resultData[0].title
        const description = resultData[0].pageprops.defaultsort
        const img = resultData[0].thumbnail.source
        console.log(resultData)
        const node = document.createElement('div')
        let html =` <div class="d-flex justify-content-flex-start" >
                        <a href=${detail}>
                             <img src=${img} width="50" height="50" class="img-fluid mr-4" alt="">
                        </a>
                        <div class="text-content flex-column">
                            <h4>${title}</h4>
                            <small>${description}</small>
                        </div>
                    </div>`
       node.innerHTML = html
       document.getElementById("text-content").appendChild(node)
    } catch(error){console.log(error)}
   
    
}
function getData(url) {
   
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if(xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.status === 200) {
               const searchData = JSON.parse(xhr.responseText)[1];
               const linkSearchResult = JSON.parse(xhr.responseText)[3]
               let datas = [];
               for (let i = 0; i < searchData.length; i++) {
                    datas.push([searchData[i], linkSearchResult[i]])
               }
               console.log(datas)
               datas.forEach(data => {
                   const queyUrl = `https://en.wikipedia.org/w/api.php?
                   origin=*&action=query&prop=pageprops|pageimages&format=json&titles=` + data[0]
                   const linkDetail = data[1]
                   getDataQuery(queyUrl, linkDetail)
               });         
            } else {
               return new Error(xhr.statusText)
            }
        }
        
    };
    xhr.open('GET', url, true)
    xhr.send();
    return xhr.responseText
}