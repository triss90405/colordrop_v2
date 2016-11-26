// Load all Colors
var loadColors = function() {
  $.ajax({
    type: 'GET',
    url: '/get_colors.php',
    dataType: 'HTML',
    success: function(response) {
      var json = JSON.parse(response);
      json.forEach(function(item) {
        var hexArray = item.hex.split (' ');
        var id = item.id;
        $('.home').append(
          '<div class="item" id="'+ id +'" data-id="'+ id +'">'+
            '<div class="color" style="background-color:#'+hexArray[0]+'" data-color="'+hexArray[0]+'"></div>'+
            '<div class="color" style="background-color:#'+hexArray[1]+'" data-color="'+hexArray[1]+'"></div>'+
            '<div class="color" style="background-color:#'+hexArray[2]+'" data-color="'+hexArray[2]+'"></div>'+
            '<div class="color" style="background-color:#'+hexArray[3]+'" data-color="'+hexArray[3]+'"></div>'+
          '</div>'
        );
      });
    }
  });
};


// Load favourite Colors
var loadFavourites = function() {
  $.ajax({
    type: 'GET',
    url: '/get_colors.php',
    dataType: 'HTML',
    success: function(response) {
      var json = JSON.parse(response);
      json.forEach(function(item) {
        var favouriteColors = localStorage.getItem('palettes');
        var favouriteColorsArray = favouriteColors.split(',');
        var hexArray = item.hex.split (' ');
        var id = item.id;
        var idString = '' + id;
        if (favouriteColorsArray.indexOf(idString) >= 0) {
          $('.favourites').append(
            '<div class="item" id="'+ id +'" data-id="'+ id +'">'+
              '<div class="color" style="background-color:#'+hexArray[0]+'" data-color="'+hexArray[0]+'"></div>'+
              '<div class="color" style="background-color:#'+hexArray[1]+'" data-color="'+hexArray[1]+'"></div>'+
              '<div class="color" style="background-color:#'+hexArray[2]+'" data-color="'+hexArray[2]+'"></div>'+
              '<div class="color" style="background-color:#'+hexArray[3]+'" data-color="'+hexArray[3]+'"></div>'+
            '</div>'
          );
        }
      });
    }
  });
};


// Convert HEX
var hexToRgb = function(hex) {
  return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) {
    return '#' + r + r + g + g + b + b;
  }).substring(1).match(/.{2}/g).map(function (x) {
    return parseInt(x, 16);
  });
};



// Sidebar
var sidebar = function() {
  var content = $('#content');
  var sidebarContainer = $('.sidebar');
  var sidebarClose = $('#close-sidebar');
  var changeBgColor = $('#changeBgColor');
  // Open sidebar and load color
  content.on('click', '.item', function(e){
    e.stopPropagation();
    // Get the clicked item's data-id
    // Workaround because items are added after DOM load
    var id = $(e.target).parent().data("id");
    var color = $(e.target).parent().children();
    var favouriteColors = localStorage.getItem('palettes');
    sidebarContainer.find('.color').remove();
    $('#navigation').removeClass('active');
    $('.nav-toggle').removeClass('active');
    color.each(function() {
      var hex = $(this).data("color");
      sidebarContainer.append(
        '<div class="color">'+
          '<div class="example" style="background-color:#'+hex+'"></div>'+
          '<div class="hex"><span>HEX: </span>#'+hex+'</div>'+
          '<div class="rgb"><span>RGB: </span>'+hexToRgb("#"+hex)+'</div>'+
        '</div>'
      );
    });
    sidebarContainer.find('.favourite').remove();
    changeBgColor.removeClass('active');
    sidebarContainer.addClass('active');
    // Detect favourite page
    if(!favouriteColors) {
      sidebarContainer.append('<button id="favourite" class="favourite" value="'+id+'">+ Add favourite</button>');
    } else if (favouriteColors.indexOf(id) !== -1) {
      sidebarContainer.append('<button id="removeFavourite" class="favourite remove" value="'+id+'">Remove favourite</button>');
      loadColors();
    } else {
      sidebarContainer.append('<button id="favourite" class="favourite" value="'+id+'">+ Add favourite</button>');
    }
  });
  // Close sidebar (esc key)
  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      sidebarContainer.removeClass('active');
      sidebarContainer.find('.favourite').remove();
      $('#navigation').removeClass('active');
      $('.nav-toggle').removeClass('active');
    }
  });
  // Close sidebar (close button)
  sidebarClose.on('click', function() {
    sidebarContainer.removeClass('active');
    changeBgColor.removeClass('active');
    sidebarContainer.find('.favourite').remove();
  });
};


