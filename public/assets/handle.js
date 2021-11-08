$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var message = {item: item.val()};

        $.ajax({
          type: 'POST',
          url: '/',
          data: message,
          success: function(data){
            //do something with the data via front-end framework
            console.log(data.message);
            location.reload();
          }
        });
  
        return false;
  
    });
  
  
  });
  