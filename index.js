const categoryList=document.getElementById('categoryList')
const container=document.getElementById('treeCards')
const modal=document.getElementById('plantModal')
const modalContent=document.getElementById('modalContent')



//load category
const loadCategory=()=>{
    fetch(`https://openapi.programming-hero.com/api/categories`)
    .then(res => res.json())
    .then(data =>{
        const categories=data.categories
        console.log("Categories:", categories)
        showCategory(categories)
        
    })
}

const showCategory=(categories)=>{
    categoryList.innerHTML=`

        <li id="all" class="cursor-pointer px-4 py-2 rounded hover:bg-green-700 hover:text-white font-semibold hover:border-b-4">
            All Trees
        </li>        
    
    `
    categories.forEach(cat=>{
        categoryList.innerHTML += `
            <li id="${cat.id}" class="cursor-pointer px-4 py-2 rounded hover:bg-green-700 hover:text-white">
            ${cat.category || cat.category_name || 'unknown'}
            </li>
        `
    })

    categoryList.addEventListener("click",(e)=>{
        const allLi=document.querySelectorAll("#categoryList li")
        allLi.forEach(li => li.classList.remove("border-b-4"))

        if(e.target.localName==='li'){
            e.target.classList.add("border-b-4")
            if(e.target.id === 'all'){
                loadAllTrees()
            }
            else{
                loadPlantsByCategory(e.target.id)
            }
        }
    })
}

const loadAllTrees=()=>{
    fetch(`https://openapi.programming-hero.com/api/plants`)
    .then(res=> res.json())
    .then(data=>{
        console.log("all planrs:",data.plants)
        showPlants(data.plants)
    })
    .catch(err=>{
        console.log("err loading all plants",err)
    })
}

const loadPlantsByCategory=(categoryId)=>{
    //console.log("selected category:",categoryId)
    // fetch(`https://openapi.programming-hero.com/api/category/${id}`)
    fetch(`https://openapi.programming-hero.com/api/category/${categoryId}`)

    .then(res => res.json())
    .then(data =>{
        //console.log("category plant:",data.plants)
        showPlants(data.plants)

    })
    .catch(err=>{
        console.log("err loading all plants",err)
    })
}

const showPlants=(plants)=>{
    container.innerHTML=" "
    if(!plants || plants.length===0){
        container.innerHTML=`<p class="col-span-3 text center text-gray-500">No Plants Found</p>`
        return
    }

    plants.forEach(plant=>{
        container.innerHTML += `
            <div class="border border-gray-300 rounded-lg p-3 flex flex-col items-center text-center">
                <div class="h-32 w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                    <img class="h-full object-contain" src="${plant.image}" alt="">
                </div>
                <h3 onclick="loadPlantDetail(${plant.id})" class="font-semibold text-lg cursor-pointer hover:underline text-green-700">${plant.name}
                </h3>
                <p class="text-sm text-gray-600 mt-2">${plant.description}</p>
                <div class="flex justify-between items-center w-full mt-3">
                    <button class="bg-[#DCFCCE7] px-3 py-1 rounded-full">${plant.type}</button>
                    <span class="font-semibold text-green-700">৳${plant.price}</span>
                    
                </div>
                <button class="bg-[#15803D] text-white rounded-full w-full px-4 py-2 text-lg ">Plant a Tree</button>
            </div>
        
        
        `
    })
}

const loadPlantDetail=(id)=>{
    fetch(`https://openapi.programming-hero.com/api/plant/${id}`)
    .then(res => res.json())
    .then(data => {
        const plant =data
        modalContent.innerHTML = `
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-48 object-contain mb-4 rounded-lg bg-gray-100">
        <h2 class="text-2xl font-bold mb-2">${plant.name}</h2>
        <p class="text-gray-700 mb-3">${plant.description}</p>
        <p><strong>Category:</strong> ${plant.type}</p>
        <p><strong>Price:</strong> ৳${plant.price}</p>
        `;
        modal.classList.remove("hidden");

    })
    .catch(err => {
        console.log("Error loading plant detail:", err);

    })

}

function closeModal() {
    modal.classList.add("hidden")
    modal.classList.remove("flex")
}





loadCategory()
loadAllTrees()