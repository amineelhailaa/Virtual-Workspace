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
const detailSection = document.getElementById('detailsContainer')




let workerCounter=0
let workerList = []
let conferenceList = []
let receptionList = []
let serversList = []
let securityList = []
let staffList = []
let archiveList = []
let experienceList = []




const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z._]+\.[a-z]{3,}$/
const regexFullName = /^[a-zA-Z]+\s[a-zA-Z]+$/
const regexPhone = /^0[6-7][0-9]{8}$/
const regexUrl = /^https:\/\/[a-zA-Z0-9.-_\/]+$/
const regexExp = /^[a-zA-Z]+$/



// workerList[0]={
//     id: 1,
//     name: "amine",
//     role: "whocares" ,
//     img: "../assets/emptyProfile.jpg",
//     experience: "experienceBridge" ,
//     email:"adsfasdddddd",
//     phone: "44444444444" ,
//
// }


const msgRegEx = document.getElementById("regExpEn")
const msgRegRole = document.getElementById("regRole")
const msgNameForm = document.getElementById("regFullName")
const msgImg = document.getElementById("regImg")
const msgEmail = document.getElementById("regEmail")
const msgPhone = document.getElementById("regPhone")
// const arrayOfMsg = [msgRegEx,msgRegRole,msgNameForm,msgImg,msgEmail,msgPhone]

// if(regexEmail.test(document.getElementById("email").value)){
//     toggleHidden(msgEmail)
// }//validion email
// else if( regexFullName.test(document.getElementById("name").value)) {
//     toggleHidden(msgNameForm)
// }//validation full name
// else if( regexUrl.test(document.getElementById("profileImage").src)) {
//     toggleHidden(msgImg)
// }//validation url image
// else if( regexPhone.test(document.getElementById('telephone').value)) {
//     toggleHidden(msgPhone)
// }//validation phone number
// document.querySelectorAll(".accessExperience").forEach(exrg => {
//         if (regexExp.test(exrg.querySelector(".entrepriseEx").value)) {
//             toggleHidden(msgRegEx)
//         }
//         if (regexExp.test(exrg.querySelector(".roleEx").value)) {
//             toggleHidden(msgRegRole)
//         }
//     }
// )




//validation experience entreprise














imageInput.addEventListener('input', () => {
    imageProfile.src = imageInput.value
    if( !regexUrl.test(imageInput.value)) {
            msgImg.classList.remove("hidden")
        }
    imageProfile.onerror = () => {
        imageProfile.src = "./assets/emptyProfile.jpg"
    }
})


addWorker.addEventListener('click', () => {
    formSection.classList.toggle("hidden");
})


function toggleHidden(element){
    element.classList.toggle("hidden")
}


addForm.addEventListener('submit',e=>{
    e.preventDefault()


    const arrayOfMsg = [msgNameForm,msgImg,msgEmail,msgPhone]
    arrayOfMsg.forEach(msg=>{
        msg.classList.add('hidden')
    })
    console.log(regexEmail.test(document.getElementById("email").value),msgEmail)
let valid = 1
   if(!regexFullName.test(document.getElementById("name").value)) {
        toggleHidden(msgNameForm)
        valid=0
    }//validation full name

    //  if( !regexUrl.test(document.getElementById("profileImage").src)) {
    //     toggleHidden(msgImg)
    //     valid=0
    // }//validation url image

     if(!regexEmail.test(document.getElementById("email").value)){
        toggleHidden(msgEmail)
        valid=0
    }//validion email
     if( !regexPhone.test(document.getElementById('telephone').value)) {
        toggleHidden(msgPhone)
        valid=0

    }//validation phone number


    document.querySelectorAll(".accessExperience").forEach(exrg => {
            if (!regexExp.test(exrg.querySelector(".entrepriseEx").value)) {
                toggleHidden(msgRegEx)
                valid=0
            }
             if (!regexExp.test(exrg.querySelector(".roleEx").value)) {
                toggleHidden(msgRegRole)
                valid=0
            }
        }
    )



    if(!valid){
        return
    }
     //submit reload the page

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


    console.log(regexFullName.test(document.getElementById("name").value))





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
    workerList.push(workerObjet)
    showCards(workerList,workerContainer) //affichage
    formSection.classList.toggle('hidden')
    addForm.reset()

})


