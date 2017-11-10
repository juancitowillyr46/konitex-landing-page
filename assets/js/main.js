new Vue({
    el: '#main',
    data: {
        amounts: [1,2,3,4,5,6,7,8,9,10],
        size_adults: ['S','M','L','XL'],
        size_boys: [6,8,10,12],
        products: [ 
           {'price': 59.90, 'name': 'Camiseta Perú'},
           {'price': 44.90, 'name': 'Camiseta Básica'},
           {'price': 29.90, 'name': 'Camiseta Chulita'}
        ],
        size_adult: 0,
        color_adult: 0,
        amount_adult:0,
        size_boy: 0,
        color_boy: 0,
        amount_boy:0,
        default: 0,
        selectValue: '',
        selectText: '',
        amount_total:0,
        orders:[],
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    },
    created: function() {

        var product =  this.products[this.default];
        this.selectValue = product.price.toFixed(2);
        this.selectText  = product.name;

    },
    methods:{
        selectDropdown: function(){
    
            var button = document.querySelector('.button');
            var dropdown = document.querySelector('.dropdown');
            dropdown.classList.toggle('is-open');

        },
        selectProduct: function(index){

            var product    = this.products[index];
            var dropdown = document.querySelector('.dropdown');

            this.selectValue = product.price.toFixed(2);
            this.selectText  = product.name;
            dropdown.classList.toggle('is-open');

            this.calculate();
            
        },
        calculate: function(){
            
            var amount = this.selectValue;

            this.amount_total = amount * (this.amount_adult + this.amount_boy);     

        },
        nexStep: function(){

            document.getElementById("main").style.backgroundColor = '#eeeeee';
            document.getElementById("main").style.height = '650px';
            document.getElementById("content_contact").style.display = 'none';
            document.getElementById("step01").style.display = 'none';
            document.getElementById("nextStep").style.display = 'block';

            this.orders = {
                'items':[
                    {'product':this.selectText, 'type': 'Adulto', 'amount': this.amount_adult, 'size': this.size_adult, 'color': this.color_adult },
                    {'product':this.selectText, 'type': 'Niño', 'amount': this.amount_boy, 'size': this.size_boy, 'color': this.color_boy },
                ]
            }

        },
        finalStep: function(){
            
            var self = this;

            axios.post('/services/mail.php', {
                orders: self.orders,
                contact: {
                    'firstname': self.firstname,
                    'lastname': self.lastname,
                    'email': self.email,
                    'phone': self.phone
                },
                amount_total: self.amount_total
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

            /*document.getElementById("nextStep").style.display = 'none';
            document.getElementById("finalStep").style.display = 'block';
            document.getElementById("main").style.height = '126px';
            document.getElementById("wrapper_footer").style.height = '142px';
            document.getElementById("wrapper_footer").style.marginTop = '0px';*/
            
        }
    }
});

$(".showModal").click(function () {
    $(".modal").addClass("is-active");  
});

$(".modal-closed").click(function () {
    $(".modal").removeClass("is-active");
});

jQuery(document).ready(function ($) {

    var slideWidth  = $('#slider ul li').width();
    var slideHeight = $('#slider ul li').height();
    var slideCount  = $('#slider ul li').length;

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

