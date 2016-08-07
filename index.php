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
    <div class="container">
        <section role="main">
            <?php if(!empty($_GET) && $_GET['folder'] > 1): ?>
                <input id="folder" value="<?= $_GET['folder']; ?>" type="hidden"/>
            <?php endif; ?>
            
            <div class="hero-unit">
                <h1>Educate Magis</h1>
                <p>A/B Image Testing</p>
                <a href="#" id="show-directory" class="btn btn-primary">Show Directory</a>
                <br/>
                <br/>
                <div class="progress progress-success progress-striped">
                    <span id="progress-bar" class="bar" style="width: 0%;"></span>                        
                </div>
            </div>
            
            <div id="directory" class="well">
                <?php                
                    $dirs = array_filter(glob('C:/wamp/www/resemble/selenium/*'), 'is_dir');
                
                    $li = "";
                    foreach($dirs as $dir){
                        $folder = str_replace("C:/wamp/www/resemble/selenium/","",$dir);
                        
                        if(is_numeric($folder)){
                            $nicename = date("l, d-M | G:i", $folder);
                            $li = "<li><a href='http://localhost/resemble/?folder={$folder}'>{$nicename}</a></li>" . $li;
                        }
                    }
                    echo "<h4>Directory</h4>";
                    echo "<ul>{$li}</ul>";
                ?>
            </div>
            
            <div class="row">
                <div class="span12">
                
                <div id="errors" class="alert alert-error">
                    
                </div>
                
                <div id="info" class="alert alert-info">
                    <strong>Processing:</strong><span id="count_done">0</span>/<span id="count_todo">0</span>
                    
                    <p id="count-same"><span>0</span> similar images found</p>
                    <p id="count-diff"><span>0</span> images with differences found</p>
                    <p class="processing-errors"><span>0</span> processing errors found</p>
                </div>
                </div>
            </div>
            
            <div id="results">
                <div id="diff">
                    <div class="page-header"><h1>Diff</h1>
                    <!-- JQUERY APPEND HERE -->
                    </div>
                </div>
                <div id="same">
                    <div class="page-header"><h1>Same</h1>
                    <!-- JQUERY APPEND HERE -->
                    </div>
                </div>
            </div>
            
       </section>
    </div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="resemble.js"></script>
    <script src="demoassets/main.js"></script>
</body>

</html>