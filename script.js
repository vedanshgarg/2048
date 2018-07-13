"use strict";
var running=false;
var AM=1;
var button=document.querySelector('#begin');
var fullArea=document.querySelector('#full-Area');
var showArea=document.querySelector('#show-Area');
var showAreaHeight=showArea.clientHeight;
var showAreaWidth=showArea.clientWidth;
if(showAreaHeight>showAreaWidth){
	AM=3;
}
var playArea=document.querySelector('#play-Area');
var gameHeader=document.querySelector('#game-header');
var topPane=document.querySelector('#top-pane');
var highScoreTitle=document.querySelector('#high-score-title');
var highScoreValue=document.querySelector('#high-score-value');
var scoreTitle=document.querySelector('#score-title');
var scoreValue=document.querySelector('#score-value');
var board;
var boardCount=0;
var xDown = null;                                                        
var yDown = null;
var score=0;
var HS=0;

if (typeof(Storage) !== "undefined") {
	HS=localStorage.getItem("HS");
    highScoreValue.innerHTML =HS;
    if (highScoreValue.innerHTML=="") {
    	highScoreValue.innerHTML=0; 
    }
}


window.addEventListener("keyup", function(event) {
	event.preventDefault();
	if (event.keyCode === 13) {
		button.click();
	}
});



button.addEventListener('click',function(){
	button.style.height="0px";
	button.style.width="0px";
	button.style.fontSize="0px";

	setTimeout(function(){

		if(showAreaHeight>showAreaWidth){
			playArea.style.width=showAreaWidth-30+"px";
			playArea.style.height=showAreaWidth-30+"px";
			gameHeader.style.height=(showAreaWidth/2)+"px";
			gameHeader.style.width=(showAreaWidth-20)+"px";
			scoreTitle.style.fontSize=(showAreaWidth/20)+"px";
			scoreValue.style.fontSize=(showAreaWidth/15)+"px";
			highScoreTitle.style.fontSize=(showAreaWidth/20)+"px";
			highScoreValue.style.fontSize=(showAreaWidth/15)+"px";
			topPane.style.fontSize=(showAreaWidth/10)+"px";
		}else{
			playArea.style.width=(showAreaHeight*2/3)-30+"px";
			playArea.style.height=(showAreaHeight*2/3)-30+"px";
			gameHeader.style.height=(showAreaHeight/3)+"px";
			gameHeader.style.width=(showAreaHeight*2/3)-20+"px";
			scoreTitle.style.fontSize=(showAreaHeight/30)+"px";
			scoreValue.style.fontSize=(showAreaHeight*2/45)+"px";
			highScoreTitle.style.fontSize=(showAreaHeight/30)+"px";
			highScoreValue.style.fontSize=(showAreaHeight*2/45)+"px";
			topPane.style.fontSize=(showAreaWidth*2/30)+"px";
		}

	},400);

	setTimeout(function(){
		playArea.style.padding="5px";
	},500);

	SetUpBoard();

});





