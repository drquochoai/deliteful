define([
	"intern!object",
	"intern/chai!assert",
	"dojo/dom-geometry",
	"dojo/dom-class",
	"delite/register",
	"deliteful/ViewStack",
	"delite/css!deliteful/ViewStack/transitions/cover.css",
	"delite/css!deliteful/ViewStack/transitions/coverv.css",
	"delite/css!deliteful/ViewStack/transitions/fade.css",
	"delite/css!deliteful/ViewStack/transitions/flip.css",
	"delite/css!deliteful/ViewStack/transitions/slidev.css",
	"delite/css!deliteful/ViewStack/transitions/revealv.css"
], function (registerSuite, assert, domGeom, domClass, register) {
	var container, node;
	var aaa, bbb, ccc, ddd;
	var asyncHandler;
	var htmlContent = "<d-view-stack id='vs'><div id='aaa'>AAA</div><div id='bbb'>BBB</div><div id='ccc'>CCC</div>" +
		"<div id='ddd'>DDD</div></d-view-stack>";

	function checkNodeVisibility(vs, target) {
		for (var i = 0; i < vs.children.length; i++) {
			assert.isTrue(
				((vs.children[i] === target && vs.children[i].style.display !== "none" &&
					vs.selectedChildId === target.id)) ||
					(vs.children[i] !== target && vs.children[i].style.display === "none")
			);
		}
	}
	registerSuite({
		name: "ViewStack Markup",
		setup: function () {
			container = document.createElement("div");
			document.body.appendChild(container);
			container.innerHTML = htmlContent;
			register.parse(container);
			node = document.getElementById("vs");
			aaa = document.getElementById("aaa");
			bbb = document.getElementById("bbb");
			ccc = document.getElementById("ccc");
			ddd = document.getElementById("ddd");
		},
		"Default CSS" : function () {
			assert.isTrue(domClass.contains(node, "d-view-stack"));
		},
		"Default values" : function () {
			assert.deepEqual(node.transition, "slide");
			assert.deepEqual(node.reverse, false);
		},
		"Show (by widget)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb);
		},
		"Show (by id)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, aaa);
			}));
			node.show("aaa");
		},
		"Show (no transition)" : function () {
			// Shorter timing if no transition
			var d = this.async(100);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb, {transition: "none"});
		},
		"Show (reverse)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.show(ccc, {reverse: true});
		},
		"Show (reverse, no transition)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ddd);
			}));
			node.show(ddd, {transition: "none", reverse: true});
		},
		"Show (reveal)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, aaa);
			}));
			node.show(aaa, {transition: "reveal", reverse: false});
		},
		"Show (reverse, reveal)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb, {transition: "reveal", reverse: true});
		},
		"Show (flip)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.show(ccc, {transition: "flip", reverse: false});
		},
		"Show (reverse, flip)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ddd);
			}));
			node.show(ddd, {transition: "flip", reverse: true});
		},
		"Show (slidev)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, aaa);
			}));
			node.show(aaa, {transition: "slidev", reverse: false});
		},
		"Show (reverse, slidev)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb, {transition: "slidev", reverse: true});
		},
		"Show (cover)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.show(ccc, {transition: "cover", reverse: false});
		},
		"Show (reverse, cover)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ddd);
			}));
			node.show(ddd, {transition: "cover", reverse: true});
		},
		"Show (coverv)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, aaa);
			}));
			node.show(aaa, {transition: "coverv", reverse: false});
		},
		"Show (reverse, coverv)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb, {transition: "coverv", reverse: true});
		},
		"Show (revealv)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.show(ccc, {transition: "revealv", reverse: false});
		},
		"Show (reverse, revealv)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ddd);
			}));
			node.show(ddd, {transition: "revealv", reverse: true});
		},
		"Show (fade)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.show(ccc, {transition: "fade", reverse: false});
		},
		"Show (reverse, slide)" : function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, bbb);
			}));
			node.show(bbb, {transition: "slide", reverse: true});
		},
		"SelectedChildId Setter": function () {
			var d = this.async(1000);
			asyncHandler = node.on("delite-after-show", d.callback(function () {
				checkNodeVisibility(node, ccc);
			}));
			node.selectedChildId = "ccc";
		},
		teardown: function () {
			container.parentNode.removeChild(container);
		},
		afterEach: function () {
			if (asyncHandler) {
				asyncHandler.remove();
			}
		}
	});
});
