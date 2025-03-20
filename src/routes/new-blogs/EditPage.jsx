import { useEffect, useState } from "react";
import { API_URL, ImageApi } from "../../../config/ApiUrl";
import { useNavigate, useParams } from "react-router-dom";
import {
  Loader2,
  X,
  Upload,
  Type,
  Text,
  Image as ImageIcon,
  Save,
  XCircle,
} from "lucide-react";
import DescriptionEditor from "../../components/DescriptionEditor";
import { useMessage } from "../../utils/messageContext";
import { toast } from "react-toastify";

function EditBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setMessage } = useMessage();
  const [editedBlog, setEditedBlog] = useState({
    titre: "",
    sous_titre: "",
    details: "",
    imageCover: "",
    description_mobile: "",
    imageFile: null,
    enabled: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog({ ...editedBlog, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formValues = new FormData();
    formValues.append("titre", editedBlog.titre);
    formValues.append("sous_titre", editedBlog.sous_titre);
    formValues.append("details", editedBlog.details);
    formValues.append("image", editedBlog.imageFile);
    formValues.append("description_mobile", editedBlog.description_mobile);
    /* formValues.append("enabled", editedBlog.enabled);*/

    try {
      const response = await fetch(`${API_URL}/updateBlog/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formValues,
      });
      const data = await response.json();
      if (response.status === 200) {
        setMessage({ type: "success", text: data.message });
        navigate("/admin/blogs");
      } else {
        toast.error(data.message, {
          position: "top-right",
          autoClose: 5000,
        });
      }
    } catch (error) {
      toast.error("Erreur lors de la modification du blog", {
        position: "top-right",
        autoClose: 5000,
      });
      console.log(error);
    }
  };

  const fetchDetailsBlog = async () => {
    try {
      const response = await fetch(`${API_URL}/detailsBlog/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setBlog(data.blog);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetailsBlog();
  }, []);

  useEffect(() => {
    if (blog) {
      setEditedBlog({
        titre: blog.titre || "",
        sous_titre: blog.titre || "",
        details: blog.details || "",
        imageCover: blog.imageCover || "",
      });
    }
  }, [blog]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedBlog({
        ...editedBlog,
        imageCover: URL.createObjectURL(file), // pour l'affichage
        imageFile: file, // le fichier réel pour l'upload
      });
    }
  };
  

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditedBlog({
        ...editedBlog,
        imageCover: URL.createObjectURL(file),
        imageFile: file,
      });
    }
  };

  const stripTags = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

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
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Modification de blog
          </h2>
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
              value={editedBlog.titre}
              onChange={handleChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              placeholder="Titre du blog"
              required
            />
          </div>
          {/* Sous Titre */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              Sous Titre
            </label>
            <input
              type="text"
              name="sous_titre"
              value={editedBlog.sous_titre}
              onChange={handleChange}
              className="w-full py-2.5 px-4 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 hover:border-blue-400"
              placeholder="Sous Titre du blog"
              required
            />
          </div>

          {/* Image de couverture */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-blue-600" /> Image de
              couverture
            </label>
            <div
              className="w-full h-40 border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center relative rounded-lg transition-all duration-300 hover:border-blue-500 hover:bg-gray-100"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {editedBlog.imageCover ? (
                <div className="relative w-full h-full group">
                  <img
                    src={
                      editedBlog.imageCover.startsWith("blob:")
                        ? editedBlog.imageCover
                        : `${ImageApi}/${editedBlog.imageCover}`
                    }
                    alt="Aperçu"
                    className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <button
                    onClick={() =>
                      setEditedBlog({ ...editedBlog, imageCover: "" })
                    }
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-80 hover:opacity-100 hover:bg-red-600 transition-all duration-300"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center h-full text-gray-500 cursor-pointer">
                  <Upload className="w-8 h-8 mb-2 text-blue-500 animate-bounce" />
                  <span className="text-sm font-medium">
                    Déposez ou cliquez pour choisir une image
                  </span>
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

          {/* Contenu */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <Text className="w-5 h-5 text-blue-600" /> Contenu
            </label>
            <div className="border border-gray-300 rounded-lg bg-white shadow-sm">
              <DescriptionEditor
                value={editedBlog.details}
                onChange={(html) =>
                  setEditedBlog({
                    ...editedBlog,
                    details: html,
                    description_mobile: stripTags(html),
                  })
                }
              />
            </div>
          </div>

          <textarea
            className="w-full p-2 rounded-lg border-none outline-none hidden"
            value={editedBlog.description_mobile}
            readOnly
          />

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

export default EditBlog;
