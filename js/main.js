var TicTacToe = {
	button:null,
	textfield:null,
	number_regexp:null,
	cell_data:null,
	TicTacToe_dasboard:null,
	game_blocks:null,
	image:null,
	counter_steps:null,
	blocks_amount:0,
	player_one_symbol:"X",
	player_two_symbol:"O",
	player_one_points:0,
	player_two_points:0,

	show_score: function(symbol){

		if( TicTacToe.player_one_symbol == symbol ){
			TicTacToe.player_one_points++;
			document.getElementById("player_one_score_count").innerHTML = TicTacToe.player_one_points;
			alert("Player 1 wins");
		}
		else if( TicTacToe.player_two_symbol == symbol ){
			TicTacToe.player_two_points++;
			document.getElementById("player_two_score_count").innerHTML = TicTacToe.player_two_points;
			alert("Player 2 wins");
		}
		else if(symbol == "draw"){
			alert("Draw Game");
		}
		TicTacToe.blocks_amount = 0;
		TicTacToe.counter_steps = 0;
		TicTacToe.create_cells(selectCells);
	},
	get_results: function(){

		for( i = 0; i < cell_data.length; i++ ){
			counter_x_rows = 0;
			counter_0_rows = 0;
			counter_x_cols = 0;
			counter_0_cols = 0;
			counter_x_diag = 0;
			counter_0_diag = 0;
			counter_x_diag_rev = 0;
			counter_0_diag_rev = 0;
			k = cell_data.length - 1;	

			for( j = 0; j < cell_data[i].length; j++ ){

				// conditionals to verify the rows
				if ( cell_data[i][j] == "X" ){
					counter_x_rows++;
				}
				else if ( cell_data[i][j] == "O" ){
					counter_0_rows++;
				}

				// conditionals to verify the cols
				if( cell_data[j][i] == "X" ){
					counter_x_cols++;
				}
				else if( cell_data[j][i] == "O" ){
					counter_0_cols++;
				}			

				// conditionals to verify diagonal line
				if( cell_data[j][j] == "X" ){
					counter_x_diag++;
				}
				else if( cell_data[j][j] == "O" ){
					counter_0_diag++;
				}	

				// conditional to diagonal reverse
				if( cell_data[j][k] == "X" ){
					counter_x_diag_rev++;
				}
				else if( cell_data[j][k] == "O" ){
					counter_0_diag_rev++;
				}

				k--;
			}

			if( counter_x_rows == cell_data.length || 
				counter_x_cols == cell_data.length ||
				counter_x_diag == cell_data.length ||
				counter_x_diag_rev == cell_data.length	
			){
				TicTacToe.counter_steps = TicTacToe.blocks_amount;
				TicTacToe.show_score("X");
				break;

			}else if( counter_0_rows == cell_data.length ||
					 counter_0_cols == cell_data.length ||
					 counter_0_diag == cell_data.length ||
					 counter_0_diag_rev == cell_data.length
			){

				TicTacToe.counter_steps = TicTacToe.blocks_amount;
				TicTacToe.show_score("O");
				break;

			}else if (  TicTacToe.counter_steps  ==  TicTacToe.blocks_amount  ){
				TicTacToe.show_score("draw");
				break;
			}
		}
	},
	filling_out_blocks: function(event){
		var identifer = null;

		if (  TicTacToe.counter_steps  <  TicTacToe.blocks_amount  ){

			symbol = document.createElement("span");

			identifer = event.target.id.split(",");

			if(  TicTacToe.counter_steps%2 == 0 ){
				symbol.innerHTML = TicTacToe.player_one_symbol;
				cell_data[identifer[0]][identifer[1]] = TicTacToe.player_one_symbol;
			}
			else{
				symbol.innerHTML = TicTacToe.player_two_symbol;
				cell_data[identifer[0]][identifer[1]] = TicTacToe.player_two_symbol;
			}

			TicTacToe.counter_steps++;

			event.target.appendChild(symbol);

			TicTacToe.get_results();
		}	
	},
	create_cells: function(number){

		number = parseInt(number);

		TicTacToe.blocks_amount = Math.pow(number,2);

		cell_data = new Array(number);

		game_blocks = new Array(number);

		for( i = 0; i < cell_data.length ; i++) {

			cell_data[i] = new Array(number);
			game_blocks[i] = new Array(number);
		}

		TicTacToe_dasboard = document.getElementById("TicTacToe_dasboard");

		TicTacToe_dasboard.innerHTML = "";

		TicTacToe.counter_steps = 0;

		TicTacToe_dasboard.style.width = (100 * number);

		TicTacToe_dasboard.style.height = (100 * number);

		for( i = 0; i < game_blocks.length; i++ ){
			for( j = 0; j < game_blocks[i].length; j++ ){

				game_blocks[i][j] = document.createElement("div");

				game_blocks[i][j].setAttribute("class","TicTacToe_block");

				game_blocks[i][j].setAttribute("id",i+","+j);

				game_blocks[i][j].addEventListener('click',this.filling_out_blocks,false);

				TicTacToe_dasboard.appendChild(game_blocks[i][j]);
			}
		}
	},
	validate_values: function(){
		selectbox = document.getElementById("selectCells").selectedIndex;
		selectCells = document.getElementsByTagName("option")[selectbox].value;
	
		number_regexp = /^\d+$/;

		if( number_regexp.test(selectCells) ){
			TicTacToe.create_cells(selectCells);
		}
		else{
			alert("select cells");
		}
	},
	restart: function(){
		document.getElementById("TicTacToe_dasboard").childNodes.innerHTML = "";
	},
	init: function(){
		selectitem = document.getElementById("selectCells");
		selectitem.onchange = this.validate_values;
		
		button = document.getElementById("restart");
		button.addEventListener("click", this.validate_values, false);
	}
};

TicTacToe.init();