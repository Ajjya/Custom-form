/*!
	* jQuery hover box plugin
	* Original author: Vladyslava Prykhodko
	* Licensed under the MIT license
*/


;(function ( $, window, document, undefined ) {
    var pluginName = 'customForm',
        defaults = {
            
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
       
        this._defaults = defaults;
        this._name = pluginName;
        
        this.init();
    }

    Plugin.prototype.customFile = function(){
	    $(this.element).hide();
	    var obj = this.element;

	    $(this.element).wrap('<div class="customInputFileWrap"></div>');
	    $(this.element).after('<div class="customInputFile">UPLOAD &raquo;</div><div class="customInputSignature"></div>');

	    var par = $(this.element).closest('.customInputFileWrap');

	    par.find('.customInputFile').on('click', function(){
	        $(obj).trigger('click');
	    });

	    $(this.element).on('change', function(){
	        par.find('.customInputSignature').text($(this.element).val());
	    })
	}

	Plugin.prototype.customRadioBox = function(){
		$(this.element).css({display:'none'});

		if($(this.element).attr('checked') == 'checked'){
			$(this.element).after('<div class="radio_ch"></div>');
		} else {
			$(this.element).after('<div class="radio_unch"></div>');
		}

		var obj = this.element;

		$(this.element).next().on('click', function(){
			$(obj).trigger('click');

			var radioName = $(obj).attr('name');
			$(':radio[name=' + radioName +']').next().removeClass('radio_ch').addClass('radio_unch');
			$(this.element).removeClass('radio_unch').addClass('radio_ch');
		});
	}

	Plugin.prototype.customCheckBox = function(){
		$(this.element).css({display:'none'});

		if($(this.element).attr('checked') == 'checked'){
			$(this.element).after('<div class="ch_ch"></div>');
		} else {
			$(this.element).after('<div class="ch_unch"></div>');
		}

		var obj = this.element;
		$(this.element).on('click', function(){
			if($(obj).attr('checked') == 'checked'){
				$(obj).next().removeClass('ch_ch').addClass("ch_unch");
				$(obj).removeAttr('checked');
			} else {
				$(obj).next().removeClass('ch_unch').addClass("ch_ch");
				$(obj).attr('checked', 'checked');
			}
		});
		
	}

    Plugin.prototype.CustomSelect = function(){
    	var $this = $(this.element),
        	numberOfOptions = $(this.element).children('option').length;

        // Hides the select element
        $this.addClass('s-hidden');

        // Wrap the select element in a div
        $this.wrap('<div class="customSelect"></div>');

        // Insert a styled div to sit over the top of the hidden select element
        $this.after('<div class="styledSelect"><div class="arr"></div></div>');

        // Cache the styled div
        var $styledSelect = $this.next('div.styledSelect');
        $styledSelect.append('<div class="styledSelectInput"></div><div class="styledSelectBtn"></div>')
        var $styledSelectInput = $styledSelect.find('.styledSelectInput');
        var $styledSelectBtn = $styledSelect.find('.styledSelectBtn');
        // Show the first select option in the styled div
        if($this.children('option:selected').length > 0){
            $styledSelectInput.text($this.children('option:selected').eq(0).text());
        } else {
            $styledSelectInput.text($this.children('option').eq(0).text());
        }
        

        // Insert an unordered list after the styled div and also cache the list
        var $list = $('<ul />', {
            'class': 'options'
        }).insertAfter($styledSelect);

        // Insert a list item into the unordered list for each select option
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }

        // Cache the list items
        var $listItems = $list.children('li');

        // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
        $styledSelect.click(function (e) {
            $this = $(this);
            $('.customSelect .styledSelect.active').not($this).each(function () {
                $(this).removeClass('active');
            });
            $('.customSelect .options.active').not($this).each(function () {
                $(this).removeClass('active');
            });
            if($styledSelect.hasClass('active')){
               $styledSelect.removeClass('active');
               $list.removeClass('active');
            } else {
                $styledSelect.addClass('active');
                $list.addClass('active');
            }

            e.stopPropagation();
        });

        // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
        // Updates the select element to have the value of the equivalent option
        $listItems.click(function (e) {
            if($(this).attr('rel') == 'custom_range') return false;
            e.stopPropagation();
            $styledSelect.removeClass('active');
            $styledSelectInput.text($(this).text());
            $this.val($(this).attr('rel'));
            $list.removeClass('active');
            // $list.hide();
            /* alert($this.val()); Uncomment this for demonstration! */
        });

        // Hides the unordered list when clicking outside of it
        $(document).click(function () {
            $styledSelect.removeClass('active');
            $list.removeClass('active');
        });

        // $this.trigger( "loaded" );
    }

    Plugin.prototype.init = function () {
    	if($(this.element).is("select")) {
    		this.CustomSelect();
		} else if($(this.element).attr('type') == 'checkbox') {
    		this.customCheckBox();
		} else if($(this.element).is("radio")) {
    		this.customRadioBox();
		} else if($(this.element).is("input[type='file']")) {
    		this.customFile();
		}
    };

   
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, 
                new Plugin( this, options ));
            }
        });
    }

})( jQuery, window, document );

