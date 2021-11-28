import { Octokit } from "https://cdn.skypack.dev/@octokit/core";

const octokit = new Octokit({
    auth: `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`
});

const inputPesquisar = $('#inputPesquisa');
const form = $('.pesquisaRepositorio form');

form.on('submit',
    async function searchReposUser(e) {
        e.preventDefault();

        if (inputPesquisar.val()) {
            const reposUser = await octokit.request('GET /users/{username}/repos', {
                username: `${inputPesquisar.val()}`,
                accept: 'application / vnd.github.v3 + json',
                per_page: 10
            })

            //console.log(reposUser.data);
            repositorios(reposUser.data);
        }
    }
);

async function repositorios(infos) {
    const lista = infos.map(function(item) {
        return {
            name: item.name,
            description: item.description,
            html_url: item.html_url,
            created_at: item.created_at,
            updated_at: item.updated_at,
            visibility: item.visibility,
            login: item.owner.login,
            avatar: item.owner.avatar_url,
            perfil_link: item.owner.html_url
        }
    });

    //Função que cria a lista de repositórios
    console.log(lista);
    criarLista(lista);
}

function criarLista(infos) {
    const perfil = document.querySelector('.content-list-container');

    // Ao iniciar uma pesquisa, a div 'perfil' é limpa
    perfil.innerHTML = "";

    // Criar uma div pra cada resultado da pesquisa
    const div = document.createElement('div');
    div.className = 'perfil';

    // Criar elemento para comportar a imagem de cada usuário
    const img = document.createElement('img');
    img.src = `${infos[0].avatar}`;

    // Criar elemento para comportar o nome de cada usuário
    const namePerfil = document.createElement('a');
    namePerfil.setAttribute('href', infos[0].perfil_link);
    namePerfil.setAttribute('target', '_blank');
    namePerfil.appendChild(document.createTextNode(infos[0].login));

    // Atribuição dos elementos 'img' e 'namePerfil' à uma div
    div.appendChild(img);
    div.appendChild(namePerfil);
    perfil.appendChild(div);

    // Criação do elemento ul para armazenar as li's
    const ul = document.createElement('ul');
    ul.id = 'reposList';

    // Atribuição da lista à div
    perfil.appendChild(ul);

    for (const item of infos) {
        // Criar elemento para comportar o título do repositório
        const nameRepos = document.createElement('a');
        nameRepos.setAttribute('href', item.html_url);
        nameRepos.setAttribute('target', '_blank');
        nameRepos.appendChild(document.createTextNode(item.name));

        // Criar elemento para comportar a descrição do repositório
        const descriptionEl = document.createElement('p');
        descriptionEl.appendChild(document.createTextNode(item.description));

        // Criação do elemento li
        const itemEl = document.createElement('li');

        // Atribuição das li's ao ul
        itemEl.appendChild(nameRepos);
        itemEl.appendChild(descriptionEl);
        ul.appendChild(itemEl);
    }
}