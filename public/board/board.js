class Board extends Page {
    constructor(url) {
        super(url);

    }
    async init() {
        const hash = window.location.hash;
        const boardId = hash.substr(hash.lastIndexOf('/') + 1);
        this.availableBoards = JSON.parse(localStorage.getItem('boards')) || [];
        const boardImageIndex = JSON.parse(localStorage.getItem('boardsPins'))[boardId] ?
            JSON.parse(localStorage.getItem('boardsPins'))[boardId].pins : [];
        this.availableImages = JSON.parse(localStorage.getItem('images')) || [];
        this.currentBoardImages = this.availableImages.filter((image, index) => {
            return boardImageIndex.indexOf(index) > -1;
        })
        this.currentBoard = this.availableBoards[boardId];

        this.render();
    }

    render() {
        this.renderBoardName();
        let fragment = document.createDocumentFragment()
        let i = 0;
        for (let [index, image] of this.currentBoardImages.entries()) {
            fragment.appendChild(this.createImageElement(index, image))
        }
        let el = document.getElementsByClassName('masonry')[0]
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }
        el.appendChild(fragment)
    }

    renderBoardName() {
        let boardEl = document.getElementsByClassName('board-details')[0];
        boardEl.innerHTML = this.currentBoard;
    }

    createImageElement(index, imageSrc) {
        let item = document.createElement('div');
        item.className = "item";
        let itemContent = document.createElement('div');
        itemContent.className = "item-content";
        item.append(itemContent);
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


}
