import { useState } from "react";
import { Upload, X, Heading, Heading2 } from "lucide-react";
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
import { toast, ToastContainer } from "react-toastify";
import { API_URL } from "../../../config/ApiUrl";

// Extension personnalisée pour FontFamily
const FontFamily = Extension.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"],
    };
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
        ({ chain }) => {
          return chain().setMark("textStyle", { fontFamily }).run();
        },
      unsetFontFamily:
        () =>
        ({ chain }) => {
          return chain().unsetMark("textStyle", { fontFamily: null }).run();
        },
    };
  },
});

// Extension personnalisée pour FontSize
const FontSize = Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"],
    };
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
        ({ chain }) => {
          return chain().setMark("textStyle", { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain().unsetMark("textStyle", { fontSize: null }).run();
        },
    };
  },
});

const NewBlog = () => {
  const [formData, setFormData] = useState({
    titre: "",
    sous_titre: "",
    details: "",
    imageCover: null,
    enabled: true,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    content: formData.details,
    onUpdate: ({ editor }) => {
      setFormData({ ...formData, details: editor.getHTML() });
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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

  const resetFormData = () => {
    setFormData({
      titre: "",
      sous_titre: "",
      details: "",
      imageCover: null,
      enabled: false,
    });
    setPreview(null);
    if (editor) editor.commands.setContent("");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
      
    try {
      const formValues = new FormData();
      formValues.append("titre", formData.titre);
      formValues.append("sous_titre", formData.sous_titre);
      formValues.append("details", formData.details);
      formValues.append("image", formData.imageCover);
      formValues.append("enabled", formData.enabled);

      const response = await fetch(`${API_URL}/createBlog`, {
        method: "POST",
        headers:{
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formValues,
      });
      const data = await response.json()
      if (response.status === 200) {
        toast.success(data.message, { autoClose: 3000 });
        resetFormData();
      }else if (response.status === 400) {
        toast.error(data.message, { autoClose: 3000 });
      }
      console.log(data)

    } catch (error) {
      toast.error("Erreur lors de la création de l'actualité", {
        autoClose: 3000,
      });
      console.log(error)
    }finally{
      setLoading(false);
    }
  };

  // Fonctions pour la barre d'outils
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleHeading1 = () =>
    editor?.chain().focus().toggleHeading({ level: 1 }).setFontSize("32px").run();
  const toggleHeading2 = () =>
    editor?.chain().focus().toggleHeading({ level: 2 }).setFontSize("24px").run();
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
  ];

  const fontSizes = [12, 14, 16, 18, 20, 24, 32];

  const fontFamilies = ["Arial", "Times New Roman", "Courier New", "Georgia", "Verdana"];

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden transform transition-all hover:shadow-3xl border border-gray-200/50">
        {/* Section Upload - En-tête */}
        <div className="relative w-full h-60 bg-gradient-to-r from-gray-700 to-green-600">
          <div
            className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 ${
              preview ? "bg-black/10" : "border-2 border-dashed border-gray-300 hover:border-green-500"
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {preview ? (
              <div className="relative w-full h-full group">
                <img
                  src={preview}
                  alt="Aperçu de l'image"
                  className="w-full h-full object-cover rounded-t-3xl transform transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, imageCover: null });
                  }}
                  className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow-lg hover:bg-green-100 transition-all duration-300 hover:scale-110"
                >
                  <X className="w-5 h-5 text-gray-600 hover:text-green-600" />
                </button>
              </div>
            ) : (
              <div className="text-center space-y-4 animate-fade-in">
                <Upload className="w-14 h-14 mx-auto text-green-500 animate-bounce-slow" />
                <p className="text-lg text-gray-700 font-medium">
                  Déposez une image ici ou{" "}
                  <label className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors">
                    choisissez un fichier
                    <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  </label>
                </p>
                <p className="text-sm text-gray-500">JPEG, PNG (max 5Mo)</p>
              </div>
            )}
          </div>
        </div>

        {/* Section Formulaire */}
        <div className="p-8">
          <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-gray-800 to-green-600 bg-clip-text text-transparent mb-8">
            Créer un Nouveau Blog
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Champ Titre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                  Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="titre"
                    value={formData.titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Un titre accrocheur"
                    required
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
                  </span>
                </div>
              </div>

              {/* Champ Sous-titre */}
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                  Sous Titre
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="sous_titre"
                    value={formData.sous_titre}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent shadow-sm transition-all duration-300 hover:shadow-md"
                    placeholder="Mettez le sous titre ici"
                  />
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Heading2 className="w-5 h-5 text-green-500 transition-colors group-hover:text-green-600" />
                  </span>
                </div>
              </div>
            </div>

            {/* Champ Contenu avec TipTap */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-2 transition-colors group-hover:text-green-600">
                Contenu
              </label>
              <div className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-200 rounded-t-xl">
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
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200"
                    title="Couleur de police"
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
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200"
                    title="Taille de police"
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
                    title="Effacer taille police"
                  >
                    T<span style={{ fontSize: "12px" }}>x</span>
                  </button>
                  <select
                    onChange={(e) => setFontFamily(e.target.value)}
                    className="p-1 rounded bg-white border border-gray-300 hover:bg-green-200"
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
                    title="Insérer une image"
                  >
                    🖼️
                  </button>
                  <button
                    type="button"
                    onClick={setLink}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("link") ? "bg-green-300" : ""}`}
                    title="Insérer un lien"
                  >
                    🔗
                  </button>
                  <button
                    type="button"
                    onClick={unsetLink}
                    className="p-1 rounded hover:bg-green-200"
                    title="Supprimer le lien"
                    disabled={!editor?.isActive("link")}
                  >
                    ⛓️‍💥
                  </button>
                  <button
                    type="button"
                    onClick={() => setTextAlign("left")}
                    className={`p-1 rounded hover:bg-green-200 ${editor?.isActive("textAlign", { align: "left" }) ? "bg-green-300" : ""}`}
                    title="Aligner à gauche"
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
                  className="p-3 min-h-[200px] focus:outline-none focus:ring-2 focus:ring-green-500 rounded-b-xl"
                  placeholder="Votre histoire commence ici..."
                />
              </div>
            </div>

            {/* Checkbox et Bouton */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center group">
                <input
                  type="checkbox"
                  name="enabled"
                  checked={formData.enabled}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 cursor-pointer transition-all duration-300"
                />
                <label className="ml-3 text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors">
                  Publier maintenant
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`relative w-full md:w-1/3 bg-gradient-to-r from-yellow-500 to-gray-800 text-white py-3 px-6 rounded-xl font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 transform transition-all duration-300 ${
                  loading ? "opacity-70 cursor-not-allowed" : "hover:from-yellow-600 hover:to-gray-900 hover:scale-105"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 mr-2 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      />
                    </svg>
                    Publication en cours...
                  </div>
                ) : (
                  "Publier le Blog"
                )}
              </button>
            </div>

             {/* Barre de progression si loading */}
             {loading && (
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 animate-progress"></div>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
      
    </div>
  );
};

export default NewBlog;