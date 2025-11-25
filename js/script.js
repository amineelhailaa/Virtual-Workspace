const addWorker = document.getElementById("addWorker");
const cancelAdding = document.getElementById("btnAnnulerSubmit")
const formSection = document.getElementById("form_section");
const allowedListSection = document.getElementById("popUpAllowedList")
const addForm = document.getElementById("addForm")
const imageProfile = document.getElementById("profileImage")
const imageInput = document.getElementById("inputProfile");
const experienceContainer = document.getElementById("experienceContainer");
const addExperience = document.getElementById("btnExper");
const workerContainer = document.getElementById('workerContainer')
const alowedList = document.getElementById("allowedList")
const detailSection = document.getElementById('detailsContainer')
const detailPage = document.getElementById('detailCard')

const sallesRules = {
    conference: ["receptionist", "technicien", "manager", "securite", "nettoyage", "other"],
    personnel: ["receptionist", "technicien", "manager", "securite", "nettoyage", "other"],
    reception: ["receptionist", "manager", "nettoyage"],
    servers: ["technicien", "manager", "nettoyage"],
    security: ["manager", "securite", "nettoyage"],
    archive: ["manager"]
}
const sallesKeys = ["conference", "personnel", "servers", "security", "archive", "reception"]
const salleMax = {
    conference: 6,
    personnel: 3,
    servers: 3,
    security: 3,
    archive: 3,
    reception: 6
}


let workerCounter = JSON.parse(localStorage.getItem('counter')) || 0
let workerList = JSON.parse(localStorage.getItem("workerList")) || []
showCards(1)

const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z._]+\.[a-z]{3,}$/
const regexFullName = /^[a-zA-Z]+\s*[a-zA-Z]+\s*[a-zA-Z]*$/
const regexPhone = /^0[6-7][0-9]{8}$/
const regexUrl = /^https?:\/\/.+$/
const regexExp = /^[a-zA-Z]+\s*[a-zA-Z]*\s*[a-zA-Z]*$/

const msgNameForm = document.getElementById("regFullName")
const msgImg = document.getElementById("regImg")
const msgEmail = document.getElementById("regEmail")
const msgPhone = document.getElementById("regPhone")

imageInput.addEventListener('input', () => {
    imageProfile.src = imageInput.value
    if (!regexUrl.test(imageInput.value)) {
        msgImg.classList.remove("hidden")
    } else {
        msgImg.classList.add("hidden")
    }
    imageProfile.onerror = () => {
        imageProfile.src = "./assets/emptyProfile.jpg"
    }
})

addWorker.addEventListener('click', () => {
    formSection.classList.toggle("hidden");
})

function toggleAddReset() {
    const allMsgs = document.querySelectorAll("#regFullName,#regImg,#regEmail,#regPhone,.regRole,.regExpEn")
    allMsgs.forEach(element => {
        element.classList.add("hidden")
    })
}

function toggleHidden(element) {
    element.classList.remove("hidden")
}

