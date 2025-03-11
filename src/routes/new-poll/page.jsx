import { useFieldArray, useForm } from 'react-hook-form';
import { PlusCircleIcon, TrashIcon } from '@heroicons/react/24/outline';

const NewPoll = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      description: '',
      questions: [{
        type: 'text',
        text: '',
        required: false,
        options: []
      }]
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
    // Envoyer les données à votre API ici
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* En-tête du formulaire */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <input
              {...register('title')}
              placeholder="Titre de votre sondage"
              className="text-3xl font-bold w-full p-2 mb-4 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
            />
            <textarea
              {...register('description')}
              placeholder="Description du sondage"
              className="w-full p-2 text-gray-600 border-b-2 border-transparent focus:border-blue-500 focus:outline-none resize-none"
              rows="2"
            />
          </div>

          {/* Liste des questions */}
          {questions.map((question, qIndex) => (
            <div key={question.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <input
                    {...register(`questions.${qIndex}.text`)}
                    placeholder="Question"
                    className="w-full p-2 text-lg font-medium border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(qIndex)}
                  className="ml-4 p-2 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <select
                  {...register(`questions.${qIndex}.type`)}
                  className="p-2 border rounded-md text-sm"
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
                    className="h-4 w-4 text-blue-500"
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
            </div>
          ))}

          {/* Boutons d'action */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => addQuestion('text')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Ajouter une question
              </button>
              <button
                type="button"
                onClick={() => addQuestion('radio')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Ajouter un choix unique
              </button>
              <button
                type="button"
                onClick={() => addQuestion('checkbox')}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-700 hover:bg-gray-50"
              >
                <PlusCircleIcon className="h-5 w-5" />
                Ajouter un choix multiple
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-3 px-6 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Publier le sondage
            </button>
          </div>
        </form>
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
            className="flex-1 p-2 border-b-2 border-transparent focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(oIndex)}
            className="p-2 text-red-400 hover:text-red-600"
          >
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append('')}
        className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
      >
        <PlusCircleIcon className="h-4 w-4" />
        Ajouter une option
      </button>
    </div>
  );
};

export default NewPoll;