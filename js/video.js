// time
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60)
    remainingSecond = remainingSecond % 60;
    return `${hour} h ${minute} m ${remainingSecond} s`;
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


// display data
const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories');
    categories.forEach( item => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.innerText = item.category;
        categoryContainer.appendChild(button)
    });
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById('video-container')
    videos.forEach(item => {
        console.log(item)
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
        </div>
        `
        videoContainer.appendChild(div)
    })
}