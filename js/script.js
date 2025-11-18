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


    const workerCard = document.createElement('div')
    e.preventDefault()
    workerCard.className= "flex flex-row gap-4 py-2 border-b-2 border-b-amber-400"
    workerCard.id="worker_id_here"
    workerCard.innerHTML=`
                        <img src="../assets/emptyProfile.jpg" alt="profile" class="rounded-full aspect-square max-h-13">
                        <div><h1 class="worker_NAME">AMINE ELHAILAA</h1>
                            <p class="worker_ROLE">Role</p></div>
                    `
    workerCard.querySelector('.worker_NAME').textContent = workerObjet.name
    workerCard.querySelector('.worker_ROLE').textContent = workerObjet.role
    workerCard.querySelector('img').src = workerObjet.img
    formSection.classList.toggle('hidden')
    console.log(workerList)
    workerContainer.append(workerCard)
    workerList.push(workerObjet)

})










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
    if (event.target.closest(".addHimHere")) {
        const clickedMe = event.target.closest(".addHimHere")
        if ( clickedMe.parentElement.id === "reception" ) {
            filter("receptionist")
        }
        if ( clickedMe.parentElement.id === "servers" ) {
            filter("technicien")
        }
        if ( clickedMe.parentElement.id === "security" ) {
            filter("securite")
        }
        if ( clickedMe.parentElement.id === "conference"){
            filter("justGo")
        }
    }



    if (event.target.className)


    if (event.target.id === "conference") {

    }
    if (event.target.id === "reception") {

    }
    if (event.target.id === "servers") {

    }
    if (event.target.id === "security") {

    }
    if (event.target.id === "personnel") {

    }
    if (event.target.id === "archive") {

    }
})







function filter(roleName) {

    let somethingThere = false
    allowedListSection.classList.toggle("hidden")
    alowedList.innerHTML = ""
    workerList.forEach(worker => {
        if (worker.role === roleName || roleName === "justGo") {
            somethingThere= true
            let allowedCard = document.createElement('div')
            allowedCard.innerHTML = `
                    <div class="card cursor-pointer flex flex-row gap-4 py-2 border-b-2 border-b-amber-400">
                          <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
                          <div><h1 class="worker_NAME">${worker.name}</h1>
                          <p class="worker_ROLE">${worker.role}</p></div>
                     </div>`
            alowedList.append(allowedCard)
        }
    })
    if (somethingThere === false) {
        alowedList.innerHTML = ""

        alowedList.innerHTML = `
                    <div class="text-red-500 cursor-pointer flex flex-row gap-4 py-2 border-b-2 border-b-amber-400">
                          <div><h1 class="worker_NAME">desole y a pas des roles pour les ajouter dans ce poste</h1>
                    
                     </div>`
    }
    //should make statement to show unvailable people in this case
}

