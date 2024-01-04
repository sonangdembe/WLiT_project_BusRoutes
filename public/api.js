$(function() {
    $("#location").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: 'https://nominatim.openstreetmap.org/search',
          dataType: 'json',
          data: {
            q: request.term,
            format: 'json',
            addressdetails: 1,
            viewbox: '85.218,27.396,85.515,27.847', 
            bounded: 1
          },
          success: function(data) {
            var locations = data.map(function(item) {
              return item.display_name;
            });
  
            response(locations);
          },
        });
      },
      minLength: 1,
      select: function(event, ui) {
        $("#location").val(ui.item.value);
        return false;
      }
    });
  });
  

$(function() {
    $("#destination").autocomplete({
      source: function(request, response) {
        $.ajax({
          url: 'https://nominatim.openstreetmap.org/search',
          dataType: 'json',
          data: {
            q: request.term,
            format: 'json',
            addressdetails: 1,
            viewbox: '85.218,27.396,85.515,27.847', 
            bounded: 1
          },
          success: function(data) {
            var locations = data.map(function(item) {
              return item.display_name;
            });
  
            response(locations);
          },
        });
      },
      minLength: 1
    });
  });
  
