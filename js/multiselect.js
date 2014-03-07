    jQuery.expr[':'].Contains = function (li, i, m) {
        return (li.textContent || li.innerText || "").toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
    };
(function ($) {
	        $.fn.listFilter = function(header) { 
			var list = this
			var form = $("<form>").attr({ "class": "filterform", "action": "#" }),
				input = $("<input>").attr({ "class": "filterinput input-sm input-half", "type": "text" }).text("filter");
			$(form).append(input).prependTo(header);

			$(input)
			  .change(function () {
				  var filter = $(input).val();
				  if (filter) {                  
					  $(list).find("li:not(:Contains(" + filter + "))").hide();
					  $(list).find("li:Contains(" + filter + ")").show();
				  } else {
					  $(list).find("li").show();
				  }
				  return false;
			  })
			.keyup(function () {            
				$(this).change();
			});
		}
		
        $.fn.multiselect = function () {
			var sortableIn = 0;
            var elem = this;
            var sortableul = $("<ul>").attr({ "id": "dest"});
			sortableul.appendTo(elem.parent());
            sortableul.sortable({
                revert: true,
            }).droppable({ greedy: true });

            $('body').droppable({
                drop: function (event, ui) {
				if(ui.draggable.parent().attr('id') == sortableul.attr('id'))
                    ui.draggable.remove();
                }
            });
			
            elem.children().draggable({
                connectToSortable: sortableul,
                helper: "clone",
                revert: "invalid"
            });
            elem.listFilter(elem.parent());

        }
    }(jQuery));

