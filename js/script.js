// References to DOM elements.
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const charactersWindow = document.getElementById('character-list');

let actualPage = 1;
let maxPages = 0;


prevPageButton.style.backgroundColor = 'red';
prevPageButton.textContent = `First Page`
nextPageButton.textContent = `Next Page #${actualPage + 1}`;

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
            prevPageButton.textContent = `First Page`;
            prevPageButton.style.border = '2px solid transparent';
        } else {        
            prevPageButton.textContent = `Prev Page #${actualPage - 1}`;
        }

        nextPageButton.textContent = `Next Page #${actualPage + 1}`;
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
            nextPageButton.textContent = `Last Page`;
            nextPageButton.style.border = '2px solid transparent';
        } else {        
            nextPageButton.textContent = `Next Page #${actualPage + 1}`;
        }
     
        prevPageButton.textContent = `Prev Page #${actualPage - 1}`;
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
            <img class="character-image" src="${element.image}" alt="${element.name} character image"/>
            <p><span>Name:</span> ${element.name}</p>
            <p><span>Species:</span> ${element.species}</p>
        </li>
        `);
    });
};

// Functions to get a hover effect only when a button can be interacted.
nextPageButton.addEventListener('mouseover', () => {
    if(actualPage < maxPages) {
        nextPageButton.style.border = '2px solid whitesmoke';
    }
});

nextPageButton.addEventListener('mouseout', () => {
    if(actualPage < maxPages) {
        nextPageButton.style.border = '2px solid transparent';
    }
});

prevPageButton.addEventListener('mouseover', () => {
    if(actualPage > 1) {
        prevPageButton.style.border = '2px solid whitesmoke';
    }
})

prevPageButton.addEventListener('mouseout', () => {
    if(actualPage > 1) {
        prevPageButton.style.border = '2px solid transparent';
    }
});

// First call to main function.
getChars();