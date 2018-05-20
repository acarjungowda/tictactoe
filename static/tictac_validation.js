function validateBoard(mark) {

	// Take count of columns
	var grid_size = 3;

	// Declare variables to count the presence of the mark
	var horizontal_count,
		vertical_count,
		right_to_left_count = 0,
		left_to_right_count = 0;


	// Loop 1
	for(var i = 0; i < grid_size; i++) {

		// Empty the count
		horizontal_count = vertical_count = 0;

		// Loop 2
		for(var j = 0; j < grid_size; j++) {

			if(grid[i][j] == mark) {
				horizontal_count++;
			}

			if(grid[j][i] == mark){
				vertical_count++;
			}

		}

		// If horizontal or vertical combination is found the return true
		if(horizontal_count == grid_size || vertical_count == grid_size) {
			return true;	
		}
	}// end of check for rows and columns


/*		// i * grid_size + i ===> "0,4,8"
		if(this.columns[i * grid_size + i].innerHTML == mark) {
			right_to_left_count++;
		}

		// (grid_size - 1) * (i+1) ===> "2,4,6"
		if(this.columns[(grid_size - 1) * (i+1)].innerHTML == mark) {
			left_to_right_count++;
		}

	} // End of loop*/

	//check for diagonals
	var i = 0;
	var j = 0;

	while(i < 3 && j < 3){
		if(grid[i][j] == mark) {
			left_to_right_count++;
		}
		i++;
		j++;
	}

	i = 2;
	j = 2;

	while( i>=0 && j>=0){
		if(grid[i][j] == mark) {
			right_to_left_count++;
		}
		i--;
		j--;
	}

	// If mark is present diagnolly
	if(right_to_left_count == grid_size || left_to_right_count == grid_size) {
		return true;	
	}

	return false;
};