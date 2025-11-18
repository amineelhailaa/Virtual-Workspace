const addWorker= document.getElementById("addWorker");
const cancelAdding = document.getElementById("btnAnnulerSubmit")
// const submitAdding = document.getElementById("btnSubmit")
const formSection = document.getElementById("form_section");
const allowedListSection = document.getElementById("popUpAllowedList")
const addForm = document.getElementById("addForm")
const imageProfile = document.getElementById("profileImage")
const imageInput = document.getElementById("inputProfile");
const experienceContainer = document.getElementById("experienceContainer");
const addExperience = document.getElementById("btnExper");
const workerContainer = document.getElementById('workerContainer')
const roomsContainer = document.getElementById('rooms_container');
const conferenceContainer =document.getElementById("conferenceC")
const staffContainer =document.getElementById("personnelC")
const securityContainer = document.getElementById("securityC")
const receptionContainer=document.getElementById("receptionC")
const archiveContainer =document.getElementById("archiveC")
const itContainer=document.getElementById("serversC")
const alowedList = document.getElementById("allowedList")



let workerCounter=0
let workerList = []
let conferenceList = []
let receptionList = []
let serversList = []
let securityList = []
let staffList = []
let archiveList = []
let experienceList = []




imageInput.addEventListener('input', () => {
    imageProfile.src = imageInput.value
    imageProfile.onerror = () => {
        imageProfile.src = "./assets/emptyProfile.jpg"
    }
})


addWorker.addEventListener('click', () => {
    formSection.classList.toggle("hidden");
})





addForm.addEventListener('submit',e=>{


    workerCounter++
    let experienceBridge = []

    /////SUBMIT FORM WORKER
    //
    const experiences = addForm.querySelectorAll('.accessExperience')
    experiences.forEach(ex=>{
        if(ex.querySelector('.entrepriseEx').value !== ""){
            let storeExperience = {
                company : ex.querySelector('.entrepriseEx').value,
                role : ex.querySelector('.roleEx').value,
                dateS : ex.querySelector('.dateS').value,
                dateE : ex.querySelector('.dateE').value
            }

            experienceBridge.push(storeExperience)
        }
    })

    let workerObjet = {
        id: workerCounter,
        name: document.getElementById("name").value,
        role: document.getElementById("role").value ,
        img: document.getElementById("profileImage").src,
        experience: experienceBridge ,
        email:document.getElementById("email").value ,
        phone: document.getElementById('telephone').value ,

    }

    // const workerCard = document.createElement('div')
    // workerCard.className= "flex flex-row gap-4 py-2 border-b-2 border-b-amber-400"
    // workerCard.id="worker_id_here"
    // workerCard.innerHTML=`
    //                     <img src="../assets/emptyProfile.jpg" alt="profile" class="rounded-full aspect-square max-h-13">
    //                     <div><h1 class="worker_NAME">AMINE ELHAILAA</h1>
    //                         <p class="worker_ROLE">Role</p></div>
    //                 `
    // workerCard.querySelector('.worker_NAME').textContent = workerObjet.name
    // workerCard.querySelector('.worker_ROLE').textContent = workerObjet.role
    // workerCard.querySelector('img').src = workerObjet.img
    // console.log(workerList)
    //
    //
    //
    // workerContainer.append(workerCard)
    e.preventDefault() //submit reload the page
    workerList.push(workerObjet)
    showCards(workerList,workerContainer) //affichage
    formSection.classList.toggle('hidden')

})


function showCards(array,location) {
    if (location === workerContainer){
        location.innerHTML = ""
        array.forEach(worker =>{
            const workerCard = document.createElement('div')
            workerCard.className= "flex flex-row gap-4 py-2 border-b-2 border-b-amber-400"
            workerCard.innerHTML=`
                        <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
                        <div><h1 class="worker_NAME">${worker.name}</h1>
                            <p class="worker_ROLE">${worker.role}</p></div>
                    `
            workerCard.id = worker.id
            location.append(workerCard)
        })
    }

    else {
        location.innerHTML=""
        array.forEach(mate=>{
            let roomCard = cardOfRooms(mate)
            location.append(roomCard)
        })
    }



}