function SetUpBoard(){
	if(running==false){
		running=true;
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
		document.addEventListener('touchstart', handleTouchStart, false);        
		document.addEventListener('touchmove', handleTouchMove, false);

		window.onkeydown= function(event) {

			event.preventDefault();

			fixBoard();

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
	let addStatus=false;
	while(!addStatus){
		addStatus=tryAdd();
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
			if (AM!=1) {
				addTile.style.height=(emptyTile.clientHeight-5)+"px";
				addTile.style.width=(emptyTile.clientWidth-5)+"px";
				addTile.style.fontSize=(70)+"px";
			}else{

			addTile.style.fontSize="0px";
			addTile.style.height="50px";
			addTile.style.width="50px";
			let fs=0;
			let growTile=setInterval(function(){
				if(addTile.clientHeight>=(emptyTile.clientHeight-30)){
					console.log('test');
					addTile.style.height=(emptyTile.clientHeight-5)+"px";
					addTile.style.width=(emptyTile.clientWidth-5)+"px";
					addTile.style.fontSize="70px";
					clearInterval(growTile);
					console.log("here too");

				}
				if (fs<70) {
					addTile.style.fontSize=(fs)+"px";
					console.log(fs);
				}

				addTile.style.height=(addTile.clientHeight+5)+'px';
				addTile.style.width=(addTile.clientWidth+5)+'px';
				fs+=10;
			},1);

			}

		}else{
			addTile.style.fontSize="0px";
			setTimeout(function(){
				let fs=0;
				let growTile=setInterval(function(){
					if(fs>=70){
						addTile.style.height="99%";
						addTile.style.width="99%";
						addTile.style.fontSize="70px";
						clearInterval(growTile);
					}
					addTile.style.fontSize=(fs)+"px";
					fs+=2;
				},1);

			},400);


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

						score=score + board[r][currN-1];
						scoreValue.innerHTML=score;
						
						if(score>HS){
							HS=score;
							localStorage.setItem("HS", HS);
							highScoreValue.innerHTML =HS;

						}

						boardCount--;
						board[r][currN]=undefined;
						moveBy++;
						currN--;
						start=currN+1;
					}
				}
				if(moveBy!=0){
					nextTile=true;
					mover(r+1,curr+1,r+1,currN+1);
				}
				
				
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
						
						score=score + board[r][currN+1];
						scoreValue.innerHTML=score;
						
						if(score>HS){
							HS=score;
							localStorage.setItem("HS", HS);
							highScoreValue.innerHTML =HS;

						}

						boardCount--;
						board[r][currN]=undefined;
						moveBy++;
						currN++;
						start=currN-1;
					}
				}
				if(moveBy!=0){
					nextTile=true;
					mover(r+1,curr+1,r+1,currN+1);

				}
		

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
			if(board[curr][c]!=undefined){
				let empty=0;
				let moveBy=0;
				for(let r=start; r<=curr ;r++){
					if(board[r][c]==undefined){
						empty+=1;
						moveBy+=1;
					}
				}
				if(empty!=0){
					board[curr-empty][c]=board[curr][c];
					board[curr][c]=undefined;
					
				}

				let currN=curr-empty;

				if (currN!=start) {
					if(board[currN-1][c]==board[currN][c]){
						board[currN-1][c]*=2;


						score=score + board[currN-1][c];
						scoreValue.innerHTML=score;
						
						if(score>HS){
							HS=score;
							localStorage.setItem("HS", HS);
							highScoreValue.innerHTML =HS;

						}
						boardCount--;
						board[currN][c]=undefined;
						moveBy++;
						currN--;
						start=currN+1;
					}
				}
				
				if(moveBy!=0){
					nextTile=true;
				mover(curr+1,c+1,currN+1,c+1);

				}
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

						score=score + board[currN+1][c];
						scoreValue.innerHTML=score;
						
						if(score>HS){
							HS=score;
							localStorage.setItem("HS", HS);
							highScoreValue.innerHTML =HS;

						}
						boardCount--;
						board[currN][c]=undefined;
						moveBy++;
						currN++;
						start=currN-1;
					}
				}
				if(moveBy!=0){
					nextTile=true;
				mover(curr+1,c+1,currN+1,c+1);


				}
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
	let number=parseInt(iniTile.innerHTML);
	
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
	let moveAnim=setInterval(function(){
		if(((cx*xMove)>(xMove*finTileRect.x))||((cy*yMove)>(yMove*finTileRect.y))){
			iniBox.innerHTML="";
			iniBox.appendChild(iniTile);
			updater(fr,fc,number);
			clearInterval(moveAnim);
		}
		moveTile.style.left=cx+"px";
		moveTile.style.top=cy+"px";
		cx+=xMove*5*AM;
		cy+=yMove*5*AM;
	},1*AM);

}

function updater(fr,fc,number){
	let num=board[fr-1][fc-1];
	let numId="#t-"+(fr)+"-"+(fc);
	let numTile=document.querySelector(numId);
	numTile.innerHTML=num;
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
	if(num==undefined){
		numTile.innerHTML="";
		numTile.className="tile";
	}else if(num==number){
		numTile.innerHTML=num;
		numTile.className="tile n"+num;
	}else{
		numTile.innerHTML=num;
		numTile.className="tile n"+num;
		let glowH=numTile.clientHeight;
		let glowW=numTile.clientWidth;
		numTile.style.height=glowH+"px";
		numTile.style.width=glowW+"px";
		setTimeout(function(){
			numTile.style.position="fixed";
			numTile.style.transition="all 0.1s";
			numTile.transitionTimingFunction = "linear";
			numTile.style.height=glowH+20+"px";
			numTile.style.width=glowW+20+"px";
			numTile.className="tile n"+num;
			let glowTimer=setTimeout(function(){
				numTile.style.height="";
				numTile.style.width="";
				numTile.style.position="";
				numTile.style.transition="";
			},100);

		},20);
			
	}

}


function handleTouchStart(evt) {
	evt.preventDefault();                                         
    xDown = evt.touches[0].clientX;                                      
    yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {

	evt.preventDefault();

    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            pressLeft(); 
        } else {
            pressRight();
        }                       
    } else {
        if ( yDiff > 0 ) {
            pressUp(); 
        } else { 
            pressDown();
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};