class App extends Page {
    constructor(url) {
        super(url);
    }
    async init() {
        this.images = [];
        this.availableBoards = JSON.parse(localStorage.getItem('boards')) || [];
        this.pinBoards = JSON.parse(localStorage.getItem('boardsPins')) || {};
        this.images = JSON.parse(localStorage.getItem('images')) || [];
        this.render();
    }


    render() {
        let fragment = document.createDocumentFragment()
        let i = 0;
        for (let [index, image] of this.images.entries()) {
            fragment.appendChild(this.createImageElement(index, image))
        }
        let el = document.getElementsByClassName('masonry')[0]
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }
        el.appendChild(fragment)
    }

    createImageElement(index, imageSrc) {
        let item = document.createElement('div');
        item.className = "item";
        let itemContent = document.createElement('div');
        itemContent.className = "item-content";
        item.append(itemContent);
        let btn = document.createElement('button');
        btn.innerHTML = "Save";
        btn.className = "button";
        btn.addEventListener('click', () => {
            this.saveToBoard(index);
        })
        itemContent.append(btn)
        let img = document.createElement('img')
        img.src = imageSrc;
        itemContent.append(img);
        img.addEventListener('load', (e) => {
            const imageCurWidth = event.target.width;
            const imageCurHeight = (imageCurWidth * event.target.naturalHeight) / event.target.naturalWidth;
            itemContent.style.height = imageCurHeight + "px";
        })
        return item
    }

    saveToBoard(imgIndex) {
        this.showModal();
        let boardLstEl = document.getElementsByClassName('board-list')[0];
        while (boardLstEl.firstChild) {
            boardLstEl.removeChild(boardLstEl.firstChild)
        }
        if (this.availableBoards.length == 0) {
            boardLstEl.innerHTML = "No boards available";
        } else {
            for (let [index, board] of this.availableBoards.entries()) {
                const boardEl = document.createElement('div');
                boardEl.className = 'board';
                let boardName = document.createElement('span');
                boardName.innerHTML = board;
                let saveToBoardBtn = document.createElement('button');
                saveToBoardBtn.className = "button";
                saveToBoardBtn.innerHTML = 'Save';
                saveToBoardBtn.dataset.boardName = board;
                saveToBoardBtn.addEventListener('click', (event) => {
                    this.addPinToBoard(imgIndex, index);
                });
                boardEl.append(boardName);
                boardEl.append(saveToBoardBtn);
                boardLstEl.append(boardEl);
            }

        }
        let newBoard = document.getElementsByClassName("create-new")[0];
        newBoard.addEventListener("click", () => {
            this.hideModal();
            this.showNewBoardModal(imgIndex);
        })
        let closeBtns = document.querySelectorAll('#myModal .close');
        for (let btn of closeBtns) {
            btn.addEventListener('click', () => {
                this.hideModal();
            });
        }
    }

    showModal() {
        let modal = document.getElementById('myModal');
        modal.classList.add('open');
        document.body.classList.add('modal-open');

    }
    hideModal() {
        let modal = document.getElementById('myModal');
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }
    showNewBoardModal(imageIndex) {
        let modal = document.getElementById('create-board-modal');
        modal.classList.add('open');
        document.body.classList.add('modal-open');
        let submitBtn = document.getElementsByClassName("create")[0];
        this.saveListener = this.saveToNewBoard.bind(this,imageIndex);
        submitBtn.addEventListener("click", this.saveListener );
    }

    saveToNewBoard(imageIndex) {
        let submitBtn = document.getElementsByClassName("create")[0];
        submitBtn.removeEventListener("click", this.saveListener);
        let createBoardForm = document.getElementById("create-board-form");
        const boardName = createBoardForm.querySelector("#board-name").value;
        const boardIndex = this.addNewBoard(boardName);
        if (boardName.trim().length === 0) {
            return;
        }
        this.addPinToBoard(imageIndex, boardIndex);
        createBoardForm.reset();
        this.hideNewBoardModal();
    }

    addNewBoard(boardName) {
        this.availableBoards.push(boardName);
        localStorage.setItem('boards', JSON.stringify(this.availableBoards));
        return this.availableBoards.length - 1;
    }

    hideNewBoardModal() {
        let modal = document.getElementById('create-board-modal');
        modal.classList.remove('open');
        document.body.classList.remove('modal-open');
    }

    addPinToBoard(imageIndex, boardIndex) {
        if (!this.pinBoards[boardIndex]) {
            this.pinBoards[boardIndex] = {};
            this.pinBoards[boardIndex].pins = [];
        }
        if (this.pinBoards[boardIndex].pins.indexOf(imageIndex) === -1) {
            this.pinBoards[boardIndex].pins.push(imageIndex);
        }
        localStorage.setItem('boardsPins', JSON.stringify(this.pinBoards));
        this.hideModal();
    }
}
