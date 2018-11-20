const routes = new Router(
    [
        { path: 'boards/:id', page: new Layout(new Board('./board/board.html')) },
        { path: 'boards', page: new Layout(new Boards('./boards/boards.html')) },
        { path: 'default', page: new Layout(new App('./home/home.html')) },
    ],
    document.querySelector('main')
);
window.onload = () => {


}   
