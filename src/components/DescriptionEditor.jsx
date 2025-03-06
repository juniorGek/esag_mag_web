
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import CodeBlock from "@tiptap/extension-code-block";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import TextAlign from "@tiptap/extension-text-align";
import { Extension } from "@tiptap/core";
import { useEffect } from "react";

// Extension pour la police de caractères
const FontFamily = Extension.create({
  name: "fontFamily",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontFamily: {
            default: null,
            parseHTML: (element) =>
              element.style.fontFamily?.replace(/['"]/g, ""),
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) return {};
              return { style: `font-family: ${attributes.fontFamily}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontFamily:
        (fontFamily) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontFamily }).run(),
      unsetFontFamily:
        () =>
        ({ chain }) =>
          chain().unsetMark("textStyle", { fontFamily: null }).run(),
    };
  },
});

// Extension pour la taille de police
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return { types: ["textStyle"] };
  },
  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      setFontSize:
        (fontSize) =>
        ({ chain }) =>
          chain().setMark("textStyle", { fontSize }).run(),
      unsetFontSize:
        () =>
        ({ chain }) =>
          chain().unsetMark("textStyle", { fontSize: null }).run(),
    };
  },
});

const DescriptionEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Color.configure({ types: ["textStyle"] }),
      TextStyle,
      Image.configure({ inline: true }),
      Link.configure({ openOnClick: false }),
      Underline,
      Strike,
      Blockquote,
      Code,
      CodeBlock,
      HorizontalRule,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
      FontFamily,
      FontSize,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  // Fonctions de la barre d'outils
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleHeading1 = () =>
    editor?.chain().focus().toggleHeading({ level: 1 }).setFontSize("32px").run();
  const toggleHeading2 = () =>
    editor?.chain().focus().toggleHeading({ level: 2 }).setFontSize("24px").run();
  const toggleBulletList = () =>
    editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () =>
    editor?.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () =>
    editor?.chain().focus().toggleBlockquote().run();
  const toggleCode = () => editor?.chain().focus().toggleCode().run();
  const toggleCodeBlock = () =>
    editor?.chain().focus().toggleCodeBlock().run();
  const addHorizontalRule = () =>
    editor?.chain().focus().setHorizontalRule().run();

  const setTextColor = (color) =>
    editor?.chain().focus().setColor(color).run();
  const setFontSizeHandler = (size) =>
    editor?.chain().focus().setFontSize(`${size}px`).run();
  const unsetFontSizeHandler = () =>
    editor?.chain().focus().unsetFontSize().run();
  const setFontFamilyHandler = (font) =>
    editor?.chain().focus().setFontFamily(font).run();

  const addImage = () => {
    const url = prompt("Entrez l'URL de l'image");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };
  const setLink = () => {
    const url = prompt("Entrez l'URL du lien");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };
  const unsetLink = () => editor?.chain().focus().unsetLink().run();

  const setTextAlign = (align) =>
    editor?.chain().focus().setTextAlign(align).run();
  const undo = () => editor?.chain().focus().undo().run();
  const redo = () => editor?.chain().focus().redo().run();

  // Options pour les dropdowns
  const colors = [
    { name: "Noir", value: "#000000" },
    { name: "Rouge", value: "#ff0000" },
    { name: "Vert", value: "#00ff00" },
    { name: "Bleu", value: "#0000ff" },
    { name: "Jaune", value: "#ffff00" },
    { name: "Violet", value: "#FF00F7" },
  ];
  const fontSizes = [12, 14, 16, 18, 20, 24, 32];
  const fontFamilies = ["Arial", "Times New Roman", "Courier New", "Georgia", "Verdana"];

  return (
    <div className="description-editor">
      <div className="toolbar flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-200">
        <button type="button" onClick={toggleBold} className="p-1 rounded hover:bg-green-200" title="Gras">
          <strong>B</strong>
        </button>
        <button type="button" onClick={toggleItalic} className="p-1 rounded hover:bg-green-200" title="Italique">
          <em>I</em>
        </button>
        <button type="button" onClick={toggleUnderline} className="p-1 rounded hover:bg-green-200" title="Souligner">
          <u>U</u>
        </button>
        <button type="button" onClick={toggleStrike} className="p-1 rounded hover:bg-green-200" title="Barré">
          <s>S</s>
        </button>
        <button type="button" onClick={toggleHeading1} className="p-1 rounded hover:bg-green-200" title="Titre 1 (32px)">
          H1
        </button>
        <button type="button" onClick={toggleHeading2} className="p-1 rounded hover:bg-green-200" title="Titre 2 (24px)">
          H2
        </button>
        <button type="button" onClick={toggleBulletList} className="p-1 rounded hover:bg-green-200" title="Liste à puces">
          •
        </button>
        <button type="button" onClick={toggleOrderedList} className="p-1 rounded hover:bg-green-200" title="Liste numérotée">
          1.
        </button>
        <button type="button" onClick={toggleBlockquote} className="p-1 rounded hover:bg-green-200" title="Citation">
          &quot;
        </button>
        <button type="button" onClick={toggleCode} className="p-1 rounded hover:bg-green-200" title="Code inline">
          <code>{'<'}</code>
        </button>
        <button type="button" onClick={toggleCodeBlock} className="p-1 rounded hover:bg-green-200" title="Bloc de code">
          {"</>"}
        </button>
        <button type="button" onClick={addHorizontalRule} className="p-1 rounded hover:bg-green-200" title="Ligne horizontale">
          —
        </button>
        <select onChange={(e) => setTextColor(e.target.value)} className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm" title="Couleur">
          <option value="">Couleur</option>
          {colors.map((color) => (
            <option key={color.value} value={color.value}>
              {color.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setFontSizeHandler(e.target.value)} className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm" title="Taille">
          <option value="">Taille</option>
          {fontSizes.map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
        <button type="button" onClick={unsetFontSizeHandler} className="p-1 rounded hover:bg-green-200" title="Effacer taille">
          T<span style={{ fontSize: "10px" }}>x</span>
        </button>
        <select onChange={(e) => setFontFamilyHandler(e.target.value)} className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm" title="Police">
          <option value="">Police</option>
          {fontFamilies.map((font) => (
            <option key={font} value={font}>
              {font}
            </option>
          ))}
        </select>
        <button type="button" onClick={addImage} className="p-1 rounded hover:bg-green-200" title="Ajouter image">
          🖼️
        </button>
        <button type="button" onClick={setLink} className="p-1 rounded hover:bg-green-200" title="Ajouter lien">
          🔗
        </button>
        <button type="button" onClick={unsetLink} className="p-1 rounded hover:bg-green-200" title="Supprimer lien" disabled={!editor?.isActive("link")}>
          ⛓️‍💥
        </button>
        <button type="button" onClick={() => setTextAlign("left")} className="p-1 rounded hover:bg-green-200" title="Aligner à gauche">
          ←
        </button>
        <button type="button" onClick={() => setTextAlign("center")} className="p-1 rounded hover:bg-green-200" title="Centrer">
          ↔
        </button>
        <button type="button" onClick={() => setTextAlign("right")} className="p-1 rounded hover:bg-green-200" title="Aligner à droite">
          →
        </button>
        <button type="button" onClick={undo} className="p-1 rounded hover:bg-green-200" title="Annuler">
          ↺
        </button>
        <button type="button" onClick={redo} className="p-1 rounded hover:bg-green-200" title="Rétablir">
          ↻
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-green-500 rounded-b-lg bg-white text-gray-800 border-t border-gray-200"
        placeholder="Détails et informations clés..."
      />
    </div>
  );
};

export default DescriptionEditor;
