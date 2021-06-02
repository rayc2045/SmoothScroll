'use strict';
// 10/31/2017
var SmoothScroll /** @class */ = (function() {
	function SmoothScroll(options) {
		var _this = this;
		this.endThreshold = 0.05;
		this.requestId = null;
		this.maxDepth = 10;
		this.viewHeight = 0;
		this.halfViewHeight = 0;
		this.maxDistance = 0;
		this.scrollHeight = 0;
		this.endScroll = 0;
		this.currentScroll = 0;
		this.resizeRequest = 1;
		this.scrollRequest = 0;
		this.scrollItems = [];
		this.lastTime = -1;
		this.maxElapsedMS = 100;
		this.targetFPMS = 0.06;
		this._onResize = function(event) {
			_this.resizeRequest++;
			if (!_this.requestId) {
				_this.lastTime = performance.now();
				_this.requestId = requestAnimationFrame(_this._update);
			}
		};
		this._onScroll = function(event) {
			_this.scrollRequest++;
			if (!_this.requestId) {
				_this.lastTime = performance.now();
				_this.requestId = requestAnimationFrame(_this._update);
			}
		};
		this._update = function(currentTime) {
			if (currentTime === void 0) {
				currentTime = performance.now();
			}
			var elapsedMS = currentTime - _this.lastTime;
			if (elapsedMS > _this.maxElapsedMS) {
				elapsedMS = _this.maxElapsedMS;
			}
			var deltaTime = elapsedMS * _this.targetFPMS;
			var dt = 1 - Math.pow(1 - _this.scrollEase, deltaTime);
			var resized = _this.resizeRequest > 0;
			var scrollY = window.pageYOffset;
			if (resized) {
				var height = _this.target.clientHeight;
				document.body.style.height = height + 'px';
				_this.scrollHeight = height;
				_this.viewHeight = window.innerHeight;
				_this.halfViewHeight = _this.viewHeight / 2;
				_this.maxDistance = _this.viewHeight * 2;
				_this.resizeRequest = 0;
			}
			_this.endScroll = scrollY;
			// this.currentScroll += (scrollY - this.currentScroll) * this.scrollEase;
			_this.currentScroll += (scrollY - _this.currentScroll) * dt;
			if (Math.abs(scrollY - _this.currentScroll) < _this.endThreshold || resized) {
				_this.currentScroll = scrollY;
				_this.scrollRequest = 0;
			}
			// const scrollOrigin = scrollY + this.halfViewHeight;
			var scrollOrigin = _this.currentScroll + _this.halfViewHeight;
			_this.target.style.transform = 'translate3d(0px,-' + _this.currentScroll + 'px,0px)';
			for (var i = 0; i < _this.scrollItems.length; i++) {
				var item = _this.scrollItems[i];
				var distance = scrollOrigin - item.top;
				var offsetRatio = distance / _this.maxDistance;
				item.endOffset = Math.round(_this.maxOffset * item.depthRatio * offsetRatio);
				if (Math.abs(item.endOffset - item.currentOffset < _this.endThreshold)) {
					item.currentOffset = item.endOffset;
				} else {
					// item.currentOffset += (item.endOffset - item.currentOffset) * this.scrollEase;
					item.currentOffset += (item.endOffset - item.currentOffset) * dt;
				}
				item.target.style.transform = 'translate3d(0px,-' + item.currentOffset + 'px,0px)';
			}
			_this.lastTime = currentTime;
			_this.requestId = _this.scrollRequest > 0 ? requestAnimationFrame(_this._update) : null;
		};
		this.target = options.target;
		this.scrollEase = options.scrollEase != null ? options.scrollEase : 0.1;
		this.maxOffset = options.maxOffset != null ? options.maxOffset : 500;
		this.addItems();
		window.addEventListener('resize', this._onResize);
		window.addEventListener('scroll', this._onScroll);
		this._update();
	}
	SmoothScroll.prototype.addItems = function() {
		this.scrollItems = [];
		var elements = document.querySelectorAll('*[data-depth]');
		for (var i = 0; i < elements.length; i++) {
			var element = elements[i];
			var depth = +element.getAttribute('data-depth');
			var rect = element.getBoundingClientRect();
			var item = {
				target: element,
				depth: depth,
				top: rect.top + window.pageYOffset,
				depthRatio: depth / this.maxDepth,
				currentOffset: 0,
				endOffset: 0
			};
			this.scrollItems.push(item);
		}
		return this;
	};
	return SmoothScroll;
})();
