// References to DOM elements.
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const charactersWindow = document.getElementById('character-list');

let actualPage = 1;
let maxPages = 0;
prevPageButton.style.backgroundColor = 'red';

// Function to get the vales from the appi.
function getChars(){
    fetch(`https://rickandmortyapi.com/api/character/?page=${actualPage}`)
    .then((response) => {
        if(!response.ok) {
            throw new Error('Couldent get the response.');
        } else {
            return response.json();
        }
    })
    .then((data) => {
        showChars(data);

        if (maxPages === 0) {   maxPages = data.info.pages; };
    })
    .catch((error) => {
        console.log('Error: couldnt get the wanted data.');
    });
}

// Function to control the events on the prev page button.
prevPageButton.addEventListener('click', () => {
    if(actualPage > 1) {
        actualPage--; 
        getChars();
        nextPageButton.style.backgroundColor = '#03b1c8';

        if (actualPage <= 1) {
            prevPageButton.style.backgroundColor = 'red';
        }
    } 
});

// Function to control the events on the next page button.
nextPageButton.addEventListener('click', () => {
    if(actualPage < maxPages) { 
        actualPage++;
        getChars();
        prevPageButton.style.backgroundColor = '#03b1c8';
        
        if(actualPage >= maxPages) {
            nextPageButton.style.backgroundColor = 'red';
        }
    } 
});

showChars = (data) => {
    // Remove previous childs from ul node.
    if (charactersWindow.hasChildNodes()) {
        data.results.forEach(element => {
            charactersWindow.removeChild(document.querySelector('.character-entry'));
        });
    }

    // Creates new childs for ul node.
    data.results.forEach(element => {
        charactersWindow.insertAdjacentHTML('beforeend',
        `<li class="character-entry">
            <img src="${element.image}" alt="${element.name} character image"/>
            <p><span>Name:</span> ${element.name}</p>
            <p><span>Species:</span> ${element.species}</p>
        </li>
        `);
    });
};

getChars();