import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface DashboardSummaryChartProps {
  totalPosts: number;
  totalComments: number;
  darkMode: boolean;
}

export default function DashboardSummaryChart({
  totalPosts,
  totalComments,
  darkMode,
}: DashboardSummaryChartProps) {
  const options: Highcharts.Options = {
    chart: {
      type: "column",
      backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
    },

    title: {
      text: "Resumen global",
      style: {
        color: darkMode ? "#ffffff" : "#0f172a",
      },
    },

    xAxis: {
      categories: ["Posts", "Comentarios"],
      labels: {
        style: {
          color: darkMode ? "#e5e7eb" : "#334155",
        },
      },
    },

    yAxis: {
      title: {
        text: "Cantidad",
        style: {
          color: darkMode ? "#e5e7eb" : "#334155",
        },
      },
      labels: {
        style: {
          color: darkMode ? "#e5e7eb" : "#334155",
        },
      },
    },

    series: [
      {
        name: "Total",
        type: "column",
        data: [totalPosts, totalComments],
        color: darkMode ? "#38bdf8" : "#2563eb",
      },
    ],

    legend: {
      enabled: false,
    },

    credits: {
      enabled: false,
    },
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow p-4 transition-colors">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
}
