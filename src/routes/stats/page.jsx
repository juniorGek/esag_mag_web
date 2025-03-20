import { useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Bar, Line } from "react-chartjs-2";

// Enregistrez les composants nécessaires pour Chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const StatsPage = () => {
  // Données pour le graphique Doughnut
  const doughnutData = {
    labels: ["Participants actifs", "Participants inactifs", "Nouveaux inscrits"],
    datasets: [
      {
        label: "Utilisateurs",
        data: [300, 150, 50],
        backgroundColor: ["#4B9CD3", "#D3D3D3", "#FFD700"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Répartition des utilisateurs" },
    },
  };

  // Données pour le graphique Bar
  const barData = {
    labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
    datasets: [
      {
        label: "Suggestions reçues",
        data: [12, 19, 8, 15, 10],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Suggestions par jour" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Données pour le graphique Line
  const lineData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    datasets: [
      {
        label: "Participation aux événements",
        data: [65, 59, 80, 81, 56, 55, 40, 70, 85, 90, 75, 60],
        fill: false,
        borderColor: "#4B9CD3",
        tension: 0.3,
        pointBackgroundColor: "#4B9CD3",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "#4B9CD3",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Participation mensuelle (2023)" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // Nettoyage des graphiques au démontage (optionnel)
  useEffect(() => {
    return () => {
      ChartJS.instances && Object.values(ChartJS.instances).forEach((instance) => instance.destroy());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
          Statistiques et Rapports
        </h1>

        {/* Première ligne : Doughnut et Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Doughnut */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>

          {/* Bar */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        {/* Deuxième ligne : Line */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>
    </div>
  );
};

export default StatsPage;