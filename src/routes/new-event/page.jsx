import { useState } from "react";
import { Upload, X, Heading, Heading2, Plus } from "lucide-react";
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

// Extensions personnalisées
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
            parseHTML: (element) => element.style.fontFamily?.replace(/['"]/g, ""),
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

const NewEvent = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    dateEvenement: "",
    lieu: "",
    isPayant: false,
    ticketTypes: [{ type: "", quantite: "", prix: "" }], // Liste dynamique avec un objet par ligne
    dateDebutVente: "",
    dateFinVente: "",
    description: "",
    imageCover: null,
    enabled: false,
  });

  const [preview, setPreview] = useState(null);

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
      TextAlign.configure({ types: ["heading", "paragraph"], alignments: ["left", "center", "right", "justify"] }),
      FontFamily,
      FontSize,
    ],
    content: formData.description,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, description: editor.getHTML() });
    },
  });

  const handleChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name === "isPayant") {
      setFormData({ ...formData, isPayant: value === "payant" });
    } else if (name.startsWith("ticketTypes")) {
      const [ field] = name.split(".");
      const updatedTickets = formData.ticketTypes.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      );
      setFormData({ ...formData, ticketTypes: updatedTickets });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addTicketType = () => {
    if (formData.ticketTypes.length < 4) {
      setFormData({
        ...formData,
        ticketTypes: [...formData.ticketTypes, { type: "", quantite: "", prix: "" }],
      });
    }
  };

  const removeTicketType = (index) => {
    setFormData({
      ...formData,
      ticketTypes: formData.ticketTypes.filter((_, i) => i !== index),
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageCover: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, imageCover: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", formData);
  };

  // Fonctions pour la barre d'outils TipTap
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).setFontSize("32px").run();
  const toggleHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).setFontSize("24px").run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run();
  const toggleCode = () => editor?.chain().focus().toggleCode().run();
  const toggleCodeBlock = () => editor?.chain().focus().toggleCodeBlock().run();
  const addHorizontalRule = () => editor?.chain().focus().setHorizontalRule().run();
  const setTextColor = (color) => editor?.chain().focus().setColor(color).run();
  const setFontSize = (size) => editor?.chain().focus().setFontSize(`${size}px`).run();
  const unsetFontSize = () => editor?.chain().focus().unsetFontSize().run();
  const setFontFamily = (font) => editor?.chain().focus().setFontFamily(font).run();
  const addImage = () => {
    const url = prompt("Entrez l'URL de l'image");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };
  const setLink = () => {
    const url = prompt("Entrez l'URL du lien");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };
  const unsetLink = () => editor?.chain().focus().unsetLink().run();
  const setTextAlign = (align) => editor?.chain().focus().setTextAlign(align).run();
  const undo = () => editor?.chain().focus().undo().run();
  const redo = () => editor?.chain().focus().redo().run();

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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all hover:shadow-3xl">
        {/* Section Image */}
        <div className="relative w-full h-48 bg-gradient-to-r from-green-600 to-gray-800">
          <div
            className={`absolute inset-0 flex items-center justify-center p-4 transition-all duration-300 ${
              preview ? "bg-black/30" : "border-2 border-dashed border-white/60 hover:border-white"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'événement"
                  className="w-full h-full object-cover rounded-t-3xl transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-3 right-3 bg-white/90 rounded-full p-1.5 shadow-md hover:bg-green-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-4 h-4 text-gray-700 hover:text-green-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-2">
                <Upload className="w-10 h-10 mx-auto text-white animate-pulse" />
                <p className="text-white text-base font-medium">
                  Glissez ou{" "}
                  <label className="underline cursor-pointer hover:text-green-200 transition-colors">
                    téléchargez une image
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </p>
                <p className="text-xs text-white/70">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="p-6 sm:p-8 bg-white">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6 bg-gradient-to-r from-green-600 to-gray-800 bg-clip-text text-transparent">
            Créer un nouvel événement
          </h2>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations essentielles */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="titre"
                      value={formData.titre}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Nom de l'événement"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Sous-titre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="sous_titre"
                      value={formData.sous_titre}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Accroche ou thème"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateEvenement"
                      value={formData.dateEvenement}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                      required
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
                <div className="relative group">
                  <label className="absolute top-[-1.25rem] left-3 px-1 text-xs font-medium text-gray-600 bg-white transition-all duration-300 group-focus-within:text-green-600">
                    Lieu
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="lieu"
                      value={formData.lieu}
                      onChange={(e) => handleChange(e)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                      placeholder="Lieu de l'événement"
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarification */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Tarification</h3>
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPayant"
                    value="gratuit"
                    checked={!formData.isPayant}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 transition-all duration-200"
                  />
                  <span className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Gratuit</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="isPayant"
                    value="payant"
                    checked={formData.isPayant}
                    onChange={handleChange}
                    className="w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500 transition-all duration-200"
                  />
                  <span className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Payant</span>
                </label>
              </div>

            {/* Champs conditionnels pour événement payant */}
            {formData.isPayant && (
                <div className="mt-6 space-y-6 bg-gray-50 p-6 rounded-xl shadow-inner animate-fade-in">
                  <h4 className="text-md font-semibold text-gray-700">Types de tickets</h4>
                  {formData.ticketTypes.map((ticket, index) => (
                    <div key={index} className="flex items-center space-x-6">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="relative group">
                          <label className="block text-xs font-medium text-gray-600 mb-2">Type de ticket</label>
                          <input
                            type="text"
                            name={`ticketTypes.type`}
                            value={ticket.type}
                            onChange={(e) => handleChange(e, index)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                            placeholder="Ex: Standard"
                          />
                        </div>
                        <div className="relative group">
                          <label className="block text-xs font-medium text-gray-600 mb-2">Quantité</label>
                          <input
                            type="number"
                            name={`ticketTypes.quantite`}
                            value={ticket.quantite}
                            onChange={(e) => handleChange(e, index)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                            placeholder="Ex: 100"
                            min="0"
                          />
                        </div>
                        <div className="relative group">
                          <label className="block text-xs font-medium text-gray-600 mb-2">Prix</label>
                          <input
                            type="text"
                            name={`ticketTypes.prix`}
                            value={ticket.prix}
                            onChange={(e) => handleChange(e, index)}
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800 placeholder-gray-400"
                            placeholder="Ex: 10€"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        {formData.ticketTypes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTicketType(index)}
                            className="p-2 bg-red-100 rounded-full hover:bg-red-200 transition-all duration-300"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                        {index === formData.ticketTypes.length - 1 && formData.ticketTypes.length < 4 && (
                          <button
                            type="button"
                            onClick={addTicketType}
                            className="p-2 bg-green-100 rounded-full hover:bg-green-200 transition-all duration-300"
                          >
                            <Plus className="w-4 h-4 text-green-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  {formData.ticketTypes.length >= 4 && (
                    <p className="text-sm text-gray-500">Maximum de 4 types de tickets atteint.</p>
                  )}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="relative group">
                      <label className="block text-xs font-medium text-gray-600 mb-2">Début de la vente</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="dateDebutVente"
                          value={formData.dateDebutVente}
                          onChange={(e) => handleChange(e)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                        </span>
                      </div>
                    </div>
                    <div className="relative group">
                      <label className="block text-xs font-medium text-gray-600 mb-2">Fin de la vente</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="dateFinVente"
                          value={formData.dateFinVente}
                          onChange={(e) => handleChange(e)}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md bg-white text-gray-800"
                        />
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Heading2 className="w-4 h-4 text-gray-500 group-focus-within:text-green-600 transition-colors" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Description</h3>
              <div className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                  <button
                    type="button"
                    onClick={toggleBold}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("bold") ? "bg-green-300" : ""}`}
                    title="Gras"
                  >
                    <strong>B</strong>
                  </button>
                  <button
                    type="button"
                    onClick={toggleItalic}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("italic") ? "bg-green-300" : ""}`}
                    title="Italique"
                  >
                    <em>I</em>
                  </button>
                  <button
                    type="button"
                    onClick={toggleUnderline}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("underline") ? "bg-green-300" : ""}`}
                    title="Souligner"
                  >
                    <u>U</u>
                  </button>
                  <button
                    type="button"
                    onClick={toggleStrike}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("strike") ? "bg-green-300" : ""}`}
                    title="Barré"
                  >
                    <s>S</s>
                  </button>
                  <button
                    type="button"
                    onClick={toggleHeading1}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("heading", { level: 1 }) ? "bg-green-300" : ""}`}
                    title="Titre 1 (32px)"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={toggleHeading2}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("heading", { level: 2 }) ? "bg-green-300" : ""}`}
                    title="Titre 2 (24px)"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={toggleBulletList}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("bulletList") ? "bg-green-300" : ""}`}
                    title="Liste à puces"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={toggleOrderedList}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("orderedList") ? "bg-green-300" : ""}`}
                    title="Liste numérotée"
                  >
                    1.
                  </button>
                  <button
                    type="button"
                    onClick={toggleBlockquote}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("blockquote") ? "bg-green-300" : ""}`}
                    title="Citation"
                  >
                    &quot;
                  </button>
                  <button
                    type="button"
                    onClick={toggleCode}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("code") ? "bg-green-300" : ""}`}
                    title="Code inline"
                  >
                    <code>`</code>
                  </button>
                  <button
                    type="button"
                    onClick={toggleCodeBlock}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("codeBlock") ? "bg-green-300" : ""}`}
                    title="Bloc de code"
                  >
                  &lt;/&gt;
                  </button>
                  <button
                    type="button"
                    onClick={addHorizontalRule}
                    className="p-1 rounded hover:bg-green-200"
                    title="Ligne horizontale"
                  >
                    —
                  </button>
                  <select
                    onChange={(e) => setTextColor(e.target.value)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm"
                    title="Couleur"
                  >
                    <option value="">Couleur</option>
                    {colors.map((color) => (
                      <option key={color.value} value={color.value}>
                        {color.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={(e) => setFontSize(e.target.value)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm"
                    title="Taille"
                  >
                    <option value="">Taille</option>
                    {fontSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}px
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={unsetFontSize}
                    className="p-1 rounded hover:bg-green-200"
                    title="Effacer taille"
                  >
                    T<span style={{ fontSize: "10px" }}>x</span>
                  </button>
                  <select
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200 text-sm"
                    title="Police"
                  >
                    <option value="">Police</option>
                    {fontFamilies.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={addImage}
                    className="p-1 rounded hover:bg-green-200"
                    title="Image"
                  >
                    🖼️
                  </button>
                  <button
                    type="button"
                    onClick={setLink}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("link") ? "bg-green-300" : ""}`}
                    title="Lien"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    onClick={unsetLink}
                    className="p-1 rounded hover:bg-green-200"
                    title="Supprimer lien"
                    disabled={!editor?.isActive("link")}
                  >
                    ⛓️‍💥
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextAlign("left")}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("textAlign", { align: "left" }) ? "bg-green-300" : ""}`}
                    title="Gauche"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextAlign("center")}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("textAlign", { align: "center" }) ? "bg-green-300" : ""}`}
                    title="Centrer"
                  >
                    ↔
                  </button>
                  <button
                    type="button"
                    onClick={undo}
                    className="p-1 rounded hover:bg-green-200"
                    title="Annuler"
                  >
                    ↺
                  </button>
                  <button
                    type="button"
                    onClick={redo}
                    className="p-1 rounded hover:bg-green-200"
                    title="Rétablir"
                  >
                    ↻
                  </button>
                </div>
                <EditorContent
                  editor={editor}
                  className="p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-green-500 rounded-b-lg bg-white text-gray-800 border-t border-gray-200"
                  placeholder="Détails et informations clés..."
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 transition-all duration-200"
                />
                <span className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">
                  Activer immédiatement
                </span>
              </label>
              <button
                type="submit"
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-gray-800 text-white py-2.5 px-6 rounded-lg font-semibold shadow-md hover:from-green-700 hover:to-gray-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transform transition-all duration-300 hover:scale-105"
              >
                Créer l&apos;événement
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default NewEvent;