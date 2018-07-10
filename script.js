console.log('hello');
var button=document.querySelector('#begin');
var playArea=document.querySelector('#play-Area');
var board;
var boardCount=0;

window.addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
  	button.click();
  }
});

button.addEventListener('click',function(){
    console.log('Clicked');
    
    let shrink=setInterval(function(){
    	if(button.clientHeight<=2){
 			clearTimeout(shrink);
 		}

    	button.style.height=(button.clientHeight-2)+'px';
    	button.style.width=(button.clientWidth-6)+'px';
    	button.style.fontSize=(button.clientHeight*85/100) -2 +'px';
    	console.log('running');
    },1)

    setTimeout(function(){
    	if(playArea.clientHeight>500){
			return;
		}
		let grow=setInterval(function(){
		 	if(playArea.clientHeight>500){
				clearTimeout(grow);
			}
		 	playArea.style.height=(playArea.clientHeight+10)+'px';
		  	playArea.style.width=(playArea.clientWidth+10)+'px';

	    },1);
    },200);

    setTimeout(function(){
    	playArea.style.padding="5px";
    },230);

    SetUpBoard();
    
});



function SetUpBoard(){
	board= new Array(4);
	for (var i = 0; i < 4; i++) {
  		board[i] = new Array(4);
	}
	for (let r =0 ; r <= 3; r++) {
		for(let c=0; c<=3 ;c++){
			board[r][c]=undefined;
		}
	}

	AddTile();
	window.onkeydown= function(event) {
	  event.preventDefault();
	  if (event.keyCode === 37) {
	  	pressLeft();
	  }
	  if (event.keyCode === 39) {
	  	pressRight();
	  }
	  if (event.keyCode === 38) {
	  	pressUp();
	  }
	  if (event.keyCode === 40) {
	  	pressDown();
	  }
	};
}

function AddTile(){
	if(boardCount==16){
		window.alert('You Lost');
	}else{
		let addStatus=false;
		while(!addStatus){
			addStatus=tryAdd();
		}

	}


	

}
function tryAdd(){
	let row=Math.random()*4;
	row=Math.floor(row);
	let col=Math.random()*4;
	col=Math.floor(col);
	if (board[row][col]==undefined){
		board[row][col]=2;
		console.log(row,col);
		let addId="#t-"+(row+1)+"-"+(col+1);
		let addTile=document.querySelector(addId);
		let emptyTile=document.querySelector(".empty-tile");
		addTile.innerText=2;
		addTile.className="tile n2";
		boardCount+=1;
		console.log(emptyTile.clientHeight);
// #######################  Animate  #######################

		if(boardCount>1){
			addTile.style.fontSize="0px";
			addTile.style.height="50px";
			addTile.style.width="50px";
			let fs=0;
			let growTile=setInterval(function(){
		 		if(addTile.clientHeight>=emptyTile.clientHeight-20){
		 			addTile.style.height="98%";
					addTile.style.width="98%";
		 			clearTimeout(growTile);
		 		}
		 		if (fs<=70) {
		 			addTile.style.fontSize=(fs)+"px";
		 		}
		 		
				addTile.style.height=(addTile.clientHeight+3)+'px';
				addTile.style.width=(addTile.clientWidth+3)+'px';
				fs+=4.375;
		 	},1);


		}else{
			addTile.style.fontSize="0px";
			setTimeout(function(){
				let fs=0;
				let growTile=setInterval(function(){
		 			if(fs>=70){
		 				addTile.style.height="99%";
						addTile.style.width="99%";
		 				addTile.style.fontSize="70px";
		 				clearTimeout(growTile);
		 			}
					addTile.style.fontSize=(fs)+"px";
					fs+=2;
		 		},1);

			},200);
			

		}

// #######################  Animate  #######################
		return true;
		
	}
	return false;
}

function pressLeft(){
	console.log('left');
	for (let r =0 ; r <= 3; r++) {
		let empty=0;
		let moveBy=0;
		for(let c=0; c<=3 ;c++){
			if(board[r][c]==undefined){
				empty+=1;
				moveBy+=1;
			}else{
				board[r][c-empty]=board[r][c];
				if(c-empty>0&&board[r][c-empty]==board[r][c-empty-1]){
					board[r][c-empty-1]=board[r][c-empty-1]*2;
					board[r][c-empty]=undefined;
					moveBy+=1;
					boardCount--;
				}
				if(empty!=0){
					board[r][c]=undefined;
					mover(r+1,c+1,r+1,c+1-moveBy);
				}
				
				
			}
		}
	}
	AddTile();
}
function pressRight(){
	console.log('right');

}
function pressUp(){
	console.log('up');

}
function pressDown(){
	console.log('down');
}

function mover(ir,ic,fr,fc){

	let iniId="#t-"+(ir)+"-"+(ic);
	let iniTile=document.querySelector(iniId);
	let iniTileRect=iniTile.getBoundingClientRect();
	let iniBoxId="#t-"+(ir)+"-"+(ic)+"-p";
	let iniBox=document.querySelector(iniBoxId);
	let finId="#t-"+(fr)+"-"+(fc);
	let finTile=document.querySelector(finId);
	let finTileRect=finTile.getBoundingClientRect();

	let moveTile=document.createElement('div');
//#################################################################################
	moveTile.id=iniId+"-m";
	moveTile.className = 'tile n2';
	moveTile.innerHTML='2';
//#################################################################################
	moveTile.style.position="absolute";
	moveTile.style.height=iniBox.clientHeight+"px";
	moveTile.style.width=iniBox.clientWidth+"px";
	iniBox.appendChild(moveTile);
	moveTile.style.left=iniTileRect.x+"px";
	moveTile.style.top=iniTileRect.y+"px";

	iniTile.innerHTML="";
 	iniTile.className="tile";


	let xMove=fc-ic;
	// let xSign=0;
	// if(xMove>=0){
	// 	xSign=1;
	// }else{
	// 	xSign=-1;
	// }
	let yMove=fr-ir;
	// let ySign=0;
	// if(yMove>=0){
	// 	ySign=1;
	// }else{
	// 	ySign=-1;
	// }
	console.log(xMove,yMove);
	let cx=iniTileRect.x;
	let cy=iniTileRect.y;
	move=setInterval(function(){
 			if(((cx*xMove)>(xMove)*(finTileRect.x))||((cy*yMove)>(yMove)*(finTileRect.y))){
 				moveTile.parentNode.removeChild(moveTile);
 //#################################################################################
 				finTile.innerHTML="2";
 				finTile.className="tile n2";
 //#################################################################################
 				clearTimeout(move);
 			}
 			moveTile.style.left=cx+"px";
 			moveTile.style.top=cy+"px";
 			cx+=xMove*3;
 			cy+=yMove*3;
 	},1);



 	
}
