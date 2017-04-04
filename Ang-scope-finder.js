((document, angular) => {
    let scopesObj = {};

    window.console.time('Scoping');

    Array.prototype.slice.call(document.querySelectorAll('*')).forEach(DOMElement => {
        let scope = angular.element(DOMElement).scope();

        if (scope && !scopesObj[scope.$id]) {
            scopesObj[scope.$id] = {
                domElm: DOMElement,
                scope: scope,
                watchers: (function (watchers) {
                    let w = [];

                    watchers && watchers.forEach(watch => {
                        w.push({
                            expression: watch.exp,
                            lastValue: watch.last
                        });
                    });

                    return w;
                }(scope.$$watchers))
            };
        }
    });

    window.console.info(Object.keys(scopesObj).length + ' scopes found.');

    window.console.timeEnd('Scoping');

    return scopesObj;

})(window.document, window.angular);
