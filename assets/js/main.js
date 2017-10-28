const button = document.querySelector('.button');
const dropdown = document.querySelector('.dropdown');

button.addEventListener('click', () => {
  dropdown.classList.toggle('is-open');
});


$(".showModal").click(function() {
  $(".modal").addClass("is-active");  
});

$(".modal-closed").click(function() {
   $(".modal").removeClass("is-active");
});


jQuery(document).ready(function ($) {

    /*var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();*/
    var slideWidth = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();

    /*$( window ).resize(function() {
        if(viewportWidth <= 800){
            slideWidth = 493.44;
            slideHeight = 670.97;
        } else {
            slideWidth = 293;
            slideHeight = 398;
        }
    });*/

    var slideCount = $('#slider ul li').length;

    var sliderUlWidth = slideCount * slideWidth;
    
    $('#slider').css({ width: slideWidth, height: slideHeight });
    
    $('#slider ul').css({ width: sliderUlWidth, marginLeft: - slideWidth });
    
      $('#slider ul li:last-child').prependTo('#slider ul');
  
      function moveLeft() {
          $('#slider ul').animate({
              left: + slideWidth
          }, 200, function () {
              $('#slider ul li:last-child').prependTo('#slider ul');
              $('#slider ul').css('left', '');
          });
      };
  
      function moveRight() {
          $('#slider ul').animate({
              left: - slideWidth
          }, 200, function () {
              $('#slider ul li:first-child').appendTo('#slider ul');
              $('#slider ul').css('left', '');
          });
      };
  
      $('a.control_prev').click(function () {
          moveLeft();
      });
  
      $('a.control_next').click(function () {
          moveRight();
      });
  
  });    
  