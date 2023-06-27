import React from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

const data = [
    { name: "Group A", value: 400, weight: 200 },
    { name: "Group B", value: 300, weight: 100 },
    { name: "Group C", value: 300, weight: 50 },
    { name: "Group D", value: 200, weight: 400 },
];

const COLORS = [
    "#CFD779",
    "#DFB6D2",
    "#919ECC",
    "#EB9D6F",
    "#E9CE67",
    "#AAB96E",
    "#314C95",
    "#31654B",
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
}) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill="black"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

const PieWithLabels = () => {
    return (
        <ResponsiveContainer height="80%" width="80%">
            <PieChart width={700} height={800}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Legend
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                    wrapperStyle={{
                        top: "25%",
                        left: "85%",
                    }}
                    content={renderLegend}
                    iconType="circle"
                    height={50}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export { PieWithLabels };

const renderLegend = (props) => {
    const { payload } = props;

    return (
        <ul>
            {payload?.map((entry, index) => (
                <li
                    key={`list-${entry}-${index}`}
                    style={{
                        marginTop: "2.5rem",
                        color: `${entry.color}`,
                        fontWeight: 400,
                        fontSize: "3rem",
                        lineHeight: "1.9rem",
                        display: "list-item",
                        width: "9rem",
                    }}
                >
                    <span
                        style={{
                            textTransform: "capitalize",
                            fontSize: "1.4rem",
                            fontWeight: 400,
                            verticalAlign: "bottom",
                            color: "#000",
                            lineHeight: "1.9rem",
                        }}
                    >
                        {entry.payload.name} Peso: {entry.payload.weight} gr
                    </span>
                </li>
            ))}
        </ul>
    );
};
