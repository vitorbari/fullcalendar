

$.fn.fullCalendarDraggable = function(options) {

	var validRevertDuration = options.validRevertDuration;
	if (validRevertDuration == undefined) {
		validRevertDuration = 0;
	}
	
	if (!options.helper || options.helper == 'original') {
		options.helper = 'clone';
	}

	this.each(function() {
	
		var _element = this,
			element = $(_element),
			origRevertDuration;
			
		element
			.draggable(options)
			.bind('dragstart', function(ev, ui) {
				element.css('visibility', 'hidden');
				$.each(fc.instances, function() {
					this.fullCalendar('trigger', 'eventDragStart', null, ui.helper, ev, ui);
				});
				origRevertDuration = element.draggable('option', 'revertDuration') || 500;
			})
			.bind('drag', function(ev, ui) {
				var res;
				$.each(fc.instances, function() {
					res = this.fullCalendar('trigger', 'eventDrag', null, ui.helper, ev, ui) || res;
				});
				element.draggable('option', 'revertDuration', res ? validRevertDuration : origRevertDuration);
			})
			.bind('dragstop', function(ev, ui) {
				var res;
				$.each(fc.instances, function() {
					res = this.fullCalendar('trigger', 'eventDragStop', null, ui.helper, ev, ui) || res;
				});
				if (res && options.dayDrop) {
					options.dayDrop.call(_element, res[0], res[1], ev, ui);
				}
				element.css('visibility', '');
			});
	
	});
	
	return this;

};
