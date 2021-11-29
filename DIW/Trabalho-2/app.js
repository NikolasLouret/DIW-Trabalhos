function apiDados() {
    //Calcula o ano
    document.querySelector('#anoCpyright').innerHTML = new Date().getFullYear();

    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
            console.log(data);
            perfil(data);
            repositorios(data);
        } else
            alert(`Erro código: ${this.status}`);
    }

    xhr.onerror = function() {
        alert(`Erro na requisição dos dados \nCódigo: ${this.status} - ${this.statusText}`);
    }

    xhr.open('GET', 'https://api.github.com/users/nikolaslouret');
    xhr.send();
}

function perfil(data) {
    $('#perfil').append(`<!--Imagem do perfil-->
                        <img src="${data.avatar_url}" id="avatar_img" title="Foto de Perfil">

                        <!--Texto e Redes do perfil-->
                        <div class="infosPerfil">
                            <!--Texto-->
                            <div class="texto_perfil">
                                <a href="${data.html_url}" target="_blank" title="Perfil no GitHub">${data.name}</a>
                                <p class="bio" title="Biografia">${data.bio}</p>
                            </div>

                            <div class="infos">
                                <div class="linha-1">
                                    <div id="location">
                                        <span><i class="fas fa-map-marker-alt"></i> Localização</span>
                                        : ${data.location}
                                    </div>

                                    <div id="created_at">
                                        <span><i class="fas fa-user"></i> Entrou</span>
                                        : ${arrumaData(data.created_at)}
                                    </div>
                                </div>

                                <div class="linha-2">
                                    <div id="public_repos">
                                        <span><i class="fab fa-github"></i> Repositórios</span>
                                        : ${data.public_repos}
                                    </div>

                                    <div id="email">
                                        <span><i class="fas fa-envelope"></i> Email</span>
                                        : ${data.email}
                                    </div>
                                </div>
                            </div>
                            <a class="linkPerfil" href="${data.html_url}" target="_blank"><button id="btn-perfil" title="Acessar perfil no GitHub">Carregar perfil</button></a>
                        </div>`);
}

async function repositorios(data) {
    const api = async() => {
        const response = await fetch(`https://api.github.com/users/NikolasLouret/repos`, { method: "GET" });
        const repos = await response.json();

        return repos;
    }

    const api_data = await api();

    const lista = api_data.map(function(item) {
        return {
            name: item.name,
            created_at: item.created_at,
            updated_at: item.updated_at,
            description: item.description,
            html_url: item.html_url,
            location: item.location,
            twitter_username: item.twitter_username,
            public_repos: item.public_repos,
            email: item.email
        }
    });

    $('.conteudo_repositorio').append(`<div class="content_tittleRepos">
                                            <strong id="reposSubtittle">Pojetos</strong>
                                            <h2 class="tituloRepos" title="Repositórios GitHub">Repositórios</h2>
                                            <p class="textTittle">Repositórios desenvolvidos para as disciplinas do curso de Eng. de Software da PUC Minas, com propósito de estudo.</p>
                                            <div class="lineRepos"></dv>
                                        </div>`);

    for (var i = 0; i < lista.length; i++) {
        $('.conteudo_repositorio').append(`<div class="col-12 col-lg-4 col-md-4 info_repositorio">
                        <img src="img/File.png">
                        <a href="${lista[i].html_url}" target="_blank" title="${lista[i].name}">${lista[i].name}</a>
                        <div class="row text_repositorio">
                            <p><strong class="bold" title="Descrição">Descrição: </strong>${lista[i].description}</p>
                            <p><strong class="bold" title="Última Atualização">Atualizado em: ${arrumaData(lista[i].updated_at)}</strong></p>
                        </div>
                    </div>`);
    }
}

function arrumaData(data) {
    data = data.substr(0, data.indexOf("T"));
    var date = new Date(data);

    var dataFormatada = date.toLocaleDateString('pt-BR', { timeZone: 'UTC' });

    return dataFormatada;
}