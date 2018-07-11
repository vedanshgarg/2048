"use strict";
console.log('hello');
var button=document.querySelector('#begin');
var playArea=document.querySelector('#play-Area');
var gameHeader=document.querySelector('#game-header');
var leftPane=document.querySelector('#left-pane');
var scoreTitle=document.querySelector('#score-title');
var scoreValue=document.querySelector('#score-value');
var timeC=0;
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
			leftPane.style.fontSize=(playArea.clientHeight/8)+'px';
			scoreTitle.style.fontSize=(playArea.clientHeight/22)+'px';
			scoreValue.style.fontSize=(playArea.clientHeight/10)+'px';
			gameHeader.style.height=(gameHeader.clientHeight+3)+'px';
			gameHeader.style.width=(playArea.clientWidth)+'px';

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




function fixBoard(){
	for (let r =0 ; r <= 3; r++) {
		for(let c=0; c<=3 ;c++){
			let outId="#t-"+(r+1)+"-"+(c+1)+"-p";
			let outTile=document.querySelector(outId);
			let inId="#t-"+(r+1)+"-"+(c+1);
			let inTile=document.querySelector(inId);
			if(board[r][c]==undefined){
				inTile.innerHTML="";
				inTile.className="tile";
			}else{
				inTile.innerHTML=board[r][c];
				inTile.className="tile n"+board[r][c];
			}
			outTile.innerHTML="";
			outTile.appendChild(inTile);
			
		}
	}

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
		let addId="#t-"+(row+1)+"-"+(col+1);
		let addTile=document.querySelector(addId);
		let emptyTile=document.querySelector(".empty-tile");
		addTile.innerText=2;
		addTile.className="tile n2";
		boardCount+=1;

		if(boardCount>1){
			addTile.style.fontSize="0px";
			addTile.style.height="50px";
			addTile.style.width="50px";
			let fs=0;
			let growTile=setInterval(function(){
				if(addTile.clientHeight>=emptyTile.clientHeight-20){
					addTile.style.height="98%";
					addTile.style.width="98%";
					console.log('add');
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
						console.log('add');
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

		return true;

	}
	return false;
}




function pressLeft(){
	let nextTile=false;
	for (let r =0 ; r <= 3; r++) {
		let curr=1;
		let start=0;
		while(curr<=3){
			if(board[r][curr]!=undefined){
				let empty=0;
				let moveBy=0;
				for(let c=start; c<=curr ;c++){
					if(board[r][c]==undefined){
						console.log('if k andar');
						empty+=1;
						moveBy+=1;
					}
				}
				if(empty!=0){
					board[r][curr-empty]=board[r][curr];
					board[r][curr]=undefined;
					
				}
				let currN=curr-empty;
				if (currN!=start) {
					if(board[r][currN-1]==board[r][currN]){
						board[r][currN-1]*=2;
						scoreValue.innerHTML=parseInt(scoreValue.innerHTML)+(board[r][currN-1]);
						boardCount--;
						board[r][currN]=undefined;
						moveBy++;
						currN--;
						start=currN+1;
					}
				}
				if(moveBy!=0){
					nextTile=true;

				}
				mover(r+1,curr+1,r+1,currN+1);
				
				
			}

			curr++;
		}
		
	}
	if (nextTile) {
		setTimeout(function(){
			AddTile();
		},200);
		
	}
	
	
	
}


function pressRight(){
	let nextTile=false;
	for (let r =0 ; r <= 3; r++) {
		let curr=2;
		let start=3;
		while(curr>=0){
			if(board[r][curr]!=undefined){
				let empty=0;
				let moveBy=0;
				for(let c=start; c>=curr ;c--){
					if(board[r][c]==undefined){
						console.log('if k andar');
						empty+=1;
						moveBy+=1;
					}
				}
				if(empty!=0){
					board[r][curr+empty]=board[r][curr];
					board[r][curr]=undefined;
					
				}
				let currN=curr+empty;
				if (currN!=start) {
					if(board[r][currN+1]==board[r][currN]){
						board[r][currN+1]*=2;
						scoreValue.innerHTML=parseInt(scoreValue.innerHTML)+(board[r][currN+1]);
						boardCount--;
						board[r][currN]=undefined;
						moveBy++;
						currN++;
						start=currN-1;
					}
				}
				if(moveBy!=0){
					nextTile=true;

				}
				mover(r+1,curr+1,r+1,currN+1);

			}

			curr--;
		}
		
	}
	if (nextTile) {
		setTimeout(function(){
			AddTile();
		},200);
	}
	
	
	
}
function pressUp(){
	let nextTile=false;
	for (let c =0 ; c <= 3; c++) {
		let curr=1;
		let start=0;
		while(curr<=3){
			console.log("inside while");
			if(board[curr][c]!=undefined){
				let empty=0;
				let moveBy=0;
				for(let r=start; r<=curr ;r++){
					if(board[r][c]==undefined){
						console.log('if k andar');
						empty+=1;
						moveBy+=1;
					}
				}
				if(empty!=0){
					board[curr-empty][c]=board[curr][c];
					board[curr][c]=undefined;
					
				}

				let currN=curr-empty;
				
				console.log(curr,empty,currN,c);

				if (currN!=start) {
					if(board[currN-1][c]==board[currN][c]){
						board[currN-1][c]*=2;
						scoreValue.innerHTML=parseInt(scoreValue.innerHTML)+(board[currN-1][c]);
						boardCount--;
						board[currN][c]=undefined;
						moveBy++;
						currN--;
						start=currN+1;
					}
				}
				
				if(moveBy!=0){
					nextTile=true;

				}
				mover(curr+1,c+1,currN+1,c+1);
			}

			curr++;
		}
		
	}
	if (nextTile) {
		setTimeout(function(){
			AddTile();
		},200);
	}
	
		

}
function pressDown(){
	let nextTile=false;
	for (let c =0 ; c <= 3; c++) {
		let curr=2;
		let start=3;
		while(curr>=0){
			if(board[curr][c]!=undefined){
				let empty=0;
				let moveBy=0;
				for(let r=start; r>=curr ;r--){
					if(board[r][c]==undefined){
						console.log('if k andar');
						empty+=1;
						moveBy+=1;
					}
				}
				if(empty!=0){
					board[curr+empty][c]=board[curr][c];
					board[curr][c]=undefined;
					
				}
				let currN=curr+empty;
				if (currN!=start) {
					if(board[currN+1][c]==board[currN][c]){
						board[currN+1][c]*=2;
						scoreValue.innerHTML=parseInt(scoreValue.innerHTML)+(board[currN+1][c]);
						boardCount--;
						board[currN][c]=undefined;
						moveBy++;
						currN++;
						start=currN-1;
					}
				}
				if(moveBy!=0){
					nextTile=true;
					// mover(r+1,curr+1,r+1,currN+1);

				}
				mover(curr+1,c+1,currN+1,c+1);
			}

			curr--;
		}
		
	}
	if (nextTile) {
		setTimeout(function(){
			AddTile();
		},200);
	}
	
	

	
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

	moveTile.id=iniId+"-m";
	moveTile.className = iniTile.className;
	moveTile.innerHTML=iniTile.innerHTML;
	moveTile.style.position="absolute";
	moveTile.style.height=iniBox.clientHeight+"px";
	moveTile.style.width=iniBox.clientWidth+"px";
	iniBox.appendChild(moveTile);
	moveTile.style.left=iniTileRect.x+"px";
	moveTile.style.top=iniTileRect.y+"px";

	iniTile.innerHTML="";
	iniTile.className="tile";

	let xMove=fc-ic;

	let yMove=fr-ir;
	
	let cx=iniTileRect.x;
	let cy=iniTileRect.y;
	console.log("log");
	let moveAnim=setInterval(function(){
		if(((cx*xMove)>(xMove*finTileRect.x))||((cy*yMove)>(yMove*finTileRect.y))){
			iniBox.innerHTML="";
			iniBox.appendChild(iniTile);
			updater(fr,fc);
			clearInterval(moveAnim);
			console.log("anim");
		}
		moveTile.style.left=cx+"px";
		moveTile.style.top=cy+"px";
		cx+=xMove*5;
		cy+=yMove*5;
	},1);

	if(xMove==0&&yMove==0){
		iniBox.innerHTML="";
		iniBox.appendChild(iniTile);
		updater(fr,fc);
	}

}

function updater(fr,fc){
	let num=board[fr-1][fc-1];
	let numId="#t-"+(fr)+"-"+(fc);
	let numTile=document.querySelector(numId);
	switch(num) {
    case 2:
        numTile.style.fontSize="70px";
        break;
    case 4:
        numTile.style.fontSize="70px";
        break;
    case 8:
        numTile.style.fontSize="70px";
        break;
    case 16:
        numTile.style.fontSize="60px";
        break;
    case 32:
        numTile.style.fontSize="60px";
        break;
    case 64:
        numTile.style.fontSize="60px";
        break;
    case 128:
        numTile.style.fontSize="45px";
        break;
    case 128:
        numTile.style.fontSize="45px";
        break;
    case 256:
        numTile.style.fontSize="45px";
        break;
    case 512:
        numTile.style.fontSize="45px";
        break;
    case 1024:
        numTile.style.fontSize="35px";
        break;
    default:
        numTile.style.fontSize="35px";
	}
	
	numTile.innerHTML=num;
	numTile.className="tile n"+num;

}