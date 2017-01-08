$(document).ready(function(){
  var source = $("#item-template").html();
  var itemTemplate = Handlebars.compile(source);
  $.ajax({
    type : "get",
    url  : "lib/imagesData.json"
  }).then(function(data){
    data.items.forEach(function(item, myModal) {//đoạn này em tham khảo bài của anh Linh Thần nhưng ko hiểu cách
                                                //hoạt động, anh giải thích giúp em vs
      item.myModal = myModal;
    })

    var itemHtml = itemTemplate(data);
    $("#item_list").html(itemHtml);
    $("#item_list").masonry({
      itemSelector: '.item_container',
      columnWidth: '.item_container',
      percentPosition: true
    });
  }).fail(function(error){
    console.log("Error: " + error);
  });
});
