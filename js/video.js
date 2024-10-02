// load Data
const url = 'https://openapi.programming-hero.com/api/phero-tube/categories';
    fetch(url)
        .then(res=> res.json())
        .then(data => displayCategories(data.categories))
        .catch(err => console.log(err))

const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById('categories');
    categories.forEach( item => {
        const button = document.createElement('button')
        button.classList.add('btn')
        button.innerText = item.category;
        categoryContainer.appendChild(button)
    });
}