cancelAdding.addEventListener('click', () => {
    formSection.classList.toggle("hidden");
    console.log("whatsgoing on")
})


hideOnEmptyClick(formSection)
hideOnEmptyClick(allowedListSection)



function hideOnEmptyClick(form) {
    form.addEventListener('click', (e) => {
        if (e.target === form) {
            form.classList.toggle("hidden");
        }
    })
}






addExperience.addEventListener('click', () => {
    const experienceTemplate = document.createElement("div")
    experienceTemplate.className ="accessExperience"
    experienceTemplate.innerHTML = `<div class=" flex flex-col gap-4 ">
                    <div class="flex flex-row min-w-0 gap-2"><input type="text" placeholder="Entreprise"
                                class="entrepriseEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                        <input type="text" placeholder="Role" value=""
                               class="roleEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                    </div>
                    <div class="flex flex-row min-w-0 gap-2 grow-0 ">
                        <input type="date"
                               class="dateS min-w-0 grow outline-1 outline-amber-400 rounded-md px-4 py-1">
                        <input type="date"
                               class="dateE min-w-0 grow outline-1 outline-amber-400 rounded-md px-4 py-1">
                    </div>


                    <svg viewBox="0 0 512 512" class=" h-8 aspect-square deleteExperience cursor-pointer"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                              fill="#f44336"/>
                        <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                              fill="#fafafa"/>
                    </svg>

                </div>`




    experienceTemplate.querySelector(".deleteExperience").addEventListener("click", () => {
        experienceTemplate.remove();
    })
    experienceContainer.append(experienceTemplate);
})



//------------------------ start event on rooms -----------------------------
roomsContainer.addEventListener('click', event => {


/// part of ajout
    if (event.target.closest(".addHimHere")) {
        const clickedMe = event.target.closest(".addHimHere")

        if ( clickedMe.parentElement.id === "reception" ) {
            filter("receptionist",clickedMe.parentElement.id)
        }

        else if ( clickedMe.parentElement.id === "servers" ) {
            filter("technicien",clickedMe.parentElement.id)
        }
        else if ( clickedMe.parentElement.id === "security" ) {
            filter("securite",clickedMe.parentElement.id)
        }
        else if ( clickedMe.parentElement.id === "conference"){
            filter("justGo",clickedMe.parentElement.id)
        }
        else if (clickedMe.parentElement.id === "personnel"){
            filter("justGo",clickedMe.parentElement.id)
        }

        else if (clickedMe.parentElement.id === "archive"){
            filter("archive",clickedMe.parentElement.id)
        }
        else{
            console.log("there is some error here")
        }
    }


/// part of delete
        else if (event.target.closest(".deleteBtn")){
        const clickedMe = event.target.closest(".deleteBtn")

        if (clickedMe.closest("#servers")){

        }
    }




})







function filter(roleName,idOfRoom) {

    let somethingThere = false
    allowedListSection.classList.toggle("hidden")
    alowedList.innerHTML = ""
    workerList.forEach(worker => {
        if (roleName === "archive" ){
            if ( worker.role === "manager") {
                somethingThere = true
                let allowedCard = cardIt(worker,idOfRoom)
                alowedList.append(allowedCard)
                console.log("first condition")
            }


        }



        else if (worker.role === roleName || worker.role ==="manager" || worker.role==="nettoyage" || roleName === "justGo") {
            console.log("second condition")
            somethingThere= true
            let allowedCard = cardIt(worker,idOfRoom)
            // let allowedCard = document.createElement('div')
            // allowedCard.innerHTML = `
            //         <div class="card cursor-pointer flex flex-row gap-4 py-2 border-b-2 border-b-amber-400">
            //               <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
            //               <div><h1 class="worker_NAME">${worker.name}</h1>
            //               <p class="worker_ROLE">${worker.role}</p></div>
            //          </div>`
            alowedList.append(allowedCard)
        }
    })
    if (!somethingThere) {


        noCardAvailable()
    }
    //should make statement to show unvailable people in this case
}



