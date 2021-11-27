function apiDados() {
    let xhr = new XMLHttpRequest();

    xhr.onload = function() {
        const data = JSON.parse(this.responseText);
        perfil(data);
        repositorios(data);
    }

    xhr.onerror = function() {
        alert(`Erro na requisição dos dados\n Código: ${this.status} - ${this.statusText}`);
    }

    xhr.open('GET', 'https://api.github.com/users/nikolaslouret');
    xhr.send();
}

function perfil(data) {
    $('#perfil').append(`<!--Imagem do perfil-->
                    <div class="col-12 col-sm-12 col-md-3 col-lg-3">
                        <img src="${data.avatar_url}" id="scrollspyHeading1">
                    </div>

                    <!--Texto e Redes do perfil-->
                    <div class="col-12 col-sm-12 col-md-9 col-lg-9">
                        <!--Texto-->
                        <div class="row texto_perfil">
                            <a href="${data.html_url}" target="_blank" title="Perfil no GitHub">${data.name}</a>
                            <p><strong class="bold">Biografia:</strong> ${data.bio}</p>
                        </div>

                        <!--Redes-->
                        <div class="row redes">
                            <h4>Redes Sociais</h4>
                            <div class="col-12 icones_redes">
                                <a class="facebook" href="https://web.facebook.com/" target="_blank" title="Perfil no Facebook"><i class="fab fa-facebook-square fa-2x"></i></a>
                                <a class="twitter" href="https://twitter.com/home" target="_blank" title="Perfil no Twitter"><i class="fab fa-twitter fa-2x"></i></a>
                                <a class="instagram" href="https://www.instagram.com/" target="_blank" title="Perfil no Instagram"><i class="fab fa-instagram fa-2x"></i></a>
                                <a class="gitHub" href="${data.html_url}" target="_blank" title="Perfil no GitHub"><i class="fab fa-github fa-2x"></i></a>
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
            html_url: item.html_url
        }
    });

    console.log(lista);

    $('.conteudo_repositorio').append(`<a href="${data.repos_url}" target="_blank" title="Repositórios" id="scrollspyHeading4">Repositórios <br class="quebra_mobile"> GitHub</a>
                                <!--Repositório A-->
                                <div class="col-12 col-lg-4 col-md-4 info_repositorio">
                                    <img src="">
                                    <a href="https://github.com/notepad-plus-plus/notepad-plus-plus" target="_blank" title="Repositórios" >Notepad++</a>
                                    <div class="row text_repositorio">
                                        <p><strong class="bold">Avaliação:</strong> O Notepad++ é um editor de código-fonte gratuito e um substituto do Notepad que suporta várias linguagens de programação e linguagens naturais. Rodando em ambiente MS Windows,
                                            seu uso é regido pela Licença GPL</p>
                                        <p><strong class="bold">Atualizado em: 29/09/2021</strong></p>
                                    </div>
                                </div>

                                <!--Repositório B-->
                                <div class="col-12 col-lg-4 col-md-4 info_repositorio">
                                    <img src="">
                                    <a href="https://github.com/OAI/OpenAPI-Specification" target="_blank" title="Repositórios" >Especificação OpenAI</a>
                                    <div class="row text_repositorio">
                                        <p><strong class="bold">Avaliação:</strong> A especificação OpenAPI é uma especificação aberta dirigida pela comunidade dentro da OpenAPI Initiative, um projeto colaborativo da Linux Foundation</p>
                                        <p><strong class="bold">Atualizado em: 27/09/2021</strong></p>
                                    </div>
                                </div>

                                <!--Repositório C-->
                                <div class="col-12 col-lg-4 col-md-4 info_repositorio">
                                    <img src="">
                                    <a href="https://github.com/scipy/scipy" target="_blank" title="Repositórios" >SciPy</a>
                                    <div class="row text_repositorio">
                                        <p><strong class="bold">Avaliação:</strong> SciPy é um software de código aberto para matemática, ciências e engenharia. Inclui módulos para estatística, otimização, integração, álgebra linear, transformadas de Fourier,
                                            processamento de sinal e imagem, solucionadores de ODE e muito mais</p>
                                        <p><strong class="bold">Atualizado em: 01/10/2021</strong></p>
                                    </div>
                                </div>

                                <!--Botão Mais Repositórios-->
                                <div class="row botao_mais">
                                    <div class="col-12">
                                        <button class="btn carregarMais" type="submit">+ Carregar mais Repositórios</button>
                                    </div>
                                </div>`);
}