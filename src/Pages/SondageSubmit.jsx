import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { API_URL } from "../../config/ApiUrl";
import { useForm } from 'react-hook-form';



function SondageSubmit() {

    const {id} = useParams()
    const [poll, setPoll] = useState(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit,reset  } = useForm();

    const fetchPoll = async () => {
        try {
            const response = await fetch(`${API_URL}/getPoll/${id}`);
            const data = await response.json();
           
            if (response.status === 200) {
                setPoll(data.poll);
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }

     useEffect(() => {
        fetchPoll();
    }, []);

    const onSubmit = async(data) => {
      const submissionData = {
        pollId: id,
        firstName: data.firstName || null,
        lastName: data.lastName || null,
        answers: data.answers,
      };   

        try {
          const response = await fetch(`${API_URL}/submitPoll`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(submissionData),
          });
          const result = await response.json();
          if(response.ok){
            setSuccessMessage('Votre soumission a été prise en compte.');
                reset();
          }else{
            console.log(result);
          }
        } catch (error) {
          console.log(error);
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4">
          {loading ? (
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="h-12 bg-slate-200 rounded animate-pulse w-1/2"></div>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
                  <div className="h-6 bg-slate-200 rounded animate-pulse w-2/3 mb-4"></div>
                  <div className="h-4 bg-slate-200 rounded animate-pulse w-full mb-2"></div>
                </div>
              ))}
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
              {/* En-tête */}
              {successMessage}
              <div className="mb-8 border-b pb-6">
                <h1 className="text-3xl font-medium text-slate-800 mb-2">{poll.title}</h1>
                <p className="text-slate-600 text-lg">{poll.description}</p>
              </div>
    
              {/* Informations personnelles */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Nom (optionnel)</label>
                  <input
                    {...register('firstName')}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Ex: Dupont"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-slate-700">Prénom (optionnel)</label>
                  <input
                    {...register('lastName')}
                    className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Ex: Jean"
                  />
                </div>
              </div>
    
              {/* Questions */}
              <div className="space-y-8">
                {poll.Questions.map((question, index) => (
                  <div key={question.id} className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                    <p className="text-lg font-medium text-slate-800 mb-4 flex items-center">
                      <span className="mr-2">{index + 1}.</span>
                      {question.text}
                    </p>
    
                    {question.type === 'text' && (
                      <input
                        {...register(`answers.${index}.answer`)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Tapez votre réponse ici..."
                      />
                    )}
    
                    {question.type === 'radio' && (
                      <div className="space-y-3">
                        {question.Options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-white transition-colors cursor-pointer"
                          >
                            <input
                              type="radio"
                              value={option.text}
                              {...register(`answers.${index}.answer`)}
                              className="h-4 w-4 text-blue-600 border-slate-300 focus:ring-blue-500"
                            />
                            <span className="text-slate-700">{option.text}</span>
                          </label>
                        ))}
                      </div>
                    )}
    
                    {question.type === 'checkbox' && (
                      <div className="space-y-3">
                        {question.Options.map((option) => (
                          <label
                            key={option.id}
                            className="flex items-center space-x-3 p-3 rounded-md hover:bg-white transition-colors cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              value={option.text}
                              {...register(`answers.${index}.answer`)}
                              className="h-4 w-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500"
                            />
                            <span className="text-slate-700">{option.text}</span>
                          </label>
                        ))}
                      </div>
                    )}
    
                    {question.type === 'dropdown' && (
                      <select
                        {...register(`answers.${index}.answer`)}
                        className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white appearance-none"
                      >
                        <option value="">Sélectionnez une option</option>
                        {question.Options.map((option) => (
                          <option key={option.id} value={option.text}>
                            {option.text}
                          </option>
                        ))}
                      </select>
                    )}
    
                    <input
                      type="hidden"
                      value={question.id}
                      {...register(`answers.${index}.questionId`)}
                    />
                  </div>
                ))}
              </div>
    
              {/* Bouton de soumission */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Soumettre le formulaire
                </button>
              </div>
            </form>
          )}
        </div>
      )
}

export default SondageSubmit