import React from 'react';
import { actualites } from '../../data';

const NewsTable = () => {
  return (
    <div className="container p-4">
      <h1 className="title mb-4">Gestion des Actualités</h1>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Titre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {actualites.map((actualite) => (
              <tr key={actualite.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{actualite.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{actualite.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{actualite.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button className="text-indigo-600 hover:text-indigo-900 mr-3">Modifier</button>
                  <button className="text-red-600 hover:text-red-900">Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsTable;
