$(document).ready( function(){
    
    var file1;
	var file2; 
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
            
            $('.progress').hide();
            
            clearInterval(my_interval);
        }
        else{            
            // PROCESS IMAGE
            wait = true;
            var file1 = 'selenium/latest-batch/' + val;
            var file2 = 'selenium/'+ folder_name +'/' + val;
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

            var image_a = "<img class='thumbnail small' src='"+ data.one +"'></img>";
            var image_b = "<img class='thumbnail small' src='"+ data.two +"'></img>";
            var image_c = "<img class='thumbnail' src='"+ data.getImageDataUrl() +"'></img>";

                if(data.misMatchPercentage == 0){
                    $('#same').append('<div class="row"><div class="span6">'+ image_a + image_b +'</div><div class="span6">'+ image_c +'</div></div><br/>');
                    $('#same').show();
                    
                    same++;
                    $('#count-same span').html(same);
                }
                else{
                    $('#diff').append('<div class="row"><div class="span12"><h4>Diff: '+ data.misMatchPercentage +'</h4></div></div>');
                    $('#diff').append('<div class="row"><div class="span6">'+ image_a + image_b +'</div><div class="span6">'+ image_c +'</div></div><br/>');
                    $('#diff').show();
                    
                    diff++;
                    $('#count-diff span').html(diff);
                }
            }
        catch(err) {
            found_errors++;
            $('#info p.processing-errors span').html(found_errors);
            $('#info p.processing-errors').fadeIn();
        }
	}
});