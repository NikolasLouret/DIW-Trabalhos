function apiDados() {
    //Calcula o ano
    document.querySelector('#anoCpyright').innerHTML = new Date().getFullYear();

    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (this.status === 200) {
            const data = JSON.parse(this.responseText);
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
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3">
                        <img src="${data.avatar_url}" id="scrollspyHeading1" title="Foto de Perfil">
                    </div>

                    <!--Texto e Redes do perfil-->
                    <div class="col-12 col-sm-12 col-md-9 col-lg-9">
                        <!--Texto-->
                        <div class="row texto_perfil">
                            <a href="${data.html_url}" target="_blank" title="Perfil no GitHub">${data.name}</a>
                            <p title="Biografia">${data.bio}</p>
                        </div>

                        <!--Redes-->
                        <div class="row redes">
                            <h4 title="Redes Sociais">Redes Sociais</h4>
                            <div class="col-12 icones_redes">
                                <a class="facebook" href="https://web.facebook.com/" target="_blank" title="Perfil no Facebook"><i class="fab fa-facebook-square"></i></a>
                                <a class="twitter" href="https://twitter.com/${data.twitter_username}" target="_blank" title="Perfil no Twitter"><i class="fab fa-twitter"></i></a>
                                <a class="instagram" href="https://www.instagram.com/" target="_blank" title="Perfil no Instagram"><i class="fab fa-instagram"></i></a>
                                <a class="gitHub" href="${data.html_url}" target="_blank" title="Perfil no GitHub"><i class="fab fa-github"></i></a>
                            </div>
                        </div>
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
            description: item.description,
            html_url: item.html_url,
            updated_at: item.updated_at,
            location: item.location,
            twitter_username: item.twitter_username
        }
    });

    $('.conteudo_repositorio').append(`<p class="tituloRepos" title="Repositórios" id="scrollspyHeading4">Repositórios GitHub</p>`);

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