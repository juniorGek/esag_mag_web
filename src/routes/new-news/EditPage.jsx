import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useParams } from "react-router-dom";
import {
  Loader2,
  X,
  Upload,
  Type,
  FileText,
  Image as ImageIcon,
  Text,
  ToggleLeft,
  Save,
  XCircle,
} from "lucide-react";
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

function EditNews() {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editedNews, setEditedNews] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: "",
    enabled: false,
  });

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
    content: editedNews.description,
    onUpdate: ({ editor }) => {
      setEditedNews({ ...editedNews, description: editor.getHTML() });
    },
  });

  const fetchDetailsActualite = async () => {
    try {
      const response = await fetch(`${API_URL}/detailsActu/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setNews(data.actualite);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsActualite();
  }, []);

  useEffect(() => {
    if (news) {
      setEditedNews({
        titre: news.titre || "",
        sous_titre: news.sous_titre || "",
        description: news.description || "",
        imageCover: news.imageCover || "",
        enabled: news.enabled || false,
      });
      if (editor) {
        editor.commands.setContent(news.description || "");
      }
    }
  }, [news, editor]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setEditedNews({ ...editedNews, [name]: checked });
    } else {
      setEditedNews({ ...editedNews, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedNews({ ...editedNews, imageCover: URL.createObjectURL(file) });
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditedNews({ ...editedNews, imageCover: URL.createObjectURL(file) });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises:", editedNews);
    // Ajoutez ici la logique pour envoyer les modifications à l'API
  };

  // Fonctions pour la barre d'outils TipTap
  const toggleBold = () => editor?.chain().focus().toggleBold().run();
  const toggleItalic = () => editor?.chain().focus().toggleItalic().run();
  const toggleUnderline = () => editor?.chain().focus().toggleUnderline().run();
  const toggleStrike = () => editor?.chain().focus().toggleStrike().run();
  const toggleHeading1 = () => editor?.chain().focus().toggleHeading({ level: 1 }).setFontSize("20px").run();
  const toggleHeading2 = () => editor?.chain().focus().toggleHeading({ level: 2 }).setFontSize("18px").run();
  const toggleBulletList = () => editor?.chain().focus().toggleBulletList().run();
  const toggleOrderedList = () => editor?.chain().focus().toggleOrderedList().run();
  const toggleBlockquote = () => editor?.chain().focus().toggleBlockquote().run();
  const addHorizontalRule = () => editor?.chain().focus().setHorizontalRule().run();
  const setTextColor = (color) => editor?.chain().focus().setColor(color).run();
  const setFontSize = (size) => editor?.chain().focus().setFontSize(`${size}px`).run();
  const setFontFamily = (font) => editor?.chain().focus().setFontFamily(font).run();
  const setLink = () => {
    const url = prompt("Entrez l'URL du lien");
    if (url) editor?.chain().focus().setLink({ href: url }).run();
  };
  const unsetLink = () => editor?.chain().focus().unsetLink().run();

  // Nouvelle fonction pour uploader une image dans TipTap
  const addImageToEditor = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;
        editor?.chain().focus().setImage({ src: base64Image }).run();
      };
      reader.readAsDataURL(file);
    }
  };

  const colors = [
    { name: "Noir", value: "#000000" },
    { name: "Rouge", value: "#ff0000" },
    { name: "Vert", value: "#00ff00" },
    { name: "Bleu", value: "#0000ff" },
  ];

  const fontSizes = [12, 14, 16, 18, 20];
  const fontFamilies = ["Arial", "Helvetica", "Times New Roman"];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all hover:shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-5 border-b border-blue-900">
          <h2 className="text-xl font-semibold text-white tracking-tight">Modification d&apos;actualité</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Titre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" /> Titre
            </label>
            <input
              type="text"
              name="titre"
              value={editedNews.titre}
              onChange={handleChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              placeholder="Titre de l'actualité"
              required
            />
          </div>

          {/* Sous-titre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" /> Sous-titre
            </label>
            <input
              type="text"
              name="sous_titre"
              value={editedNews.sous_titre}
              onChange={handleChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              placeholder="Sous-titre"
              required
            />
          </div>

          {/* Image de couverture */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" /> Image de couverture
            </label>
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center relative rounded-lg transition-all duration-300 hover:border-blue-500 hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {editedNews.imageCover ? (
                <div className="relative w-full h-full group">
                  <img
                    src={
                      editedNews.imageCover.startsWith("blob:")
                        ? editedNews.imageCover
                        : `${ImageApi}/${editedNews.imageCover}`
                    }
                    alt="Aperçu"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() => setEditedNews({ ...editedNews, imageCover: "" })}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-80 hover:opacity-100 hover:bg-red-600 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full text-gray-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2 text-blue-500 animate-bounce" />
                  <span className="text-sm font-medium">Déposez ou cliquez pour choisir une image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Text className="w-5 h-5 text-blue-600" /> Description
            </label>
            <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
              <div className="flex flex-wrap gap-2 p-2 bg-gray-100 border-b border-gray-200 rounded-t-lg">
                <button
                  type="button"
                  onClick={toggleBold}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("bold") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={toggleItalic}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("italic") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={toggleUnderline}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("underline") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  <u>U</u>
                </button>
                <button
                  type="button"
                  onClick={toggleStrike}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("strike") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  <s>S</s>
                </button>
                <button
                  type="button"
                  onClick={toggleHeading1}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("heading", { level: 1 }) ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={toggleHeading2}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("heading", { level: 2 }) ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={toggleBulletList}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("bulletList") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  •
                </button>
                <button
                  type="button"
                  onClick={toggleOrderedList}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("orderedList") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  1.
                </button>
                <button
                  type="button"
                  onClick={toggleBlockquote}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("blockquote") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  &quot;
                </button>
                <button
                  type="button"
                  onClick={addHorizontalRule}
                  className="p-1.5 rounded-md hover:bg-blue-200 text-gray-600 transition-colors duration-200"
                >
                  —
                </button>
                <select
                  onChange={(e) => setTextColor(e.target.value)}
                  className="p-1.5 rounded-md bg-white border border-gray-200 text-sm text-gray-600 hover:bg-blue-200 transition-colors duration-200"
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
                  className="p-1.5 rounded-md bg-white border border-gray-200 text-sm text-gray-600 hover:bg-blue-200 transition-colors duration-200"
                >
                  <option value="">Taille</option>
                  {fontSizes.map((size) => (
                    <option key={size} value={size}>
                      {size}px
                    </option>
                  ))}
                </select>
                <select
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="p-1.5 rounded-md bg-white border border-gray-200 text-sm text-gray-600 hover:bg-blue-200 transition-colors duration-200"
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
                  onClick={setLink}
                  className={`p-1.5 rounded-md hover:bg-blue-200 transition-colors duration-200 ${editor?.isActive("link") ? "bg-blue-300 text-blue-800" : "text-gray-600"}`}
                >
                  🔗
                </button>
                <button
                  type="button"
                  onClick={unsetLink}
                  className="p-1.5 rounded-md hover:bg-blue-200 text-gray-600 transition-colors duration-200"
                  disabled={!editor?.isActive("link")}
                >
                  ⛓️‍💥
                </button>
                <label className="p-1.5 rounded-md hover:bg-blue-200 text-gray-600 cursor-pointer transition-colors duration-200">
                  <Upload className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={addImageToEditor}
                    className="hidden"
                  />
                </label>
              </div>
              <EditorContent
                editor={editor}
                className="p-4 min-h-[150px] bg-white text-gray-900 rounded-b-lg border-t border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Description de l'actualité"
              />
            </div>
          </div>

          {/* Statut */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5 text-blue-600" /> Statut
            </label>
            <select
              name="enabled"
              value={editedNews.enabled ? "Activé" : "Désactivé"}
              onChange={(e) =>
                setEditedNews({
                  ...editedNews,
                  enabled: e.target.value === "Activé",
                })
              }
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
            >
              <option value="Activé">Activé</option>
              <option value="Désactivé">Désactivé</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              className="px-5 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-all duration-300 flex items-center gap-2"
            >
              <XCircle className="w-5 h-5" /> Annuler
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 flex items-center gap-2"
            >
              <Save className="w-5 h-5" /> Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditNews;