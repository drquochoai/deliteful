/**
 * SidePane functional tests
 */
define(["intern!object",
    "intern/dojo/node!leadfoot/helpers/pollUntil",
	"intern/chai!assert",
	"require"
], function (registerSuite, pollUntil, assert, require) {
	registerSuite({
		name: "SidePane",
		"init": function () {
			var remote = this.remote;
			return loadTestPage(remote, "./SidePane.html").sleep(50);
		},
		"test initial state": function () {
			var remote = this.remote;
			var element = remote.findById("sp");
			var test = element.getAttribute("class").then(function (classString) {
				checkCssClasses(classString, "d-side-pane", "-d-side-pane-push", "-d-side-pane-start",
					"-d-side-pane-hidden", "-d-side-pane-animate");
			});
			test = test.then(isVisible(element, false));

			return test;
		// Interactions tests are broken on Mac and iOS simulators. See #25
		},
		"test opening": function () {
			if (/safari|iPhone|iPad/.test(this.remote.environmentType.browserName)
				|| this.remote.environmentType.safari) {
				console.log("Skipping test '" + this.parent.name + ": " + this.name + "' on this platform");
				return this.remote.end();
			}
			return this.remote.findById("showButton").click().end()
				.sleep(800)
				.then(isVisible(this.remote.findById("sp"), true));
		},
		"test closing": function () {
			if (/safari|iPhone|iPad/.test(this.remote.environmentType.browserName)
				|| this.remote.environmentType.safari) {
				console.log("Skipping test '" + this.parent.name + ": " + this.name + "' on this platform");
				return this.remote.end();
			}
			return this.remote.findById("hideButton").click().end()
				.sleep(800)
				.then(isVisible(this.remote.findById("sp"), false));
		}/*,
		"test swipe closing": function () {
			if (/safari|iPhone|iPad/.test(this.remote.environmentType.browserName)
				|| this.remote.environmentType.safari) {
				console.log("Skipping test '" + this.parent.name + ": " + this.name + "' on this platform");
				return this.remote.end();
			}
			return this.remote.findById("showButton").click().end().sleep(800)
				.findById("page").moveMouseTo(30, 300).pressMouseButton().moveMouseTo(10, 300)
				.sleep(800)
				.then(isVisible(this.remote.findById("sp"), false));
		}*/
	});

	function checkCssClasses(classString, args) {
		args = Array.prototype.slice.call(arguments);
		args.shift();
		var nodeClasses = classString.split(" ");
		var cls;
		while (args.length > 0) {
			cls = args.shift();
			assert.isTrue(nodeClasses.indexOf(cls) !== -1,
					"SidePane should contains the class " + cls);
		}
	}

	function isVisible(element, v) {
		var errMsg = "SidePane should be" + (v ? " ":" not ") + "visible";
		element.getComputedStyle("display").then(function (value) {
			assert.isTrue(value === (v ? "block" : "none"), errMsg);
		});
		element.getComputedStyle("visibility").then(function (value) {
			assert.isTrue(value === (v ? "visible" : "hidden"), errMsg);
		});
		element.getAttribute("class").then(function (classString) {
			checkCssClasses(classString, v ? "-d-side-pane-visible" : "-d-side-pane-hidden");
		});
	}

	function loadTestPage(remote, url) {
		return remote
			.get(require.toUrl(url))
			.then(pollUntil("return ('ready' in window &&  ready) ? true : null", [], 10000, 1000))
			.then(function () {
				return remote.end();
			});
	}
});
