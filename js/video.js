// time
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60;
    return `${hour} h ${minute} m ${remainingSecond} s`;
}

// active button
const removeActiveButton = () =>{
    const button = document.getElementsByClassName('category-btn')
    for ( btn of button ){
        btn.classList.remove('active')
    }
}

// load Data
const buttonUrl = 'https://openapi.programming-hero.com/api/phero-tube/categories';
    fetch(buttonUrl)
        .then(res=> res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))


const videoUrl = 'https://openapi.programming-hero.com/api/phero-tube/videos';
    fetch(videoUrl)
        .then(res => res.json())
        .then(data => displayVideos(data.videos))


// load category videos
const loadCategoryVideos = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        .then(res => res.json())
        .then(data => {
            removeActiveButton()
            const activeBtn = document.getElementById(`btn-${id}`)
            activeBtn.classList.add("active")
            displayVideos(data.category)
        })
}

// details function
const cardDetails = async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${id}`)
    const data = await res.json()
    showDetails(data.video)
}

// show details
const showDetails = (video) =>{
    console.log(video)
    const detailsContainer = document.getElementById('details-container')
    detailsContainer.innerHTML =   `
        <img src = ${video.thumbnail}/>
        <p>${video.description}</p>
    `
    // way-1
    // document.getElementById('showModal').click()

    // way-2
    document.getElementById('customModal').showModal()
}

// display data
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories');
    categories.forEach( item => {
        const buttonContainer = document.createElement('div')
        buttonContainer.innerHTML = `
            <button id = 'btn-${item.category_id}' onclick = 'loadCategoryVideos(${item.category_id})' class = 'btn category-btn'>
                ${item.category}
            </button>
        `
        categoryContainer.appendChild(buttonContainer)
    });
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('video-container')
    videoContainer.innerHTML = ''

    if( videos.length === 0 ){
        videoContainer.classList.remove('grid') 
        videoContainer.innerHTML = `
        <div class = 'flex flex-col justify-center items-center gap-5 h-[300px] w-96 mx-auto text-center'>
            <img class = 'w-1/2' src = 'assets/Icon.png'/>
            <h3 class = 'font-bold text-2xl text-center'>No Content is Available Here</h3>
        </div>
        `
        return;
    }else{
        videoContainer.classList.add('grid')
    }
    videos.forEach(item => {
        // console.log(item)
    const div = document.createElement('div')
        div.innerHTML = `
        
        <div class="card card-compact">
        <figure class = 'h-[200px] relative'>
            <img class = 'h-full w-full object-fit'
            src= ${item.thumbnail}
            alt="Shoes" />
            ${item.others.posted_date ? `<span class = 'absolute bg-black text-white px-2 py-1 rounded-sm bottom-2 right-2'>${getTimeString(item.others.posted_date)}</span>` : ''} 
            
        </figure>
        <div class="px-0 py-2 flex gap-2">
            <div>
                <img class ='h-10 w-10 rounded-full' src = ${item.authors[0].profile_picture} />
            </div>
            <div>
                <a class = "font-semibold text-xl cursor-pointer">${item.title}</a>
                <div class = 'flex items-center gap-2'>
                <p class = 'font-semibold'>${item.authors[0].profile_name}</p>
                <div>
                    ${item.authors[0].verified ?  `<img class ='h-5 w-5' src = 'https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000'/>` : '' }
                </div>
                
                </div>
                <p>${item.others.views} views</p>
                </div>
                </div>
                <button onclick = "cardDetails('${item.video_id}')" class = 'w-full bg-red-500 my-4 py-2 font-semibold text-white'>Details</button>
        </div>
        `
        videoContainer.appendChild(div)
    })
}