const APIURL = 'https://api.github.com/users/'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// getUser('RTharanij')

async function getUser(username) {
    try {
        const { data } = await axios(APIURL + username)

        createUserCard(data)
        getRepos(username)
        console.log(data);

    } catch (error) {
        if(error.response.status == 404){
            createErrorCard('No profile with theis user name')
        }
        console.log(error);

    }
}  

async function getRepos(username) {

    try {
        const {data} = await axios(APIURL + username + '/repos?sort=created')

        addReposToCard(data) ;
        
    } catch (error) {
        createErrorCard('Problem in fetching repolist')
        console.log(error)
        
    }
}



function createUserCard(user) {
    const cardHTML = 

`
<div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}"
                    class="avatar">
            </div>


            <div class="user-info">
                <h2>${user.name}</h2>
                <p>${user.bio}</p>
                <ul>
                    <li>Followers <strong>${user.followers}</strong></li>
                    <li>Following <strong>${user.following}</strong></li>
                    <li>Repos <strong>${user.public_repos}</strong></li>
                </ul>

                <div id="repos">
                  
                </div>
            </div>
        </div>
                `
    main.innerHTML = cardHTML
    }

    function addReposToCard(repos) {

        const reposEl = document.getElementById('repos')
        repos
        .slice(0, 5)
        .forEach(repo => {

        const repoEl = document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href = repos.html_url
        repoEl.target = '_blank'
        repoEl.innerText = repo.name


        reposEl.appendChild(repoEl)

        })
        
    }


    function createErrorCard(message) {
        const cardHTML = `
        <div class="card">
        <h1>${message}</h1>
        </div>`

        main.innerHTML = cardHTML


    }


    form.addEventListener('submit', e => {
        e.preventDefault()

        const user = search.value
        if(user) {
            getUser(user)
            search.value =''
        }
    })