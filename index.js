let apiKey = "rl0aLfvGfPOeaMFicThcmYOHJUv1fEBG";
let newsURI = "https://api.nytimes.com/svc/topstories/v2/"
let world = document.getElementById("world");
//console.log(world)
document.querySelectorAll('.nav-link').forEach(item => {
    item.addEventListener('click', event => {
      newsfetch(item.innerHTML.toLowerCase());
      item.classList.add("active")
    })
    item.addEventListener('mouseover', () => {
      item.classList.add('bg-dark', 'text-white');
    })
    item.addEventListener('mouseout', () => {
      item.classList.remove('bg-dark', 'text-white');
    })
  })
//console.log(navLinks.length);

//world.onclick = newsfetch('world');

let content = document.createElement('div');
content.setAttribute('class','row');
let imagePng = document.createElement('img');
imagePng.setAttribute('src','nytimes.png')
imagePng.setAttribute('class','imageCenter')
content.appendChild(imagePng);

let container = document.querySelector('.container');
container.appendChild(content);

async function newsfetch(item) {
  
    content.innerHTML = '';
    let tempObject = {};
    let tempArray = [];
    let data = await fetch(newsURI+item+".json?api-key="+apiKey);
    let response = await data.json();
    console.log(response)
    for(i=0;i<5;i++){
        tempObject = {
            "abstract":response.results[i].abstract,
            "byline":response.results[i].byline,
            "createdDate":response.results[i].created_date,
            "itemType":response.results[i].item_type,
            "section":response.results[i].section,
            "title":response.results[i].title,
            "imgURL":response.results[i].multimedia[0].url,
            "articleURL":response.results[i].short_url
        }
        tempArray.push(tempObject);
        let cardDiv = document.createElement('div');
        cardDiv.setAttribute('class','card mb-3');

        content.appendChild(cardDiv);

        let rowDiv = document.createElement('div');
        rowDiv.setAttribute('class','row g-0');
        cardDiv.appendChild(rowDiv);

        let colDivTwo = document.createElement('div');
        colDivTwo.setAttribute('class','col-md-8');
        rowDiv.appendChild(colDivTwo);

        
        let cardBodyDiv = document.createElement('div');
        cardBodyDiv.setAttribute('class','card-body');
        colDivTwo.appendChild(cardBodyDiv);

        let cardSectionDiv = document.createElement('div');
        cardSectionDiv.setAttribute('class','section-card');
        cardSectionDiv.innerText = tempObject.section.toUpperCase();
        cardBodyDiv.appendChild(cardSectionDiv);

        let h5 = document.createElement('h4');
        h5.setAttribute('class','card-title');
        h5.innerText = tempObject.title;
        cardBodyDiv.appendChild(h5);

        let newsDate = document.createElement('div');
        newsDate.setAttribute('class','dateObject')
        let dateData = new Date(tempObject.createdDate);
        let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
        let formattedDate = months[dateData.getMonth()] + ' ' + dateData.getFullYear();
        newsDate.innerText = formattedDate;
        cardBodyDiv.appendChild(newsDate);

        let p1 = document.createElement('p');
        p1.setAttribute('class','card-text');
        p1.innerText = tempObject.abstract;
        cardBodyDiv.appendChild(p1);

        let continueReading = document.createElement('div');
        continueReading.setAttribute('class','continueReading');
        let anchorLink = document.createElement('a');
        anchorLink.setAttribute('href',tempObject.articleURL);
        anchorLink.setAttribute('target','_blank');
        anchorLink.innerText="Continue Reading";
        continueReading.appendChild(anchorLink);
        cardBodyDiv.appendChild(continueReading);

        let colDiv = document.createElement('div');
        colDiv.setAttribute('class','col-md-4');
        rowDiv.appendChild(colDiv);

        let imgtag = document.createElement('img');
        imgtag.setAttribute('class','img-thumbnail');
        imgtag.setAttribute('src',tempObject.imgURL);
        colDiv.appendChild(imgtag);

        /*p2.innerText = tempObject.createdDate;
        cardBodyDiv.appendChild(p2);*/
        }
    
    console.log(tempArray)
}