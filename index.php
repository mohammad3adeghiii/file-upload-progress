<?php
    $fileName = $_FILES["image-upload"]["name"];
    $filePath = $_FILES["image-upload"]["tmp_name"];
    move_uploaded_file($filePath, "uploads/".$fileName);
?>