class Vocabulary {
    constructor(IDselector) {
        this.IDselector = IDselector;

        this.DOM = null;
        this.listDOM = null;

        this.addWordsDOM = null;
        this.addWordEnDOM = null;
        this.addWordLtDOM = null;
        this.buttonSaveDOM = null;

        this.updateWordsDOM = null;
        this.updateWordEnDOM = null;
        this.updateWordLtDOM = null;
        this.buttonEditDOM = null;
        this.buttonDeleteDOM = null;

        this.listEnDOM = null;
        this.listLtDOM = null;

        this.localStorageIDcount = 'ListID';
        this.localStoragelistKey = 'ListAll';
        this.latestUsedID = JSON.parse(localStorage.getItem(this.localStorageIDcount)) || 0;
        this.wordsInList = JSON.parse(localStorage.getItem(this.localStoragelistKey)) || [];

        this.currentlyEditableTaskID = 0;

        this.init();

    }

    init() {
        if (!this.isValidSelector()) {
            return false;
        }
        this.DOM = document.getElementById(this.IDselector);
        if (!this.DOM) {
            console.error('ERROR: nerasta vieta, pagal duota selector');
            return false;
        }
        this.DOM.classList.add('words')
        this.render();
        this.renderList();
        this.addEvents();
    }

    isValidSelector() {
        if (typeof this.IDselector !== 'string' || this.IDselector === '') {
            console.error('ERROR: nevalidus selector');
            return false;
        }
        return true;
    }

    generateAddWords() {
        return `<h3>Add word</h3>
        <form id="add_words"> 
                    <label for="add_word_en">EN</label>
                    <input id="add_word_en" type="text" value="">  
                    <label for="add_word_lt">LT</label>
                    <input id="add_word_lt" type="text" value="">  
                    <button id="save_button" type="save">Save</button>
                    <button id="reset_button" type="reset">Reset</button>
                </form>`;

    }

    generateUpdateWords() {
        return `<form id="update_words" class="hide"> 
                    <label for="update_word_en">EN</label>
                    <input id="update_word_en" type="text" value="">  
                    <label for="update_word_lt">LT</label>
                    <input id="update_word_lt" type="text" value="">  
                    <button id="edit_button" type="edit">Edit</button>
                    <button id="delete_button" type="delete">Delete</button>
                </form>`;

    }

    generateWordsList() {
        return `<div class="list">uu</div>`;
    }

    renderList() {
        for (const word of this.wordsInList) {
            this.renderAddWords(word.id, word.en, word.lt);
        }
    }

    renderAddWords(id, en, lt) {
        if (typeof text !== 'string' ||
            text === '') {
            return '';
        }
        const HTML = `<div id="word_${id}" class="word" >
                            <div class="text">${en}</div>
                            <div class="text">${lt}</div>
                            <div class="actions">
                                <div class="btn edit">Edit</div>
                                <div class="btn delete">Delete</div>
                            </div>
                        </div>`;

        this.listDOM.insertAdjacentHTML('afterbegin', HTML);

        const wordDOM = this.listDOM.querySelector('.word');
        const editDOM = wordDOM.querySelector('.edit');
        const deleteDOM = wordDOM.querySelector('.delete');

        deleteDOM.addEventListener('click', () => {
            if (!confirm('Ar tikrai norite istrinti si irasa?')) {
                return false;
            }

            wordDOM.remove();

            this.updateWordsDOM = this.updateWordsDOM.filter((word) => word.id !== id);
            localStorage.setItem(this.localStorageListKey, JSON.stringify(this.updateWordsDOM));
        })

        editDOM.addEventListener('click', () => {
            this.addWordsDOM.classList.add('hide')
            this.addWordLtDOM.classList.add('hide')
            this.updateWordEnDOM.classList.remove('hide')
            this.updateWordLtDOM.classList.remove('hide')

            this.updateWordEnDOM.value = text;
            this.updateWordLtDOM.value = text;
            this.currentlyEditableTaskID = id;
        })
    }

    render() {
        let HTML = '';
        HTML += this.generateAddWords();
        HTML += this.generateUpdateWords();
        HTML += this.generateWordsList();
        this.DOM.innerHTML = HTML;

        this.listDOM = document.querySelector('.list');

        this.addWordsDOM = document.getElementById('add_words');
        this.addWordEnDOM = document.getElementById('add_word_en');
        this.addWordLtDOM = document.getElementById('add_word_lt');

        this.buttonSaveDOM = document.getElementById('save_button');

        this.updateWordsDOM = document.getElementById('update_words');
        this.updateWordEnDOM = document.getElementById('update_word_en');
        this.updateWordLtDOM = document.getElementById('update_word_lt')

        this.buttonEditDOM = document.getElementById('edit_button');
        this.buttonDeleteDOM = document.getElementById('delete_button');

    }

    addEvents() {
        this.buttonSaveDOM.addEventListener('click', (e) => {
            e.preventDefault();

            const word_en = this.addWordEnDOM.value;
            const word_lt = this.addWordLtDOM.value;
            console.log(word_en);
            console.log(word_lt);

            if (word_en || word_lt === '') {
                return false;
            }

            this.wordsInList.push({
                id: ++this.latestUsedID,
                en: word_en,
                lt: word_lt


            })

            this.renderAddWords(this.latestUsedID, word_en, word_lt);

            localStorage.setItem(this.localStorageIDcount, JSON.stringify(this.latestUsedID));
            localStorage.setItem(this.localStoragelistKey, JSON.stringify(this.wordsInList));


        })
    }
}
export { Vocabulary }