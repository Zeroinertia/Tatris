<?php
	$sname = "localhost";							// Servername
	$uname = "root";								// Username
	$pword = "";									// Password
	$dbase = "tatris";			// Database
	
	$con = mysqli_connect($sname, $uname, $pword, $dbase) or die($sname . " connection problem" . mysqli_error());
	
?>

