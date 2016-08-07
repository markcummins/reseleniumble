<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Resemble.js : Image analysis</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="libs/twitter-bootstrap/bootstrap.min.css">
    <link rel="stylesheet" href="demoassets/resemble.css?v1">
</head>
<body>

<?php 
    $msg = "";
    // COPY FOLDER
    $timestamp = time();
    $msg = "<div class='alert'>
                <strong>Folder Copied!</strong>
                <div><input id='folder' value='{$timestamp}'/></div>
            </div>";
    $src = 'C:/wamp/www/resemble/selenium/latest-batch/';
    $dst = "C:/wamp/www/resemble/selenium/{$timestamp}/";

    $dir = opendir($src);
    @mkdir($dst);

    while(false !== ( $file = readdir($dir)) ) {
        if (( $file != '.' ) && ( $file != '..' )) {
            if ( is_dir($src . '/' . $file) ) {
                recurse_copy($src . '/' . $file,$dst . '/' . $file);
            }
            else {
                copy($src . '/' . $file,$dst . '/' . $file);
            }
        }
    }
    closedir($dir);
    
    // CLEAR FOLDER
    $src = glob('C:/wamp/www/resemble/selenium/latest-batch/*');
    foreach($src as $file){
        if(is_file($file))
            unlink($file); 
    }
?>

    <div class="container">
        <section role="main">
            <div class="row">
                <div class="span12">
                    <?= $msg; ?>
                    <ul class="list"></ul>
                </div>
            </div>   
       </section>
    </div>
</body>

</html>