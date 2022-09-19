
const URL = 'https://api.github.com/users/';

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

function getUserName(username){
    fetch(URL+username)
    .then(res => res.json())
    .then( data => {
        if(data.message === "Not Found"){
            error();
        }
        else{
            console.log(data);
            
            createCard(data);
            getRepo(username)
        }
    })
}

function getRepo(username){
    fetch(URL+username +'/repos')
    .then(res => res.json())
    .then( data => {
        if(data.message === "Not Found"){
            console.log("No such user");
        }
        else{
            
            listRepo(data);
        }
    })
}

function createCard(data){
    const name =data.name;
    const bio = data.bio;
    const repoCount = data.public_repos;
    const followers = data.followers;
    const following = data.following;
    const avatarURL = data.avatar_url;
   const  cardHTML = `<div class="card">
    <div>
        <img src="${avatarURL}" alt="" class="avatar">
    </div>
    <div class="user-info">
        <h2>${name}</h2>
        <p>${bio}</p>

        <ul>
            <li>${followers} <strong>Followers</strong></li>
            <li>${following} <strong>Following</strong></li>
            <li>${repoCount} <strong>Repos</strong></li>
        </ul>
        <div id="repo">
        </div>
    </div>
</div>`;

 main.innerHTML = cardHTML;



}

function listRepo(data){
    const repoEl = document.getElementById("repo");

    data.slice(0,10).forEach((repo)=>{
        const repoLink = document.createElement("a");
        repoLink.href = repo.html_url;
        repoLink.target ="_blank";
        repoLink.innerText = repo.name;
        repoLink.classList.add("repos")
        repoEl.appendChild(repoLink)
    })
}

 function error(){
    const err_title = `<h1>User Not Found</h1>`;
    main.innerHTML = err_title;
 }

form.addEventListener('submit' , (e)=>{
    e.preventDefault();


    const user = search.value;

    if(user){
        getUserName(user)
        search.value ='';

    }
    
})