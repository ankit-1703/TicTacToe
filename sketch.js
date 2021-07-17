let can;

let squares = ["","","","","","","","",""];

var restart=document.querySelector('.button');

var player=0;
var user;


function clearBoard(){
  
    for (let i=0; i < squares.length;i++)
    {
      
      squares[i]="";
      
    }
  update();
  loop();
  player=0;
}




function setup() {
  can = createCanvas(700, 700);
  can.parent("#canvas")
  user=select("#user");
  user.mouseClicked(clearBoard);
 restart.addEventListener('click',clearBoard);
}

function update(){
  
  let x,y;
  textAlign(CENTER, CENTER);
  textSize(150);
  x = width/6;
  y= height/5.5;
  
  for(let i=0;i<3;i++){
    for(let j=0;j<3;j++){
      if(squares[3*i+j]!=""){
        text(squares[3*i+j],x + j*width/3,y+i*height/3);  
      }
    }
  }
}


function col_pos(x){
  
  if(x >= 2*width/3){
    return(2);
  }
  else if(x >= width/3){
    return(1);
  }
  else{
    return(0);
  }
}

function row_pos(y){
  
  if( y >= 2*height/3 ){
    
    return (2);
  }
  else if (y >= height/3){
    return(1);
  }
  else{
    return(0);
  } 
}

function pos(x,y){
  return(row_pos(y)*3 + col_pos(x) );
}


function change(){
  
  let i = pos(mouseX,mouseY);
  
  if(squares[i]===""){
    
      switch(player){
          
          case 0:
              squares[i] = 'X';
              player=1;
              break;
          

          case 1:
             squares[i] = 'O';
             player=0;
             break; 
        }
    }
}
function result(a){
  // background(255);
  textSize(180);
  switch(a){
      case "X":
      strokeWeight(6);
  rect(0, 0,width,height);
      text(a+" wins",width/2,height/2);
      break;
      case "O":
      strokeWeight(6);
  rect(0, 0,width,height);
      text(a+" wins",width/2,height/2);
      break;
      case "D":
      strokeWeight(6);
  rect(0, 0,width,height);
      text("Draw",width/2,height/2);
      break;
  }
   
}


function check(one,two,three){
    return (squares[one] === squares[two] && squares[one] === squares[three] && squares[one]!="");
}

function check_winner(){
  //horizontal_check
    for(var j=0;j<7;j+=3){        
        if(check(j,j+1,j+2)){
          
            return squares[j];
        }
    }
  //vertical_check
    for(var j=0;j<3;j++){
        if(check(j,j+3,j+6)){
            return squares[j];
            
        }
    }
  
    // diagonal_check
     if(check(0,4,8)){
            return squares[0];
        }
        else if(check(2,4,6)){
            return squares[2];
      }
    let count=0;
    for(let i=0;i<squares.length;i++){
      if(squares[i]=="")
        count++;
    }if(count==0){
      return "D";
    }
  return "";
 }

function score(a){
  if(a=="X") return 1;
  else if(a=="O") return -1;
  else return 0;
}
let best_move;
function minimax(a,depth){
  let rt=check_winner() ;
  if(rt=="X" || rt=="O" || rt=="D"){
    return score(rt);
  }
  if(a==0){
    let best_score=-Infinity;
    for(let i=0;i<9;i++){
      if(squares[i]==""){
        squares[i]="X";
        let k=minimax(1,depth+1);
        if(k>best_score){
          best_score=k;
          if(depth==0){
            best_move=i;
          }
        }squares[i]="";
      }
    }return best_score;
  }else{
    let best_score=+Infinity;
    for(let i=0;i<9;i++){
      if(squares[i]==""){
        squares[i]="O";
        let k=minimax(0,depth+1);
        if(k<best_score){
          best_score=k;
        }squares[i]="";
      }
    }return best_score;
  }
  
}


function ai(){
  minimax(0,0);
  squares[best_move]="X";
  player=1;
  update();
}

function draw() {
  
  background(255);
  
  strokeWeight(6);
  rect(0, 0,width,height);
  
  strokeWeight(3);
  line(width/3,0,width/3,height);
  line(2*width/3,0,2*width/3,height);
  line(0,height/3,width,height/3);
  line(0,2*height/3,width,2*height/3);
  
  if(user.checked() && !player){
    ai();
  }
  if(mouseIsPressed && (mouseX>=0 && mouseX <= width) && (mouseY>=0 && mouseY <= height) ){
    change();
    
  }
  update();
  //check_winner();
  result(check_winner());
  
    
}