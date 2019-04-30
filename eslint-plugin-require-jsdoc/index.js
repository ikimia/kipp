const Components = require("eslint-plugin-react/lib/util/Components");

const checkJsDoc = (context, node) => {
  const jsDocNode = context.getSourceCode().getJSDocComment(node);

  if (jsDocNode || !node.params.length) {
    return;
  }

  context.report({
    messageId: "missingJsDoc",
    node,
    data: {
      name:
        node.type === "FunctionDeclaration" ? `'${node.id.name}'` : "Component"
    }
  });
};

module.exports.rules = {
  "react-components": {
    create: Components.detect((context, components) => ({
      "Program:exit": () => {
        Object.values(components.list()).forEach(component => {
          checkJsDoc(context, component.node);
        });
      }
    })),

    meta: {
      doc: {
        category: "Stylistic Issues",
        description: "Require JSDoc comments",
        recommended: "true",
        url: "https://github.com/gajus/eslint-plugin-jsdoc"
      },

      messages: {
        missingJsDoc: "{{name}} is missing JSDoc comment."
      },

      schema: [],

      type: "suggestion"
    }
  }
};
