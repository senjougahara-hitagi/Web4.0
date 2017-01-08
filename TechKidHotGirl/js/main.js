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
    $('.modal-content').on('click', '.plus_button_modal', function(event){
      var num = $(event.target).parent().parent().children().find(".number");
      var num_overlay = $(event.target).parent().parent().parent().parent().parent().children().find(".num_on_overlay");
      // if(num.length > 0) { //đoạn này chịu ko hiểu làm gì
        var n = parseInt(num.html()) + 1;
        num.html(n);
        num_overlay.html(n);
      // }
    });
  }).fail(function(error){
    console.log("Error: " + error);
  });
});
