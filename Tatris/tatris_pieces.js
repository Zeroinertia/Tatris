function LPiece() 
{
	this.state1 = [ [1, 0],
					[1, 0],
					[1, 1] ];
					
	this.state2 = [	[0, 0, 1],
					[1, 1, 1] ];
					
	this.state3 = [	[1, 1],
					[0, 1],
					[0, 1] ];
					
	this.state4 = [	[1, 1, 1],
					[1, 0, 0] ];
					
	this.states = [this.state1, this.state2, this.state3, this.state4];
	this.curState = 0;
	
	this.color = 3;
	this.gridX = 4;
	this.gridY = -3;
}

function JPiece() 
{
	this.state1 = [ [0, 1],
					[0, 1],
					[1, 1] ];
					
	this.state2 = [	[1, 1, 1],
					[0, 0, 1] ];
					
	this.state3 = [	[1, 1],
					[1, 0],
					[1, 0] ];
					
	this.state4 = [	[1, 0, 0],
					[1, 1, 1] ];
					
	this.states = [this.state1, this.state2, this.state3, this.state4];
	this.curState = 0;
	
	this.color = 0;
	this.gridX = 4;
	this.gridY = -3;
}

function BlockPiece() 
{
	this.state1 = [	[1, 1],
					[1, 1] ];
					
	this.states = [this.state1];
	this.curState = 0;
	
	this.color = 2;
	this.gridX = 4;
	this.gridY = -2;
}

function LinePiece() 
{
	this.state1 = [	[1],
					[1],
					[1],
					[1] ];
					
	this.state2 = [	[1, 1, 1, 1] ];
	
	this.states = [this.state1, this.state2];
	this.curState = 0;
	
	this.color = 7;
	this.gridX = 5;
	this.gridY = -4
}

function TPiece() 
{
	this.state1 = [	[1, 1, 1],
					[0, 1, 0] ];
					
	this.state2 = [ [1, 0],
					[1, 1],
					[1, 0] ];
					
	this.state3 = [ [0, 1, 0],
					[1, 1, 1] ];
	
	this.state4 = [	[0, 1],
					[1, 1],
					[0, 1] ];
					
	this.states = [this.state1, this.state2, this.state3, this.state4];
	this.curState = 0;
	
	this.color = 4;
	this.gridX = 4;
	this.gridY = -2;
}

function ZPiece() 
{
	this.state1 = [	[1, 1, 0],
					[0, 1, 1] ];
					
	this.state2 = [	[0, 1],
					[1, 1],
					[1, 0] ];
					
	this.states = [this.state1, this.state2];
	this.curState = 0;
	
	this.color = 6;
	this.gridX = 4;
	this.gridY = -2;
}

function SPiece() 
{
	this.state1 = [ [0, 1, 1],
					[1, 1, 0] ];
	
	this.state2 = [ [1, 0],
					[1, 1],
					[0, 1] ];
	
	this.states = [this.state1, this.state2];
	this.curState = 0;
	
	this.color = 1;
	this.gridX = 4;
	this.gridY = -2;
}

function getRandomPiece() 
{
	var result = Math.floor( Math.random() * 7);
	var piece;
	
	switch(result) 
	{
		case 0: piece = new LPiece();		break;
		case 1: piece = new ZPiece();		break;
		case 2: piece = new BlockPiece();	break;
		case 3: piece = new TPiece();		break;
		case 4: piece = new JPiece();		break;
		case 5: piece = new SPiece();		break;
		case 6: piece = new LinePiece();	break;
	}
	
	//piece.color = Math.floor(Math.random() * 8);
	return piece;
}
