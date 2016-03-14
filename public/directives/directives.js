(function(){
  angular.module('foodApp').directive('removeOnClick', ['FetchData',function(fetchData) {
      return {
          link: function(scope, elt, attrs) {
              scope.remove = function(issue) {
                  var id = issue._id;
                  fetchData.getData({
                    url : '/api/issues/'+id,
                    method: 'DELETE'
                  }).then(function(data){
                    console.log(data);
                    //elt.html('');
                    elt.remove();
                  });
              };
          }
      }
  }]);

  /*
  * angular-ui-bootstrap
  * http://angular-ui.github.io/bootstrap/

  * Version: 1.2.1 - 2016-02-27
  * License: MIT
  /*
   * angular-ui-bootstrap
   * http://angular-ui.github.io/bootstrap/

   * Version: 1.2.1 - 2016-02-27
   * License: MIT
   */angular.module("ui.bootstrap", ["ui.bootstrap.tpls","ui.bootstrap.accordion","ui.bootstrap.collapse","ui.bootstrap.alert"]);
  angular.module("ui.bootstrap.tpls", ["uib/template/accordion/accordion-group.html","uib/template/accordion/accordion.html","uib/template/alert/alert.html"]);
  angular.module('ui.bootstrap.accordion', ['ui.bootstrap.collapse'])

  .constant('uibAccordionConfig', {
    closeOthers: true
  })

  .controller('UibAccordionController', ['$scope', '$attrs', 'uibAccordionConfig', function($scope, $attrs, accordionConfig) {
    // This array keeps track of the accordion groups
    this.groups = [];

    // Ensure that all the groups in this accordion are closed, unless close-others explicitly says not to
    this.closeOthers = function(openGroup) {
      var closeOthers = angular.isDefined($attrs.closeOthers) ?
        $scope.$eval($attrs.closeOthers) : accordionConfig.closeOthers;
      if (closeOthers) {
        angular.forEach(this.groups, function(group) {
          if (group !== openGroup) {
            group.isOpen = false;
          }
        });
      }
    };

    // This is called from the accordion-group directive to add itself to the accordion
    this.addGroup = function(groupScope) {
      var that = this;
      this.groups.push(groupScope);

      groupScope.$on('$destroy', function(event) {
        that.removeGroup(groupScope);
      });
    };

    // This is called from the accordion-group directive when to remove itself
    this.removeGroup = function(group) {
      var index = this.groups.indexOf(group);
      if (index !== -1) {
        this.groups.splice(index, 1);
      }
    };
  }])

  // The accordion directive simply sets up the directive controller
  // and adds an accordion CSS class to itself element.
  .directive('uibAccordion', function() {
    return {
      controller: 'UibAccordionController',
      controllerAs: 'accordion',
      transclude: true,
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'uib/template/accordion/accordion.html';
      }
    };
  })

  // The accordion-group directive indicates a block of html that will expand and collapse in an accordion
  .directive('uibAccordionGroup', function() {
    return {
      require: '^uibAccordion',         // We need this directive to be inside an accordion
      transclude: true,              // It transcludes the contents of the directive into the template
      replace: true,                // The element containing the directive will be replaced with the template
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'uib/template/accordion/accordion-group.html';
      },
      scope: {
        heading: '@',               // Interpolate the heading attribute onto this scope
        isOpen: '=?',
        isDisabled: '=?',
        listCtrl : '=info',
        issue:'='
      },
      controller: function() {
        this.setHeading = function(element) {
          this.heading = element;
        };
      },
      link: function(scope, element, attrs, accordionCtrl) {
        console.log(scope);
        accordionCtrl.addGroup(scope);

        scope.openClass = attrs.openClass || 'panel-open';
        scope.panelClass = attrs.panelClass || 'panel-default';
        scope.$watch('isOpen', function(value) {
          element.toggleClass(scope.openClass, !!value);
          if (value) {
            accordionCtrl.closeOthers(scope);
          }
        });

        scope.toggleOpen = function($event) {
          console.log('toggleOpen');
          if (!scope.isDisabled) {
            if (!$event || $event.which === 32) {
              scope.isOpen = !scope.isOpen;
            }
          }
        };

        var id = 'accordiongroup-' + scope.$id + '-' + Math.floor(Math.random() * 10000);
        scope.headingId = id + '-tab';
        scope.panelId = id + '-panel';
      }
    };
  })

  // Use accordion-heading below an accordion-group to provide a heading containing HTML
  .directive('uibAccordionHeading', function() {
    return {
      transclude: true,   // Grab the contents to be used as the heading
      template: '',       // In effect remove this element!
      replace: true,
      require: '^uibAccordionGroup',
      link: function(scope, element, attrs, accordionGroupCtrl, transclude) {
        // Pass the heading to the accordion-group controller
        // so that it can be transcluded into the right place in the template
        // [The second parameter to transclude causes the elements to be cloned so that they work in ng-repeat]
        accordionGroupCtrl.setHeading(transclude(scope, angular.noop));
      }
    };
  })

  // Use in the accordion-group template to indicate where you want the heading to be transcluded
  // You must provide the property on the accordion-group controller that will hold the transcluded element
  .directive('uibAccordionTransclude', function() {
    return {
      require: '^uibAccordionGroup',
      link: function(scope, element, attrs, controller) {
        scope.$watch(function() { return controller[attrs.uibAccordionTransclude]; }, function(heading) {
          if (heading) {
            var elem = angular.element(element[0].querySelector('[uib-accordion-header]'));
            elem.html('');
            elem.append(heading);
          }
        });
      }
    };
  });

  angular.module('ui.bootstrap.collapse', [])

    .directive('uibCollapse', ['$animate', '$q', '$parse', '$injector', function($animate, $q, $parse, $injector) {
      var $animateCss = $injector.has('$animateCss') ? $injector.get('$animateCss') : null;
      return {
        link: function(scope, element, attrs) {
          var expandingExpr = $parse(attrs.expanding),
              expandedExpr = $parse(attrs.expanded),
              collapsingExpr = $parse(attrs.collapsing),
              collapsedExpr = $parse(attrs.collapsed);

          if (!scope.$eval(attrs.uibCollapse)) {
            element.addClass('in')
              .addClass('collapse')
              .attr('aria-expanded', true)
              .attr('aria-hidden', false)
              .css({height: 'auto'});
          }

          function expand() {
            if (element.hasClass('collapse') && element.hasClass('in')) {
              return;
            }

            $q.resolve(expandingExpr(scope))
              .then(function() {
                element.removeClass('collapse')
                  .addClass('collapsing')
                  .attr('aria-expanded', true)
                  .attr('aria-hidden', false);

                if ($animateCss) {
                  $animateCss(element, {
                    addClass: 'in',
                    easing: 'ease',
                    to: { height: element[0].scrollHeight + 'px' }
                  }).start()['finally'](expandDone);
                } else {
                  $animate.addClass(element, 'in', {
                    to: { height: element[0].scrollHeight + 'px' }
                  }).then(expandDone);
                }
              });
          }

          function expandDone() {
            element.removeClass('collapsing')
              .addClass('collapse')
              .css({height: 'auto'});
            expandedExpr(scope);
          }

          function collapse() {
            if (!element.hasClass('collapse') && !element.hasClass('in')) {
              return collapseDone();
            }

            $q.resolve(collapsingExpr(scope))
              .then(function() {
                element
                  // IMPORTANT: The height must be set before adding "collapsing" class.
                  // Otherwise, the browser attempts to animate from height 0 (in
                  // collapsing class) to the given height here.
                  .css({height: element[0].scrollHeight + 'px'})
                  // initially all panel collapse have the collapse class, this removal
                  // prevents the animation from jumping to collapsed state
                  .removeClass('collapse')
                  .addClass('collapsing')
                  .attr('aria-expanded', false)
                  .attr('aria-hidden', true);

                if ($animateCss) {
                  $animateCss(element, {
                    removeClass: 'in',
                    to: {height: '0'}
                  }).start()['finally'](collapseDone);
                } else {
                  $animate.removeClass(element, 'in', {
                    to: {height: '0'}
                  }).then(collapseDone);
                }
              });
          }

          function collapseDone() {
            element.css({height: '0'}); // Required so that collapse works when animation is disabled
            element.removeClass('collapsing')
              .addClass('collapse');
            collapsedExpr(scope);
          }

          scope.$watch(attrs.uibCollapse, function(shouldCollapse) {
            if (shouldCollapse) {
              collapse();
            } else {
              expand();
            }
          });
        }
      };
    }]);

  angular.module('ui.bootstrap.alert', [])

  .controller('UibAlertController', ['$scope', '$attrs', '$interpolate', '$timeout', function($scope, $attrs, $interpolate, $timeout) {
    $scope.closeable = !!$attrs.close;

    var dismissOnTimeout = angular.isDefined($attrs.dismissOnTimeout) ?
      $interpolate($attrs.dismissOnTimeout)($scope.$parent) : null;

    if (dismissOnTimeout) {
      $timeout(function() {
        $scope.close();
      }, parseInt(dismissOnTimeout, 10));
    }
  }])

  .directive('uibAlert', function() {
    return {
      controller: 'UibAlertController',
      controllerAs: 'alert',
      templateUrl: function(element, attrs) {
        return attrs.templateUrl || 'uib/template/alert/alert.html';
      },
      transclude: true,
      replace: true,
      scope: {
        type: '@',
        close: '&'
      }
    };
  });

  angular.module("uib/template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/accordion/accordion-group.html",
      "<div class=\"panel\" ng-class=\"panelClass || 'panel-default'\">\n" +
      "  <div role=\"tab\" id=\"{{::headingId}}\" aria-selected=\"{{isOpen}}\" class=\"panel-heading\">\n" +
      "    <h4 class=\"panel-title\"  ng-hide=\"listCtrl.editorEnabled[issue._id]\">\n" +
      "      <a role=\"button\" href aria-expanded=\"{{isOpen}}\" aria-controls=\"{{::panelId}}\" tabindex=\"0\" class=\"accordion-toggle\" ng-click=\"toggleOpen()\" uib-accordion-transclude=\"heading\"><span uib-accordion-header ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
      "    </h4>\n" +
      "<div ng-show=\"listCtrl.editorEnabled[issue._id]\" style=\"height:32px;\">\n"+
      			"<input style=\"float:left;height:34px;margin-right:15px;\" ng-model=\"issue.name\">\n"+
      				"</div>"+
      "  </div>\n" +
      "  <div id=\"{{::panelId}}\" aria-labelledby=\"{{::headingId}}\" aria-hidden=\"{{!isOpen}}\" role=\"tabpanel\" class=\"panel-collapse collapse\" uib-collapse=\"!isOpen\">\n" +
      "    <div class=\"panel-body\" ng-transclude></div>\n" +
      "  </div>\n" +
      "</div>\n" +
      "");
  }]);

  angular.module("uib/template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/accordion/accordion.html",
      "<div role=\"tablist\" class=\"panel-group\" ng-transclude></div>");
  }]);

  angular.module("uib/template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
    $templateCache.put("uib/template/alert/alert.html",
      "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissible' : null]\" role=\"alert\">\n" +
      "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close({$event: $event})\">\n" +
      "        <span aria-hidden=\"true\">&times;</span>\n" +
      "        <span class=\"sr-only\">Close</span>\n" +
      "    </button>\n" +
      "    <div ng-transclude></div>\n" +
      "</div>\n" +
      "");
  }]);


})();