import api from './api';

class App {
   constructor() {
     this.repositories = [];
     this.formEl = document.getElementById('repo-form');
     this.listEl = document.getElementById('repo-list');
     this.inputEl = document.querySelector('input[name=repository]');
     this.registerHandlers();
   }

   registerHandlers() {
     this.formEl.onsubmit = event => this.addRepository(event);
   }

  async addRepository(event) {
     event.preventDefault();

     const repoInput = this.inputEl.value;

     if (repoInput.length === 0) {
        alert('Por favor, digite um nome ;p');
        this.listEl.innerHTML = '';
        return;
      }

      try {
        const response = await api.get(`${repoInput}/repos`);
        this.repositories = response.data;

        this.render();
      } catch(err) {
        this.listEl.innerHTML = '';
        alert('O repositório não existe!');
      }
   }

   render() {
     this.listEl.innerHTML = '';

     this.repositories.forEach(repo =>{
       let imgEl = document.createElement('img');
       imgEl.setAttribute('src', repo.owner.avatar_url);

       let titleEl = document.createElement('strong');
       titleEl.appendChild(document.createTextNode(repo.name));

       let descriptionEl = document.createElement('p');
       descriptionEl.appendChild(document.createTextNode(repo.description));

       let linkEl = document.createElement('a');
       linkEl.setAttribute('href', repo.html_url)
       linkEl.setAttribute('target', '_blank');
       linkEl.appendChild(document.createTextNode('Acessar'));

       let listItemEl = document.createElement('li');
       listItemEl.appendChild(imgEl);
       listItemEl.appendChild(titleEl);
       listItemEl.appendChild(descriptionEl);
       listItemEl.appendChild(linkEl);

       this.listEl.appendChild(listItemEl);
     });
   }
}

new App();