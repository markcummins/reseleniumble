$(document).ready( function(){
        
    var file1;
	var file2; 
    var timestamp = $.now();
    
    var img_arr = new Array;
    var my_interval;
    
    var count = 0;
    var same = 0;
    var diff = 0;
    var found_errors = 0;
    var percentage = 0;
    
    var wait = false;
    var folder_name = $('#folder').val();
        
    if($('#folder').length > 0){
        $('#info').fadeIn();
        scan_directory();
    }
    
    $('#show-directory').click(function(){
        $('#directory').toggle();
    });
    
    function scan_directory(){
        
        $.ajax({
            url : 'http://localhost/resemble/selenium/latest-batch/',
            success: function (data) {

                $(data).find("a").attr("href", function (i, val) {

                    if(val.match(/\.(jpe?g|png|gif)$/))
                        img_arr.push(val);
                });


                $('span#count_todo').html(img_arr.length);
                percentage = 100/img_arr.length;

                my_interval = setInterval(find_images, 2000);
            }
        });
    }
    
    function find_images(){
        
        if(wait)
            return;
        
        var val = img_arr.pop();  
        
        if(typeof val === 'undefined'){
            
            $('#results').fadeIn();
            console.log('Complete');
            $('.zoom').zoom();
            
            $('.progress').hide();
            
            clearInterval(my_interval);
        }
        else{            
            // PROCESS IMAGE
            wait = true;
            var file1 = 'selenium/latest-batch/' + val + '?' + timestamp;
            var file2 = 'selenium/'+ folder_name +'/' + val;
            //console.log(file1); console.log(file2);
            
            resemble(file1).compareTo(file2).onComplete(onComplete);
        }
    }
    
	function onComplete(data){
        
        
        // UPDATE COUNTER + PROGRESS BAR
        count++;
        var bar_width = percentage*count;
        $('span#progress-bar').width(bar_width + '%');
        $('span#count_done').html(count);
        
        try {
            var time = Date.now();
            var diffImage = new Image();		
            wait = false;

            var image_a = "<div class='span3'><div class='zoom thumbnail'><img src='"+ data.one +"'></img></div></div>";
            var image_b = "<div class='span3'><div class='zoom thumbnail'><img src='"+ data.two +"'></img></div></div>";
            var image_c = "<div class='span6'><div class='zoom thumbnail'><img src='"+ data.getImageDataUrl() +"'></img></div></div>";

                if(data.misMatchPercentage == 0){
                    $('#same').append('<div class="row">'+ image_a + image_b + image_c +'</div><br/>');
                    $('#same').show();
                    
                    same++;
                    $('#nav .same-anchor').show();
                    $('#count-same span').html(same);
                }
                else{
                    $('#diff').append('<div class="row"><div class="span12"><span class="label label-success">Diff: '+ data.misMatchPercentage +'</span></div></div><br/>');
                    $('#diff').append('<div class="row">'+ image_a + image_b + image_c +'</div><br/>');
                    $('#diff').show();
                    
                    diff++;
                    $('#nav .diff-anchor').show();
                    $('#count-diff span').html(diff);
                }
            }
        catch(err) {
            console.log(data);
            console.log(err);
            
            found_errors++;
            $('#info li.processing-errors span').html(found_errors);
            $('#info li.processing-errors').fadeIn();
        }
	}
});