function cardIt(worker,idOfRoom){
    let allowedCard = document.createElement('div')
    allowedCard.innerHTML = `
                    <div id="${worker.id}"  class="card cursor-pointer flex flex-row gap-4 py-2 border-b-2 border-b-amber-400 md:hover:scale-102">
                          <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
                          <div><h1 class="worker_NAME">${worker.name}</h1>
                          <p class="worker_ROLE">${worker.role}</p></div>
                     </div>`


    allowedCard.addEventListener('click',()=>{
        if ( idOfRoom === "conference"){
            let tempTransfer = transfer(workerList,conferenceList,worker)
            workerList=tempTransfer[0]
            conferenceList=tempTransfer[1]
            showCards(workerList,workerContainer)
            showCards(conferenceList,conferenceContainer)
        }

        if ( idOfRoom === "reception"){
            let tempTransfer = transfer(workerList,receptionList,worker)
            workerList=tempTransfer[0]
            receptionList=tempTransfer[1]
            showCards(workerList,workerContainer)
        }
        if ( idOfRoom === "servers"){
            let tempTransfer = transfer(workerList,serversList,worker)
            workerList=tempTransfer[0]
            serversList=tempTransfer[1]
            showCards(workerList,workerContainer)
        }
        if ( idOfRoom === "security"){
            let tempTransfer = transfer(workerList,securityList,worker)
            workerList=tempTransfer[0]
            securityList=tempTransfer[1]
            showCards(workerList,workerContainer)
        }
        if ( idOfRoom === "personnel"){
            let tempTransfer = transfer(workerList,staffList,worker)
            workerList=tempTransfer[0]
            staffList=tempTransfer[1]
            showCards(workerList,workerContainer)
        }
        if ( idOfRoom === "archive"){
            let tempTransfer = transfer(workerList,archiveList,worker)
            workerList=tempTransfer[0]
            archiveList=tempTransfer[1]
            showCards(workerList,workerContainer)
        }
        allowedListSection.classList.toggle("hidden")
    })
    return allowedCard
}


function transfer(array1,array2,agent){

    let temp=[]
    array2.push(agent)
    array1.forEach( element=>{
        if (element !== agent){
            temp.push(element)
        }
    })
    array1 = temp
    return [array1,array2]
}



function noCardAvailable(){
    alowedList.innerHTML = `
                    <div class="text-red-500 flex flex-row gap-4 py-2 border-b-2 border-b-amber-400  ">
                          <div><h1 class="worker_NAME">desole y a pas des roles pour les ajouter dans ce poste</h1>
                    
                     </div>`
}


function cardOfRooms(objet) {
    const card = document.createElement("div")
    card.className="roomCards"
        card.innerHTML = `<div class="relative    rounded-md border-2  border-white max-w-[30%] lg:max-w-[20%] min-w-0 ">
                            <img src="${objet.img}" class="rounded-sm  w-full " alt="profile">
                            <svg id="${objet.id}" class="deleteBtn cursor-pointer absolute -top-1.5 left-1/2 -translate-x-1/2 w-[30%] aspect-square" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg">
                                <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                                      fill="#f44336"/>
                                <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                                      fill="#fafafa"/>
                            </svg>
                            <div class="absolute top-11/12 left-1/2 px-1 transform -translate-x-1/2  min-w-[120%] max-w-14  rounded-xs bg-orange-500 whitespace-nowrap  overflow-hidden flex justify-center font-semibold ">
                                <h1 class="text-[0.4rem]">${objet.name.split(" ")[0]}</h1>
                            </div>
                        </div>`
    return card
}