
var todo = {
 //POST
 save: function(){
   if(event.which == 13) {
     var val = $('.input').val();
     $.post("/api/index",{ name : val }, function(data){
       console.log(data);
       $('.ul').append('<li class="li"><span class="span" data-id="'+data.id+'"><i class="fa fa-trash-o"></i></span>'+data.name+'</li>');
       })
         .done(function(){
           alert("saved");
         })
         .fail(function(){
           alert("error");
         })
     }
   },

 	/*//UPDATE
  update: function update_item(){
 		var li = $(this);
 		$.ajax({
 			url: 'api/index'+li.data('id'),
 			type: 'PUT',

 			}).done(function(data) {
				console.log("success");
				li.toggleClass('completed');
 			}).fail(function(){
        alert('update fail');
      })
 		},*/

 	//DELETE
 	del: function delete_item(){

    var objSpanid = $(this).data('id');
    var objSpan = $(this);

	 	$.ajax({
	 			url: '/api/index/'+ objSpanid,
	 			type: 'DELETE',
        data: objSpanid
	 		}).done(function(data) {
	 			//변수에 불러올 속성값(data-id) 가져온다.
	 				objSpan.closest('li').remove();
	 			//찾은 값을 지운다.
	 		}).fail(function(){
        alert('fail');
      })
 		},

 	//SET event
  setEvent: function(){
    //엔터 후 save
 		var input = $('.input');
 		input.keypress(this.save);

 		//span 클릭 후 del
 		$('.ul').on('click', '.span', todo.del);

 		//span 클릭 후 update
 		$('.ul').on('click', '.li', todo.update);
 	},

 	//INIT
 	init: function(){
 		todo.setEvent();
 		$.get("/api/index", function(data){
 			$.each(data, function(index, value){
 				console.log(value);
 				$('.ul').append('<li class="li"><span class="span" data-id="'+value.id+'"><i class="fa fa-trash-o"></i></span>'+value.name+'</li>');
 			})
 		})
 	}
 }
todo.init();
