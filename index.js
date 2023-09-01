//----------------------------------Categories section-------------------------------

const phTube = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const categories = data.data;
//   console.log(categories);

  const categoriesSection = document.getElementById("categories-section");
  categories.forEach((categorie) => {
    const div = document.createElement("div");
    div.innerHTML = `
            <button  onclick= "allShow('${categorie.category_id}')" class="btn text-base font-medium px-5  w-24">${categorie.category}</button>
         `;
    categoriesSection.appendChild(div);
  });
};

//----------------------------------------All Show section---------------------------------

const allShow = async (id, sortNum) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();
  const allData = data.data;
  const status = data.status;
  
//----------------------data not found-----------------------------------

  const noReault = document.getElementById('no-result');
  if(status === false){
   noReault.classList.remove('hidden')
  }
  else{
    noReault.classList.add('hidden')
  }

  //----------------------get container and clear container-------------------------

  const videoContainer = document.getElementById("video-container");
  videoContainer.textContent = ""

  //------------------------run loop---------------------------------------

  allData.forEach((video) => {
    
    // --------------second to hour and minute-----------------

    const sec = parseInt(video.others.posted_date); 
    let hours   = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    
   //-----------------create cart------------------------------

    const cart = document.createElement("div");
    cart.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
                    <div class = "p-3 relative">
                      <img class = "h-48 mx-auto rounded-md"
                        src="${video.thumbnail}"
                      />
                      <p class ="text-xs p-1 rounded-xl absolute bottom-4 right-5 bg-slate-800 text-white">
                      ${video.others.posted_date? `${hours} hrs ${minutes} min ago` : ""}
                      </p>
                    </div>
                    <div class="p-3">
                        <div class="flex gap-3">
                            <div class="">
                                <img class="w-10 h-10 rounded-full"
                                  src="${video.authors[0]?.profile_picture}"
                                />
                              </div>
                          <h2 class="card-title text-base font-bold">
                            ${video.title}
                          </h2>
                        </div>
                        <div class = "flex gap-2 my-2">
                        <p class="text-sm font-normal">
                        ${video.authors[0]?.profile_name}
                        <p>
                        <span>${video.authors[0].verified? `<img class="w-5"
                        src="veryfied.png"
                        />` : ""}
                        </span> 
                        </div>                     
                        <p class="text-sm font-normal my-3">total view : ${video.others?.views}</p>
                    </div>
                  </div>
        `;
    videoContainer.appendChild(cart);
  });
};

//-----------------------------------sort result-------------------------------------------

const sortResult = async() =>{
    const res = await fetch`https://openapi.programming-hero.com/api/videos/category/1000`;
    const data = await res.json();
    const fInalData = data.data;
    
    const sortNum = fInalData.sort((a, b) => b.others.views.slice(0, -1) - a.others.views.slice(0, -1))    
    allShow(sortNum)
    console.log(sortNum);
}

allShow('1000')
phTube();


