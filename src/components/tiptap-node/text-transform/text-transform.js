import { Mark, mergeAttributes } from '@tiptap/core';

export const TextTransform = Mark.create({
  name: 'textTransform',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      transform: {
        default: null,
        parseHTML: element => element.style.textTransform || null,
        renderHTML: attributes => {
          if (!attributes.transform) {
            return {};
          }
          return {
            style: `text-transform: ${attributes.transform}`,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        style: 'text-transform',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      setTextTransform: transform => ({ commands }) => {
        return commands.setMark(this.name, { transform });
      },
      unsetTextTransform: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      },
      toggleTextTransform: transform => ({ commands, editor }) => {
        if (editor.isActive(this.name, { transform })) {
          return commands.unsetMark(this.name);
        }
        return commands.setMark(this.name, { transform });
      },
    };
  },
});