addForm.addEventListener('submit', e => {
    e.preventDefault()
    console.log(regexEmail.test(document.getElementById("email").value), msgEmail)
    let valid = 1
    if (!regexFullName.test(document.getElementById("name").value)) {
        toggleHidden(msgNameForm)
        valid = 0
    }//validation full name
    if (!regexEmail.test(document.getElementById("email").value)) {
        toggleHidden(msgEmail)
        valid = 0
    }//validion email
    if (!regexPhone.test(document.getElementById('telephone').value)) {
        toggleHidden(msgPhone)
        valid = 0
    }//validation phone number
    document.querySelectorAll(".accessExperience").forEach(exrg => {
        if (!regexExp.test(exrg.querySelector(".entrepriseEx").value)) {
            toggleHidden(exrg.querySelector('.regExpEn'))

            valid = 0
        }
        if (!regexExp.test(exrg.querySelector(".roleEx").value)) {
            toggleHidden(exrg.querySelector('.regRole'))
            valid = 0
        }
        console.log(exrg.querySelector(".dateE").value)
        if (parseInt(exrg.querySelector(".dateE").value) < parseInt(exrg.querySelector(".dateS").value)) {
            alert("date of experience is not correct")
            valid = 0
        }
    })
    if (!valid) {
        return
    }
    workerCounter++
    localStorage.setItem('counter', JSON.stringify(workerCounter))
    let experienceBridge = []
    const experiences = addForm.querySelectorAll('.accessExperience')
    experiences.forEach(ex => {
        if (ex.querySelector('.entrepriseEx').value !== "") {
            let storeExperience = {
                company: ex.querySelector('.entrepriseEx').value,
                role: ex.querySelector('.roleEx').value,
                dateS: ex.querySelector('.dateS').value,
                dateE: ex.querySelector('.dateE').value
            }
            experienceBridge.push(storeExperience)
        }
    })
    console.log(regexFullName.test(document.getElementById("name").value))
    let workerObjet = {
        id: workerCounter,
        name: document.getElementById("name").value,
        role: document.getElementById("role").value,
        salle: 0,
        img: document.getElementById("profileImage").src,
        experience: experienceBridge,
        email: document.getElementById("email").value,
        phone: document.getElementById('telephone').value,
    }

    console.log("hmm")
    workerList.push(workerObjet)
    localsave()
    showCards(0) //affichag
    formSection.classList.toggle('hidden')
    addForm.reset()
    toggleAddReset()
})


function localsave() {
    localStorage.setItem("workerList", JSON.stringify(workerList))
}


function showCards(location) {
    console.log(location, "location of show cards function")
    if (location === 0) {
        workerContainer.innerHTML = ""
        workerList.forEach(worker => {
            console.log("i got there", location)
            if (worker.salle === 0) {
                const workerCard = document.createElement('div')
                workerCard.className = "roomCards"
                workerCard.dataset.id = worker.id
                workerCard.innerHTML = `<div id="${worker.id}" class=" flex flex-row gap-4 py-2 border-b-2 border-b-amber-400"> 
                        <img src="${worker.img}" onerror="this.src='./assets/emptyProfile.jpg'" alt="profile" class="rounded-full aspect-square max-h-13">
                        <div><h1 class="worker_NAME">${worker.name}</h1>
                            <p class="worker_ROLE">${worker.role}</p></div></div>
                    `
                console.log("dkhl lfunction")
                workerContainer.append(workerCard)
            }
        })
    } else {
        sallesKeys.forEach(salle => {
            let where = document.querySelector(`div[data-salle="${salle}"]`).parentElement.querySelector('.roomate')
            where.innerHTML = ""
            workerList.forEach(mate => {

                if (mate.salle === salle) {
                    console.log("showroom condition is true")
                    console.log(mate)
                    let roomcards = cardOfRooms(mate)
                    console.log(roomcards, "WHYYYYYYYYY")
                    where.append(roomcards)
                }
            })
            verifyArray(where)
        })
        showCards(0)
    }
}

cancelAdding.addEventListener('click', () => {
    formSection.classList.toggle("hidden");
    console.log("whatsgoing on")
})

hideOnEmptyClick(formSection)
hideOnEmptyClick(allowedListSection)
hideOnEmptyClick(detailSection)

function hideOnEmptyClick(form) {
    form.addEventListener('click', (e) => {
        if (e.target === form) {
            form.classList.toggle("hidden");
        }
    })
}

