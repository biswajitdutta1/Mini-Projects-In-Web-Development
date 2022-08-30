console.log("checking successful");
//45392da1293f4373ad9f224fe130fa47
//grab the news container
let accordionNewsContainer = document.getElementById("accordionNewsContainer");
 let apikey = '45392da1293f4373ad9f224fe130fa47';
 let sources= 'bbc-news';
let xhr = new XMLHttpRequest();

xhr.open("GET",`https://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apikey}`,true);

xhr.onload = function()
{
    if(this.status === 200){
        let newsArr = JSON.parse(this.responseText);
        let onlyNewsArticles = newsArr.articles;
    console.log(onlyNewsArticles);
    let innerHtmlOfaccordionNewsContainer = "";
    onlyNewsArticles.forEach(function(eachNewselement,index) {
       let newsItem  = 
        `<div class="accordion-item">
        <h2 class="accordion-header" id="heading${index}">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                <b>Breaking News ${index+1} :</b> ${eachNewselement["title"]}
            </button>
        </h2>
        <div id="collapse${index}" class="accordion-collapse collapse " aria-labelledby="heading${index}"
            data-bs-parent="#accordionNewsContainer">
            <div class="accordion-body">
        ${eachNewselement["content"]} <a href="${eachNewselement["url"]}" target= "_blank" }> Read More Here</a> 
            </div>
        </div>
        </div>`
        innerHtmlOfaccordionNewsContainer += newsItem;
    });
    accordionNewsContainer.innerHTML = innerHtmlOfaccordionNewsContainer;
    }
    else
    {
        console.log("some error has occured");
    }
}
xhr.send();

