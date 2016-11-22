<?php
	require "connection.php";
	session_start();
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<style>
		body
		{
			background-color:black;
		}
		table 
		{
			width:100%;
			border-collapse:collapse;
		}
		
		table, td, tr
		{
			border:0.5px solid white;
			padding:2px;
			text-align:right;
			font-size:18px;
			font-family:sans-serif, verdana;
			color:#fefefe;
		}
	</style>
</head>

<body>
	<table>
	<?php
		$query = "SELECT `username`, `highscore` FROM `users` ORDER BY `highscore` DESC";
		$result = mysqli_query($con,$query);
		$rowCount = 1;
		
		while(($row = mysqli_fetch_row($result)) && $rowCount <= 10)
		{
			echo "<tr>";
			echo ("<td style='text-align:left;'>" . $rowCount . ". " . $row[0] . "</td> <td>" . $row[1] . "</td>");
			echo "</tr>";
			$rowCount++;
		}
	?>
	</table>
</body>
</html>
