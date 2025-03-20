import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const pollStatisticsData = {
  1: {
    id: 1,
    title: "Quelle est votre tenue traditionnelle préférée ?",
    description: "Lors de la Journée Traditionnelle du 5 décembre, quelle tenue allez-vous porter ?",
    totalResponses: 200,
    questions: [
      {
        type: "radio",
        text: "Quelle tenue allez-vous porter ?",
        options: [
          { label: "Tenue africaine", count: 85 },
          { label: "Tenue orientale", count: 55 },
          { label: "Tenue asiatique", count: 30 },
          { label: "Mix traditionnel et moderne", count: 20 },
          { label: "Autre", count: 10 },
        ],
      },
    ],
  },
  2: {
    id: 2,
    title: "Qui gagnera le match de foot de la Semaine de l’Étudiant ?",
    description: "Selon vous, quelle équipe remportera la victoire ?",
    totalResponses: 150,
    questions: [
      {
        type: "radio",
        text: "Quelle équipe remportera la victoire ?",
        options: [
          { label: "Équipe A", count: 60 },
          { label: "Équipe B", count: 45 },
          { label: "Match nul", count: 30 },
          { label: "Impossible de deviner !", count: 15 },
        ],
      },
    ],
  },
  3: {
    id: 3,
    title: "Quelle activité attendez-vous le plus durant la Semaine de l’Étudiant ?",
    description: "Parmi ces activités, laquelle vous enthousiasme le plus ?",
    totalResponses: 250,
    questions: [
      {
        type: "radio",
        text: "Quelle activité vous enthousiasme le plus ?",
        options: [
          { label: "Journée scientifique et traditionnelle", count: 70 },
          { label: "Soirée Gospel", count: 50 },
          { label: "Ambiance DJ & Campus Chill", count: 60 },
          { label: "Stand de nourriture", count: 40 },
          { label: "Match de foot", count: 30 },
        ],
      },
    ],
  },
  4: {
    id: 4,
    title: "Votre avis sur le nouveau campus ?",
    description: "Partagez votre avis sur le nouveau campus.",
    totalResponses: 100,
    questions: [
      {
        type: "text",
        text: "Qu'aimez-vous le plus dans le nouveau campus ?",
        responses: ["La bibliothèque", "Les espaces verts", "Les salles de classe", "Le réfectoire"],
      },
    ],
  },
  5: {
    id: 5,
    title: "Sélectionnez vos clubs préférés",
    description: "Choisissez les clubs auxquels vous souhaitez adhérer.",
    totalResponses: 300,
    questions: [
      {
        type: "checkbox",
        text: "Quels clubs souhaitez-vous rejoindre ?",
        options: [
          { label: "Club de lecture", count: 80 },
          { label: "Club de sport", count: 90 },
          { label: "Club de théâtre", count: 70 },
          { label: "Club de débat", count: 60 },
        ],
      },
    ],
  },
  6: {
    id: 6,
    title: "Choisissez votre plat préféré",
    description: "Quel plat aimeriez-vous voir au menu de la cafétéria ?",
    totalResponses: 180,
    questions: [
      {
        type: "dropdown",
        text: "Quel plat préférez-vous ?",
        options: [
          { label: "Pizza", count: 50 },
          { label: "Burger", count: 45 },
          { label: "Salade", count: 40 },
          { label: "Pâtes", count: 45 },
        ],
      },
    ],
  },
};

const PollStatistics = () => {
  const { id } = useParams();
  const poll = pollStatisticsData[id];

  if (!poll) {
    return <div>Sondage non trouvé</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-50 mb-6 text-center">{poll.title}</h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6 text-center">{poll.description}</p>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-slate-50 mb-6 text-center">
            Réponses totales : {poll.totalResponses}
          </h2>
          {poll.questions.map((question, index) => (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-4">{question.text}</h3>
              <div className="space-y-4">
                {question.type === "text" ? (
                  <div className="bg-gray-50 dark:bg-slate-700 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 dark:text-slate-300">Réponses courtes collectées :</p>
                    <ul>
                      {question.responses.map((response, rIndex) => (
                        <li key={rIndex} className="text-gray-600 dark:text-slate-300">- {response}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  question.options.map((option, oIndex) => (
                    <motion.div
                      key={oIndex}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center justify-between bg-gray-50 dark:bg-slate-700 p-4 rounded-lg shadow-sm"
                    >
                      <span className="text-gray-700 dark:text-slate-300">{option.label}</span>
                      <span className="text-blue-500 font-semibold">{option.count} réponses</span>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default PollStatistics;
