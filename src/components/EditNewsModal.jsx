import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { ImageApi } from "../../config/ApiUrl";

export default function EditNewsModal({ isOpen, onClose, news, onSave }) {
  // Initialiser editedNews avec un objet vide si news est null
  const [editedNews, setEditedNews] = useState({
    titre: "",
    sous_titre: "",
    description: "",
    imageCover: "",
    enabled: false,
  });

  // Mettre à jour editedNews lorsque news change
  useEffect(() => {
    if (news) {
      setEditedNews(news);
    }
  }, [news]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedNews({ ...editedNews, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedNews);
  };

  return (
    <div className="fixed inset-2 z-20 bg-black bg-opacity-50 flex items-center justify-center p-4">
      
    </div>
  );
}

EditNewsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  news: PropTypes.shape({
    id: PropTypes.number.isRequired,
    titre: PropTypes.string.isRequired,
    sous_titre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    imageCover: PropTypes.string.isRequired,
    enabled: PropTypes.bool.isRequired,
  }),
  onSave: PropTypes.func.isRequired,
};

EditNewsModal.defaultProps = {
  news: null, // news peut être null
};
