class Boards extends Page {
    constructor(url) {
        super(url);
    }
    async init() {
        this.availableBoards = JSON.parse(localStorage.getItem('boards')) || [];
        this.render();
    }

    render() {
        let fragment = document.createDocumentFragment()
        let i = 0;
        for (let [index, board] of this.availableBoards.entries()) {
            fragment.appendChild(this.createBoardElement(index, board))
        }
        if(this.availableBoards.length === 0){
            const noBoardsEl = document.createElement('div');
            noBoardsEl.innerHTML="No Boards available";
            fragment.appendChild(noBoardsEl);
        }
        let el = document.getElementsByClassName('boards-list')[0]
        while (el.firstChild) {
            el.removeChild(el.firstChild)
        }
        el.appendChild(fragment)
    }

    createBoardElement(index, board) {
        let liEl = document.createElement('p');
        let aEl = document.createElement('a');
        aEl.innerHTML = board;
        aEl.href = "./#/boards/" + index;
        liEl.append(aEl);
        return liEl;
    }


}
