var restart=document.querySelector('.button');


var squares=document.querySelectorAll('td');
var cells=document.querySelectorAll('.vert');
function clearBoard(){
    for (var i=0;i<squares.length;i++){
        squares[i].textContent = '';    
    }
}

restart.addEventListener('click',clearBoard);

function change(){
    if(this.textContent === ''){
        this.textContent = 'X';
    }else if(this.textContent === 'X'){
        this.textContent = 'O';
    }else{
        this.textContent = '';
    }
}
for (var i=0;i<squares.length;i++){
    squares[i].addEventListener('click',change); 
}