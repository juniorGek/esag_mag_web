import { useFieldArray, useForm } from 'react-hook-form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';

const NewPoll = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      questions: [{ type: 'text', text: '', required: false, options: [] }]
    }
  });

  const { fields: questions, append, remove } = useFieldArray({
    control,
    name: 'questions'
  });

  const addQuestion = (type = 'text') => {
    append({
      type,
      text: '',
      required: false,
      options: type !== 'text' ? [''] : []
    });
  };

  const onSubmit = (data) => {
    console.log('Formulaire soumis:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-6"
        >
          <input
            {...register('title')}
            placeholder="Titre de votre sondage"
            className="text-3xl font-extrabold w-full p-2 mb-3 border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
          />
          <textarea
            {...register('description')}
            placeholder="Description du sondage"
            className="w-full p-2 text-gray-600 border-b-2 border-transparent focus:border-blue-500 focus:outline-none resize-none bg-transparent text-sm"
            rows="2"
          />
        </motion.div>

        {/* Liste des questions */}
        <AnimatePresence>
          {questions.map((question, qIndex) => (
            <motion.div
              key={question.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-100 mb-4"
            >
              <div className="flex justify-between items-start mb-3">
                <input
                  {...register(`questions.${qIndex}.text`)}
                  placeholder="Question"
                  className="flex-1 p-2 text-lg font-semibold border-b-2 border-transparent focus:border-blue-500 focus:outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => remove(qIndex)}
                  className="ml-3 p-1 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                >
                  <TrashIcon className="h-4 w-4" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <select
                  {...register(`questions.${qIndex}.type`)}
                  className="p-1 border rounded-lg text-sm bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="text">Réponse courte</option>
                  <option value="radio">Choix unique</option>
                  <option value="checkbox">Choix multiple</option>
                  <option value="dropdown">Liste déroulante</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    {...register(`questions.${qIndex}.required`)}
                    className="h-3 w-3 text-blue-500 rounded focus:ring-blue-500"
                  />
                  Requis
                </label>
              </div>

              {['radio', 'checkbox', 'dropdown'].includes(question.type) && (
                <OptionsField
                  nestIndex={qIndex}
                  control={control}
                  register={register}
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Barre d’outils flottante */}
        <div className="fixed bottom-6 right-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => addQuestion('text')}
            className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors text-sm"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Question texte
          </button>
          <button
            type="button"
            onClick={() => addQuestion('radio')}
            className="flex items-center gap-2 px-3 py-1.5 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors text-sm"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Choix unique
          </button>
          <button
            type="button"
            onClick={() => addQuestion('checkbox')}
            className="flex items-center gap-2 px-3 py-1.5 bg-purple-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition-colors text-sm"
          >
            <PlusCircleIcon className="h-4 w-4" />
            Choix multiple
          </button>
        </div>

        {/* Bouton de soumission */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-6"
        >
          <button
            type="submit"
            onClick={handleSubmit(onSubmit)}
            className="w-full py-3 px-5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-base"
          >
            Publier le sondage
          </button>
        </motion.div>
      </div>
    </div>
  );
};

const OptionsField = ({ nestIndex, control, register }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `questions.${nestIndex}.options`
  });

  return (
    <div className="space-y-2">
      {fields.map((option, oIndex) => (
        <div key={option.id} className="flex items-center gap-2">
          <input
            {...register(`questions.${nestIndex}.options.${oIndex}`)}
            placeholder={`Option ${oIndex + 1}`}
            className="flex-1 p-2 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors text-sm"
          />
          <button
            type="button"
            onClick={() => remove(oIndex)}
            className="p-1 text-red-400 hover:text-red-600 transition-colors"
          >
            <TrashIcon className="h-3 w-3" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append('')}
        className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1 mt-2"
      >
        <PlusCircleIcon className="h-4 w-4" />
        Ajouter une option
      </button>
    </div>
  );
};

export default NewPoll;