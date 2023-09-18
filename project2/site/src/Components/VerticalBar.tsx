import React from 'react';
import './VerticalBar.css';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function VerticalBar(props: any) {
    // All the options
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: props.title,
            },
        },
        maintainAspectRatio: false
    };

    // Default data and data we got from props
    const data = {
        labels: props.data.labels,
        datasets: [
            {
                label: 'Commits',
                data: props.data.dataValues,
                backgroundColor: 'rgba(97, 218, 251, 0.75)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0.5,
            },
        ],
    };

    return (
        <div className="VerticalGraph">
            <Bar // From react-chartjs-2 library
                options={options}
                data={data}
            />
        </div>
    );
}

export default VerticalBar;