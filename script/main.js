$(function() {
  $.scrollify({
    section:".panel",
    scrollbars:false,
    before:function(i,panels) {

      var ref = panels[i].attr("data-section-name");

      $(".pagination .active").removeClass("active");

      $(".pagination").find("a[href=\"#" + ref + "\"]").addClass("active");
    },
    afterRender:function() {
      var pagination = "<ul class=\"pagination\">";
      var activeClass = "";
      $(".panel").each(function(i) {
        activeClass = "";
        if(i===0) {
          activeClass = "active";
        }
        pagination += "<li><a class=\"" + activeClass + "\" href=\"#" + $(this).attr("data-section-name") + "\"><span class=\"hover-text\">" + $(this).attr("data-section-name").charAt(0).toUpperCase() + $(this).attr("data-section-name").slice(1) + "</span></a></li>";
      });

      pagination += "</ul>";

      $(".home").append(pagination);
      /*

      Tip: The two click events below are the same:

      $(".pagination a").on("click",function() {
        $.scrollify.move($(this).attr("href"));
      });

      */
      $(".pagination a").on("click",$.scrollify.move);
    }
  });
  
  // on CTA button click, move to the next slide
  $('.js-CTA').on('click', event => {
    event.preventDefault(); //  prevent the anchor from navigating to "#" href
    $.scrollify.next();
  });
  // $.scrollify.move("#name");

  $('.js-asterisk').on('click', event => {
    event.preventDefault();
    $.scrollify.move("#sources");
  })
});

// Disable snap scroll for last section
  $('.regular-scroll').on('target', event => {
    $.scrollify.disable();
  });

//FOR TEXT ANIMATION

(function($) {
  var aiMsg = ["At 270 lbs per person a year, America eats more meat than any other country.","Animal agriculture is the most destructive industry facing the planet today."];

  $(document).ready(function() {
    var inputAI = $("#reg_ai");
    
    aiMSGLoop(aiMsg);
    function aiMSGLoop(wordArray) {
      // store new element so AI knows where to write
      var newElement = $("<h1></h1>").appendTo(inputAI);
      var rand = Math.round(Math.random() * (wordArray.length-1)+ 0);
      //my type writer uses object function so no need to code 
      //long function every time
      newElement.writeText(wordArray[rand]).then(function() {
        setTimeout(function(){ 
          newElement
          .removeText(wordArray[rand])
          .then(function() {
          aiMSGLoop(wordArray);
            
        });
           }, 2500);
      });
    }
  });

  //AI Text typer

  $.fn.writeText = function(content) {
    var elem = this;
    elem.addClass("typewriter");
    return new Promise(function(resolve, reject) {
      var contentArray = content.split(""),
        current = 0;
      var rand = 90;
      setInterval(function() {
        rand = Math.round(Math.random() * (300 + 1050));
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        } else {
          resolve();
        }
      }, rand);
    });
  };

  //AI Text Typer backspace

  $.fn.removeText = function(content) {
    var elem = this;
    return new Promise(function(resolve, reject) {
      var contentArray = content.split("");
      var current = 0;
      setInterval(function() {
        if (current < contentArray.length) {
          elem.text(elem.text().slice(0, -1));
          current++;
        } else {
          elem.remove();
          resolve();
        }
      }, 70);
    });
  };
})(jQuery);