addExperience.addEventListener('click', () => {
    const experienceTemplate = document.createElement("div")
    experienceTemplate.className = "accessExperience"
    experienceTemplate.innerHTML = `<div class=" flex flex-col gap-4 ">
                    <div class="flex flex-row min-w-0 gap-2"><div class="flex flex-col min-w-0"><input type="text" placeholder="Entreprise"
                                class="entrepriseEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                                 <p class="regExpEn text-red-600 text-xs hidden">company name invalid!</p></div>
                        <div class="flex flex-col min-w-0"><input type="text" placeholder="Role" 
                               class="roleEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                                <p class="regRole text-red-600 text-xs hidden" >role name invalid!</p></div>
                    </div>
                    <div class="flex flex-row min-w-0 gap-2 grow-0 ">
                    
                    <div class="flex flex-col w-full"><label for="dateS">start date</label>
                        <input type="date" required
                               class="dateS min-w-0 grow outline-1 outline-amber-400 rounded-md px-4 py-1">
                               </div>
                               
                               <div class="flex flex-col w-full"><label for="dateS">start date</label>
                        <input type="date" required
                               class="dateE min-w-0 grow outline-1 outline-amber-400 rounded-md px-4 py-1"></div>
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


document.body.addEventListener('click', event => {
/// part of ajout
    if (event.target.closest(".addHimHere")) {
        const clickedMe = event.target.closest(".addHimHere").dataset.salle
        const divClicked = event.target.closest(".addHimHere")
        console.log(clickedMe)
        let somethingThere = false
        if (!fullOrNot(clickedMe)) {
            alert("becarful the room is full")
            return
        }
        allowedListSection.classList.toggle("hidden")
        alowedList.innerHTML = ""
        workerList.forEach(worker => {
            if (allowedHere(worker, clickedMe)) {
                somethingThere = true
                let allowedCard = cardIt(worker, divClicked)
                alowedList.append(allowedCard)
            }
        })
        if (somethingThere === false) noCardAvailable();

        // else {
        //     console.log("hi")
        // }

    }
/// part of delete
    else if (event.target.closest(".deleteBtn")) {
        const clickedMe = event.target.closest(".deleteBtn")
        const idToDelete = clickedMe.parentElement.parentElement.dataset.id

        workerList.forEach(man => {
            if (man.id === parseInt(idToDelete)) {
                man.salle = 0
                localsave()
                showCards(1)
                console.log(man, idToDelete)
            }
        })

    }
    //detailllllllllllllllllllllllllllllllll------------------------------
    else if (event.target.closest('.roomCards')) {
        console.log("yama")
        const cardToDetail = event.target.closest('.roomCards').dataset.id
        workerList.forEach(ell => {
            if (ell.id === parseInt(cardToDetail)) {
                detailledCard(ell)
            }
        })
    } else if (event.target.closest('#deleteUser')) {
        const eliminatedUser = event.target.closest('#deleteUser').dataset.id
        let temp = []
        workerList.forEach(agent => {
            if (agent.id !== parseInt(eliminatedUser)) {
                temp.push(agent)
            }
        })
        workerList = temp
        localsave()
        showCards(1)
        detailSection.classList.add('hidden')
    }
})


function allowedHere(theMan, salle) {
    let yesNo = 0
    sallesRules[salle].forEach(role => {
        console.log(role)
        if (role === theMan.role && theMan.salle !== salle) {
            yesNo = 1
        }
    })
    return yesNo
}

function cardIt(worker, idOfRoom) {
    let allowedCard = document.createElement('div')
    allowedCard.dataset.id = worker.id
    allowedCard.innerHTML = `
                    <div data-id="${worker.id}"  class="card cursor-pointer flex flex-row gap-4 py-2 border-b-2 border-b-amber-400 md:hover:scale-102">
                          <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
                          <div><h1 class="worker_NAME">${worker.name}</h1>
                          <p class="worker_ROLE">${worker.role}</p></div>
                     </div>`
//     console.log(idOfRoom.dataset.salle,"this is the id of room")
    allowedCard.addEventListener('click', () => {
        let theMan = allowedCard.dataset.id
        console.log(theMan, "this is theMan")
        workerList.forEach(e => {
            if (e.id === parseInt(theMan)) {
                // console.log("this is the mannmnnnnnnnnnnnnnnnn ",e.id,theMan)
                e.salle = idOfRoom.dataset.salle
            }
        })
        localsave()
        console.log("event triggered", idOfRoom)
        console.log("IDOFROOM", idOfRoom.parentElement.querySelector('.roomate'))
        showCards(1)
        allowedListSection.classList.toggle("hidden")
    })
    return allowedCard
}

function noCardAvailable() {
    alowedList.innerHTML = `
                    <div class="text-red-500 flex flex-row gap-4 py-2 border-b-2 border-b-amber-400  ">
                          <div><h1 class="worker_NAME">There is no qualified workers to add here</h1>
                     </div>`
}


function cardOfRooms(objet) {
    const card = document.createElement("div")
    card.className = "roomCards"
    card.dataset.id = objet.id
    console.log("im in cardofrooms , tara")
    card.innerHTML = `<div  class="relative flex gap-[5%]   rounded-sm bg-white border-2  border-white max-w-[50px] md:max-w-[80px] aspect-[3/1] min-w-0 ">
                                <img src="${objet.img}"  onerror="this.src='./assets/emptyProfile.jpg'" class="rounded-sm  " alt="profile">
                                <svg  class="deleteBtn  cursor-pointer absolute top-1/2 left-full -translate-1/2 w-[20%] aspect-square" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg">
                                    <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                                          fill="#f44336"/>
                                    <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                                          fill="#fafafa"/>
                                </svg>
                                <div class="   text-[8px] md:text-[9px] text-black flex flex-col justify-start  leading-none   sm:leading-tight"><h1 class="border-b-amber-400 border-b-[1px] lg:border-b-2 w-fit m-0" >${objet.name.split(" ")[0]}</h1><p class="text-[6px] sm:text-[8px]">${objet.role}</p> </div>

                            </div>`

    return card
}


function experienceCardDetail(arrayofexperience) {
    console.log(arrayofexperience)
    const fullexperience = document.createElement("div")
    fullexperience.className = " w-full flex flex-col gap-2 pt-2"
    fullexperience.innerHTML = ""
    arrayofexperience.forEach(exp => {

        fullexperience.innerHTML += `<div class="experienceDetailled w-full bg-amber-300 text-white shadow-md rounded-2xl p-2">

            <p class="flex flex-col w-full "><span>E/ses: ${exp.company}</span><span>Post: ${exp.role}</span></p>
            <p class="flex w-full gap-7"><span class="dateDebutEx">Start: ${exp.dateS}</span><span class="dateFinEx">End: ${exp.dateE}</span></p>
        </div>`
    })
    return fullexperience
}


function detailledCard(objet) {
    console.log(objet, "this is the one")
    detailSection.classList.toggle('hidden')
    detailPage.querySelector('#NameDetail').textContent = `${objet.name}`
    detailPage.querySelector('#phoneDetail').textContent = `${objet.phone}`
    detailPage.querySelector('#emailDetail').textContent = `${objet.email}`
    detailPage.querySelector('#roleDetail').textContent = `${objet.role}`

    objet.salle ? detailPage.querySelector('#locationDetail').textContent = `${objet.salle}` : detailPage.querySelector('#locationDetail').textContent = "unssaigned"
    // detailPage.querySelector('#locationDetail').textContent = `${objet.salle}`
    detailPage.querySelector('#experienceContainerDetail').innerHTML = ""
    detailPage.querySelector('#experienceContainerDetail').append(experienceCardDetail(objet.experience))
    detailPage.querySelector('#imgDetail').src = objet.img
    detailPage.querySelector('#deleteUser').dataset.id = objet.id
}


function verifyArray(container) {
    console.log(container)
    if (container.querySelectorAll('div').length !== 0) {
        container.parentElement.classList.remove('bg-red-500/40')
        console.log("gotcha", container)
    } else {
        if (!container.classList.contains('free'))
            container.parentElement.classList.add('bg-red-500/40')
    }
}

function fullOrNot(salle) {
    let weight = 0
    workerList.forEach(man => {
        if (man.salle === salle) {
            weight++
        }
    })
    return salleMax[salle] > weight
}