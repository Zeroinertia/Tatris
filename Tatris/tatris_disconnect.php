<?php
  session_start();
  session_destroy();
  header("location:tatris_login.php?ktss=lo");
?>
