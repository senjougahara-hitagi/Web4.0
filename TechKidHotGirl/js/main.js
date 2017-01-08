var isRequestingNextPage = false;
var loadedData = [];
$(document).ready(function(){
  var source = $("#item-template").html();
  var itemTemplate = Handlebars.compile(source);
  var itemModalTemplate = Handlebars.compile($("#item-modal-template").html());

  requestNextPage(itemTemplate);
  // $.ajax({
  //   type : "get",
  //   url  : "lib/imagesData.json"
  // }).then(function(data){
  //   loadedData = loadedData.concat(data.items);//gan data vao loadedData
  //   var itemHtml = itemTemplate(data);
  //
  //   $("#item_list").html(itemHtml);
  //   $("#item_list").masonry({
  //     itemSelector: '.item_container',
  //     columnWidth: '.item_container',
  //     percentPosition: true
  //   });
  // }).fail(function(error){
  //   console.log("Error: " + error);
  // });

  $('body').on('click', '.plus_button', function(){
    var itemId = $(this).attr('data-item-id');
    for(var i = 0; i < loadedData.length; i++){
      var itemData = loadedData[i];
      if(itemData.id == itemId){
        // Found item, populating data
        $("#item_modal_body").html(itemModalTemplate(itemData));
        break;
      }
    }
    $("#item_modal").modal("show");
  });

  $(window).on('scroll', function(){
    if(isRequestingNextPage) return;
    if($(window).scrollTop() + window.innerHeight > $(document).height() -100){
      document.getElementById("loading_container").style.display = 'flex';
      setTimeout(function(){
        requestNextPage(itemTemplate);
      }, 4000);
      isRequestingNextPage = true;
	  
    }
  });
});


function requestNextPage(itemTemplate){
  $.ajax({
    type : "get",
    url  : "lib/imagesData.json"
  }).then(function(data){
    loadedData = loadedData.concat(data.items);//gan data vao loadedData
    // var itemHtml = itemTemplate(data);
    var $itemHtml = $(itemTemplate(data));

    $("#item_list").append($itemHtml).masonry( 'appended', $itemHtml );
    $('#item_list').masonry({
      itemSelector: '.item_container',
      columnWidth: '.item_container',
      percentPosition: true
    });

    // $("#item_list").append(itemHtml);// noi vao cuoi html cho co id=item_list
  }).fail(function(error){
    console.log("Error: " + error);
  }).always(function(){
    isRequestingNextPage = false;
	document.getElementById("loading_container").style.display = 'none';
  });
}
