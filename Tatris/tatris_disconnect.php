<?php
  session_start();
  session_destroy();
  header("location:tatris_loginpage.php?ktss=lo");
?>