function showCards(array,location) {
    if (location === workerContainer){
        location.innerHTML = ""
        array.forEach(worker =>{
            const workerCard = document.createElement('div')
            workerCard.className= "roomCards"
            workerCard.innerHTML=`<div id="${worker.id}" class=" flex flex-row gap-4 py-2 border-b-2 border-b-amber-400"> 
                        <img src="${worker.img}" alt="profile" class="rounded-full aspect-square max-h-13">
                        <div><h1 class="worker_NAME">${worker.name}</h1>
                            <p class="worker_ROLE">${worker.role}</p></div></div>
                    `
            // workerCard.id = worker.id
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
    experienceTemplate.className ="accessExperience"
    experienceTemplate.innerHTML = `<div class=" flex flex-col gap-4 ">
                    <div class="flex flex-row min-w-0 gap-2"><div class="flex flex-col"><input type="text" placeholder="Entreprise"
                                class="entrepriseEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                                 <p class="text-red-600 text-xs hidden"  id="regExpEn">company name invalid!</p></div>
                        <div class="flex flex-col"><input type="text" placeholder="Role" 
                               class="roleEx min-w-0  outline-1 outline-amber-400 rounded-md px-4 py-1">
                                <p class=" text-red-600 text-xs hidden"  id="regRole">role name invalid!</p></div>
                    </div>
                    <div class="flex flex-row min-w-0 gap-2 grow-0 ">
                        <input type="date" required
                               class="dateS min-w-0 grow outline-1 outline-amber-400 rounded-md px-4 py-1">
                        <input type="date" required
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
// roomsContainer.addEventListener('click', event => {

    document.body.addEventListener('click', event => {
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

        verifyArray()

    }

/// part of delete
        else if (event.target.closest(".deleteBtn")){
        const clickedMe = event.target.closest(".deleteBtn")
        const idToDelete = clickedMe.parentElement.id
        console.log("condition of delete btn works")
            ///
        if (clickedMe.closest("#conference")){
            conferenceList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(conferenceList,workerList,agent)
                    workerList=tempTransfer[1]
                    conferenceList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(conferenceList,conferenceContainer)
                }
            })

        }
        else if (clickedMe.closest("#reception")){
            console.log("conditons passed to reception",clickedMe.id)
            receptionList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(receptionList,workerList,agent)
                    workerList=tempTransfer[1]
                    receptionList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(receptionList,receptionContainer)
                }
            })
        }
        else if (clickedMe.closest("#servers")){
            serversList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(serversList,workerList,agent)
                    workerList=tempTransfer[1]
                    serversList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(serversList,itContainer)
                }
            })
        }
        else if (clickedMe.closest("#security")){
            securityList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(securityList,workerList,agent)
                    workerList=tempTransfer[1]
                    securityList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(securityList,securityContainer)
                }
            })
        }
        else if (clickedMe.closest("#personnel")){
            staffList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(staffList,workerList,agent)
                    workerList=tempTransfer[1]
                    staffList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(staffList,staffContainer)
                }
            })
        }
        else if (clickedMe.closest("#archive")){
            archiveList.forEach(agent=>{
                if (agent.id == idToDelete){
                    let tempTransfer = transfer(archiveList,workerList,agent)
                    workerList=tempTransfer[1]
                    archiveList=tempTransfer[0]
                    showCards(workerList,workerContainer)
                    showCards(archiveList,archiveContainer)
                }
            })
        }
        else{
            console.log("there is error in delete")
        }

            verifyArray()
    }


        //detailllllllllllllllllllllllllllllllll------------------------------

        else if(event.target.closest('.roomCards')){

            const cardToDetail = event.target.closest('.roomCards')
            const idToDetail = event.target.closest('.roomCards').querySelector('div').id //get the id of the div inside the div that has this class




        if (cardToDetail.parentElement.id === "conferenceC") {

            // let objetX = searchById(conferenceList,idToDetail)

            detailledCard(searchById(conferenceList,idToDetail),"Conference")
            }
        else if (cardToDetail.parentElement.id === "receptionC"){

            detailledCard(searchById(receptionList,idToDetail),"Reception")
        }
        else if (cardToDetail.parentElement.id === "serversC"){
            detailledCard(searchById(serversList,idToDetail),"Servers")
        }
        else if (cardToDetail.parentElement.id === "securityC"){
            detailledCard(searchById(securityList,idToDetail),"Security")
        }
        else if (cardToDetail.parentElement.id === "personnelC"){
            detailledCard(searchById(staffList,idToDetail),"Staff")
        }
        else if (cardToDetail.parentElement.id === "archiveC"){
            detailledCard(searchById(archiveList,idToDetail),"Archive")
        }

        else{
            detailledCard(searchById(workerList,idToDetail),"unssaigned")
        }


        }








})

function searchById(array,id){

    let objetx
    array.forEach(thing=>{
        if(thing.id==id){
            objetx=thing
        }
    })
    console.log(objetx);

    return objetx
}





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



        else if (worker.role === roleName || worker.role ==="manager" || worker.role==="nettoyage" || roleName === "justGo" ) {
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
    verifyArray()
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
            showCards(receptionList,receptionContainer)
        }
        if ( idOfRoom === "servers"){
            let tempTransfer = transfer(workerList,serversList,worker)
            workerList=tempTransfer[0]
            serversList=tempTransfer[1]
            showCards(workerList,workerContainer)
            showCards(serversList,itContainer)
        }
        if ( idOfRoom === "security"){
            let tempTransfer = transfer(workerList,securityList,worker)
            workerList=tempTransfer[0]
            securityList=tempTransfer[1]
            showCards(workerList,workerContainer)
            showCards(securityList,securityContainer)
        }
        if ( idOfRoom === "personnel"){
            let tempTransfer = transfer(workerList,staffList,worker)
            workerList=tempTransfer[0]
            staffList=tempTransfer[1]
            showCards(workerList,workerContainer)
            showCards(staffList,staffContainer)
        }
        if ( idOfRoom === "archive"){
            let tempTransfer = transfer(workerList,archiveList,worker)
            workerList=tempTransfer[0]
            archiveList=tempTransfer[1]
            showCards(workerList,workerContainer)
            showCards(archiveList,archiveContainer)
        }
        allowedListSection.classList.toggle("hidden")
        verifyArray()
    })

    return allowedCard
}


function transfer(array1,array2,agent){
//add loop here refactor!!!
    let temp=[]
    array2.push(agent)
    array1.forEach( element=>{
        if (element.id !== agent.id){
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
    card.className = "roomCards"
    card.innerHTML = `<div id="${objet.id}" class="relative   rounded-md border-2  border-white max-w-[30%] lg:max-w-[15%] min-w-0 ">
                            <img src="${objet.img}" class="rounded-sm  w-full " alt="profile">
                            <svg  class="deleteBtn  cursor-pointer absolute -top-1.5 left-1/2 -translate-x-1/2 w-[30%] aspect-square" viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg">
                                <path d="m256 0c-141.164062 0-256 114.835938-256 256s114.835938 256 256 256 256-114.835938 256-256-114.835938-256-256-256zm0 0"
                                      fill="#f44336"/>
                                <path d="m350.273438 320.105469c8.339843 8.34375 8.339843 21.824219 0 30.167969-4.160157 4.160156-9.621094 6.25-15.085938 6.25-5.460938 0-10.921875-2.089844-15.082031-6.25l-64.105469-64.109376-64.105469 64.109376c-4.160156 4.160156-9.621093 6.25-15.082031 6.25-5.464844 0-10.925781-2.089844-15.085938-6.25-8.339843-8.34375-8.339843-21.824219 0-30.167969l64.109376-64.105469-64.109376-64.105469c-8.339843-8.34375-8.339843-21.824219 0-30.167969 8.34375-8.339843 21.824219-8.339843 30.167969 0l64.105469 64.109376 64.105469-64.109376c8.34375-8.339843 21.824219-8.339843 30.167969 0 8.339843 8.34375 8.339843 21.824219 0 30.167969l-64.109376 64.105469zm0 0"
                                      fill="#fafafa"/>
                            </svg>
                            <div class="absolute top-11/12 left-1/2 px-1 transform -translate-x-1/2  min-w-[120%] max-w-14  rounded-xs bg-orange-500 whitespace-nowrap  overflow-hidden flex justify-center font-semibold ">
                                <h1 class="text-[0.4rem]">${objet.name.split(" ")[0]}</h1>
                            </div>
                        </div>`
    verifyArray()
    return card
}


function experienceCardDetail(arrayofexperience) {
    console.log(arrayofexperience)
    const fullexperience = document.createElement("div")
    fullexperience.className=" w-full flex flex-col gap-2 pt-2"
    fullexperience.innerHTML=""
    arrayofexperience.forEach(exp=>{

        fullexperience.innerHTML+=`<div class="experienceDetailled w-full bg-amber-300 text-white shadow-md rounded-2xl p-2">

            <p class="flex w-full gap-7"><span>${exp.company}</span><span>${exp.role}</span></p>
            <p class="flex w-full gap-7"><span class="dateDebutEx">Start: ${exp.dateS}</span><span class="dateFinEx">End: ${exp.dateE}</span></p>
        </div>`
    })
return fullexperience
}



const detailPage = document.getElementById('detailCard')


function detailledCard(objet,location){
    console.log(objet,"this is the one")
    detailSection.classList.toggle('hidden')
    detailPage.querySelector('#NameDetail').textContent = `${objet.name}`
    detailPage.querySelector('#phoneDetail').textContent = `${objet.phone}`
    detailPage.querySelector('#emailDetail').textContent = `${objet.email}`
    detailPage.querySelector('#roleDetail').textContent = `${objet.role}`
    detailPage.querySelector('#locationDetail').textContent = location
    detailPage.querySelector('#experienceContainerDetail').innerHTML=""
    detailPage.querySelector('#experienceContainerDetail').append(experienceCardDetail(objet.experience))
}





function verifyArray(){

receptionContainer.parentElement.classList.toggle("bg-red-500/60",receptionList.length===0)
archiveContainer.parentElement.classList.toggle("bg-red-500/60",archiveList.length===0)
itContainer.parentElement.classList.toggle("bg-red-500/60",serversList.length===0)
securityContainer.parentElement.classList.toggle("bg-red-500/60",securityList.length===0)
}