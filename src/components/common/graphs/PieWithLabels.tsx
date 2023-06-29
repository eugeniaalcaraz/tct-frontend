import React, { FC } from "react";
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from "recharts";

type PieWithLabelsProps = {
    data: { name: string; value: number; weight: number }[];
};

const COLORS = [
    "#CFD779",
    "#DFB6D2",
    "#919ECC",
    "#EB9D6F",
    "#E9CE67",
    "#AAB96E",
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
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
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

const PieWithLabels: FC<PieWithLabelsProps> = ({ data }) => {
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
                    stroke="#E8E8E8"
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
                    verticalAlign="top"
                    align="right"
                    wrapperStyle={{
                        top: "10%",
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
                        lineHeight: "2.5rem",
                        display: "list-item",
                        width: "10rem",
                        position: "relative",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textTransform: "capitalize",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                            verticalAlign: "bottom",
                            color: "#000",
                            lineHeight: "1.9rem",
                            position: "absolute",
                            top: "-10px",
                        }}
                    >
                        <span>{entry.payload.name}</span>
                        <span>Peso: {entry.payload.weight} gr</span>
                    </div>
                </li>
            ))}
        </ul>
    );
};
