var SliderWidget = ( function () {

	var _insertValues = function ($this) {
		var container = $this.closest('.filter__slider')
			from = container.find('.filter__slider-input_from'),
			to 	 = container.find('.filter__slider-input_to'),
			values = $this.slider('option', 'values');

		from.val(values[0]);
		to.val(values[1]);
	};

	var _moveSlider = function (e) {
		console.log(e.val());
		//console.log('moved');
	};

	return {
		init: function () {

			var Slider = $(".filter__slider-element"),
				sliderFrom = $('.filter__slider-input_from');
				sliderTo = $('.filter__slider-input_to');

			Slider.each(function () {
				var $this = $(this),
					min = parseInt($this.data('min')),
					max = parseInt($this.data('max'));

				$this.slider({
				    range: true,
				    min: min,
				    max: max,
				    values: [ min, max ],
			        slide: function() {
			        	_insertValues($this);
			      	},
			      	create: function () {
			      		_insertValues($this);
			      	}
			    });
			});

			//sliderFrom.change(_moveSlider(sliderFrom));
			//sliderTo.change(_moveSlider(sliderTo);

		}
	}
}());

var RatingsWidget = ( function () {

	var _makeStars = function (rating) {
		var starsArray = [];
		
		for (var i = 0; i < 5; i++) {
			var starClass = (i < rating) ? 'products__rating-stars-item products__rating-stars-item-filled' : 'products__rating-stars-item',
				star = $('<li>', {
					class : starClass
				});
			starsArray.push(star);
		}

		return starsArray;
	}

	var _generateStarsMarkup = function (rating, elementToAppend) {
		var
			StarsList = $('<ul>', {
				class : 'products__rating-stars',
				html : _makeStars(rating)
			});

		var
			ratingDisplay = $('<div>', {
				class : 'products__rating-amount',
				text : rating
			});

		elementToAppend.append([StarsList, ratingDisplay]);
	}

	var _setUpListeners = function () {
		$('.userConnection__button').on('click', _showPopup);
		$('.city__select').on('change', _changeCity);
	};

	return {
		init: function () {
			$('.products__rating').each(function () {
				var $this = $(this),
					rating = parseInt($this.data('rating'));

				_generateStarsMarkup(rating, $this);

			});
		}
	}
}());

var AccaWidget = ( function () {

	var _setUpListeners = function () {
		$('.filter__title-link').on('click', _triggerAcca);
	};

	var _triggerAcca = function (e) {
		e.preventDefault();

		var trigger = $(this),
			item = trigger.closest('.filter__item'),
			list = trigger.closest('.filter__list'),/* нужна для корректной работы в случае несколких аккордеонов */
			items = list.find('.filter__item'),
			content = item.find('.filter__content'),
			otherContent = list.find('.filter__content'),
			duration = 300;

		if (!item.hasClass('active')) {
			//items.removeClass('active');
			item.addClass('active');
			//otherContent.stop(true).slideUp(duration);
			content.stop(true).slideDown(duration);
		}
		else {
			item.removeClass('active');
			//otherContent.stop(true).slideUp(duration);
			content.stop(true).slideUp(duration);
		}
	}

	return {
		init: function () {
			_setUpListeners();
		}
	}
}());

var productsWidget = ( function () {

	var _setUpListeners = function () {
		$('.sort__view-link').on('click', _changeView);
	};

	var _changeView = function (e) {
		e.preventDefault();

		var trigger = $(this),
			item = trigger.closest('.sort__view-item'),
			items = $('.sort__view-item'),
			list = $('.products__list'),
			viewClass = 'products__list-' + trigger.data('view'),
			duration = 600;

		items.removeClass('active');
		item.addClass('active');

		if (!list.hasClass(viewClass)) {
			list
				.removeClass('products__list-rows')
				.removeClass('products__list-lines')
				.removeClass('products__list-grids')
				.addClass(viewClass);
		}
	}

	return {
		init: function () {
			_setUpListeners();
		}
	}
}());

var resetWidget = ( function () {

	var _setUpListeners = function () {
		$('.filter__reset').on('click', _resetFilter);
	};

	var _resetFilter = function (e) {
		e.preventDefault();

		var trigger = $(this),
			block = trigger.closest('.filter__item'),
			checkboxes = block.find('input:checkbox');

			checkboxes.each(function () {
				$(this).removeProp('checked');
			});
	}

	return {
		init: function () {
			_setUpListeners();
		}
	}
}());

var slideshowWidget = ( function () {

	var _setUpListeners = function () {
		$('.products__slideshow-link').on('click', _changeSlide);
	};

	var _changeSlide = function (e) {
		e.preventDefault();

		var trigger = $(this),
			img = trigger.find('.products__slideshow-list-img'),
			path = img.data('src'),
			item = trigger.closest('.products__slideshow-item'),
			block = trigger.closest('.products__slideshow'),
			items = block.find('.products__slideshow-item'),
			display = block.find('.products__slideshow-display'),
			slide = display.find('.products__slideshow-img');

			if (!item.hasClass('active')) {
				items.removeClass('active');
				item.addClass('active');
				slide.fadeOut('400', function() {
					slide.attr('src', path).fadeIn();
				});
			}
		
	}

	return {
		init: function () {
			_setUpListeners();
		}
	}
}());

$(document).ready( function () {

	if ($( ".filter__slider-element" ).length) {
		SliderWidget.init();
	}

	if ($( ".products__rating" ).length) {
		RatingsWidget.init();
	}

	if ($( ".filter__list" ).length) {
		AccaWidget.init();
	}

	if ($( ".sort__select-elem").length) {
		$( ".sort__select-elem").select2({
			minimumResultsForSearch: Infinity
		});
	}

	if ($('.products__list').length) {
		productsWidget.init();
	}

	if ($('.filter__reset').length) {
		resetWidget.init();
	}

	if ($('.products__slideshow').length) {
		slideshowWidget.init();
	}

	$('.attention__text').columnize({
		width: 500
	});
	
});