import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const polls = [
  {
    id: 1,
    title: "Quelle est votre tenue traditionnelle préférée ?",
    description: "Lors de la Journée Traditionnelle du 5 décembre, quelle tenue allez-vous porter ?",
    duration: "1 semaine",
    questions: [
      { type: "radio", text: "Quelle tenue allez-vous porter ?", options: ["Tenue africaine", "Tenue orientale", "Tenue asiatique", "Mix traditionnel et moderne", "Autre"] },
    ],
  },
  {
    id: 2,
    title: "Qui gagnera le match de foot de la Semaine de l’Étudiant ?",
    description: "Selon vous, quelle équipe remportera la victoire ?",
    duration: "2 jours",
    questions: [
      { type: "radio", text: "Quelle équipe remportera la victoire ?", options: ["Équipe A", "Équipe B", "Match nul", "Impossible de deviner !"] },
    ],
  },
  {
    id: 3,
    title: "Quelle activité attendez-vous le plus durant la Semaine de l’Étudiant ?",
    description: "Parmi ces activités, laquelle vous enthousiasme le plus ?",
    duration: "3 jours",
    questions: [
      { type: "radio", text: "Quelle activité vous enthousiasme le plus ?", options: ["Journée scientifique et traditionnelle", "Soirée Gospel", "Ambiance DJ & Campus Chill", "Stand de nourriture", "Match de foot"] },
    ],
  },
  {
    id: 4,
    title: "Votre avis sur le nouveau campus ?",
    description: "Partagez votre avis sur le nouveau campus.",
    duration: "1 semaine",
    questions: [
      { type: "text", text: "Qu'aimez-vous le plus dans le nouveau campus ?" },
    ],
  },
  {
    id: 5,
    title: "Sélectionnez vos clubs préférés",
    description: "Choisissez les clubs auxquels vous souhaitez adhérer.",
    duration: "1 mois",
    questions: [
      { type: "checkbox", text: "Quels clubs souhaitez-vous rejoindre ?", options: ["Club de lecture", "Club de sport", "Club de théâtre", "Club de débat"] },
    ],
  },
  {
    id: 6,
    title: "Choisissez votre plat préféré",
    description: "Quel plat aimeriez-vous voir au menu de la cafétéria ?",
    duration: "2 semaines",
    questions: [
      { type: "dropdown", text: "Quel plat préférez-vous ?", options: ["Pizza", "Burger", "Salade", "Pâtes"] },
    ],
  },
];

const ViewPolls = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-8 text-center">Liste des Sondages</h1>
        <AnimatePresence>
          {polls.map((poll) => (
            <motion.div
              key={poll.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.05, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.1)" }}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 mb-6"
            >
              <Link to={`/admin/poll-statistics/${poll.id}`}>
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-50 mb-2">{poll.title}</h2>
                <p className="text-gray-600 dark:text-slate-400 mb-3">{poll.description}</p>
                <p className="text-sm text-gray-500 dark:text-slate-300">Durée : {poll.duration}</p>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ViewPolls;
