/**
 * @fileoverview Directives should not mutate external scope
 * @author Carlos Rincones
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Directives should not mutate external scope",
      category: "angularjs",
      recommended: false,
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ],
  },

  create: function (context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      // give me methods
      Identifier: function (node) {
        if (node.name === "$scope" && node.parent.property) {
          var scopeProperties = context.getScope().upper.upper.block.body
            .body[0].argument.properties;
          var scopeObject = scopeProperties.filter(function (value) {
            return value.key.name === "scope";
          })[0];
          var directiveScope = scopeObject.value.properties.map(function (
            property
          ) {
            return property.key.name;
          });
          var $scopePropName = node.parent.property.name;
          var propInScope = directiveScope.indexOf($scopePropName) > -1;

          if (!propInScope)
            context.report({
              node: node,
              message:
                "Do not mutate $scope properties defined outside this directive",
            });
        }
      },
    };
  },
};
