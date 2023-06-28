import React, { FC } from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ProdStatusOptions, ProductionStatusType } from "@/types";

type PieChartProps = {
    data: ProductionStatusType[];
};

const PieChartGraph: FC<PieChartProps> = ({ data }) => (
    <ResponsiveContainer height="80%" width="95%">
        <PieChart>
            <Pie
                data={data}
                cx={100}
                cy={100}
                outerRadius={100}
                innerRadius={45}
                dataKey="percentage"
                stroke="0"
            >
                {data?.map((d, index) => {
                    return (
                        <Cell
                            fill={
                                d.Status === ProdStatusOptions.Approval
                                    ? "#DFB6D2"
                                    : d.Status === ProdStatusOptions.Produccion
                                    ? "#CFD779"
                                    : "#919ECC"
                            }
                            key={Symbol(index).toString()}
                        />
                    );
                })}
            </Pie>
            <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                    top: "10%",
                    left: "60%",
                }}
                content={renderLegend}
                iconType="circle"
                height={50}
            />
        </PieChart>
    </ResponsiveContainer>
);

export { PieChartGraph };

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
                    }}
                >
                    <span
                        style={{
                            textTransform: "capitalize",
                            fontSize: "1.5rem",
                            letterSpacing: "0.15rem",
                            fontWeight: 400,
                            verticalAlign: "bottom",
                            color: "#000",
                            lineHeight: "1.9rem",
                        }}
                    >
                        {(entry.payload.percent * 100).toFixed(0)}%{" "}
                        {entry.payload.status}
                    </span>
                </li>
            ))}
        </ul>
    );
};