// Change Background Color
var changeBgColor = function() {
  var content = $('#content');
  var pink = $('#pink');
  var green = $('#green');
  var blue = $('#blue');
  var yellow = $('#yellow');
  var grey = $('#grey');
  var red = $('#red');
  var black = $('#black');
  var changeBgColorButton = $('#changeBgColorButton');
  var changeBgColor = $('#changeBgColor');
  changeBgColorButton.on('click', function(e) {
    changeBgColor.toggleClass('active');
    e.stopPropagation();
  });
  $(document).on('keyup', function(e) {
    if (e.keyCode === 27) {
      changeBgColor.removeClass('active');
    }
  });
  pink.on('click', function() {
    content.removeClass();
    content.addClass('pink');
    changeBgColor.removeClass('active');
  });
  green.on('click', function() {
    content.removeClass();
    content.addClass('green');
    changeBgColor.removeClass('active');
  });
  blue.on('click', function() {
    content.removeClass();
    content.addClass('blue');
    changeBgColor.removeClass('active');
  });
  yellow.on('click', function() {
    content.removeClass();
    content.addClass('yellow');
    changeBgColor.removeClass('active');
  });
  grey.on('click', function() {
    content.removeClass();
    content.addClass('grey');
    changeBgColor.removeClass('active');
  });
  red.on('click', function() {
    content.removeClass();
    content.addClass('red');
    changeBgColor.removeClass('active');
  });
  black.on('click', function() {
    content.removeClass();
    content.addClass('black');
    changeBgColor.removeClass('active');
  });
};


// Add favourite
var favourite = function() {
  var body = $('body');
  body.on('click', '#favourite', function(){
    var favouriteButton = $('#favourite');
    var sidebarContainer = $('.sidebar');
    var favouriteId = $('#favourite').attr('value');
    var currentStorage = localStorage.getItem('palettes');
    localStorage.setItem('palettes', currentStorage + favouriteId + ',');
    // Show msg
    $('.alert').remove();
    $('<div style="display: none;" class="alert success">Palette saved!</div>').appendTo(body).slideDown("fast");
    favouriteButton.remove();
    sidebarContainer.append('<button id="removeFavourite" class="favourite remove" value="'+favouriteId+'">Remove favourite</button>');
    setTimeout(function(){
      $('.alert').remove();
    }, 3000);
  });
};


// Remove favourite
var removeFavourite = function() {
  var body = $('body');
  body.on('click', '#removeFavourite', function() {
    var content = $('#content');
    var sidebarContainer = $('.sidebar');
    var favouriteId = '' + $('#removeFavourite').attr('value');
    var currentStorage = localStorage.getItem('palettes');
    var currentStorageArray = currentStorage.split(',');
    var favouriteButton = $('#favourite');
    currentStorageArray = $.grep(currentStorageArray, function(value) {
      return value !== favouriteId;
    });
    var newStorage = currentStorageArray;
    localStorage.setItem('palettes', newStorage);
    // sidebarContainer.removeClass('active');
    // Detect favourite page
    if(content.hasClass('favourites')) {
      content.empty();
      loadFavourites();
    } else {
      //loadColors();
    }
    // Show msg
    $('.alert').remove();
    $('<div style="display: none;" class="alert error">Palette removed from favourites</div>').appendTo(body).slideDown("fast");
    setTimeout(function(){
      $('.alert').remove();
    }, 3000);
    favouriteButton.remove();
    sidebarContainer.append('<button id="favourite" class="favourite" value="'+favouriteId+'">+ Add favourite</button>');
  });
};


// Mobile Menu
var mobileMenu = function() {
  var navToggle = $('#nav-toggle');
  var navBar = $('#navigation');

  navToggle.on('click', function() {
    navBar.toggleClass('active');
    $(this).toggleClass('active');
    $('.sidebar').removeClass('active');
  });
};


// Run functions
$(document).ready(function() {
  loadColors();
  sidebar();
  changeBgColor();
  favourite();
  loadFavourites();
  removeFavourite();
  mobileMenu();
});
