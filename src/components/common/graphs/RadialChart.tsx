import React, { FC, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {
    ResponsiveContainer,
    RadialBar,
    LabelList,
    RadialBarChart,
    Cell,
    PolarAngleAxis,
    Legend,
} from "recharts";

type RadialChartProps = {
    data: { name: string; value: number }[];
};

const RadialChart: FC<RadialChartProps> = ({ data }) => {
    useEffect(() => {
        console.log("data", data);
    }, [data]);
    return (
        <ResponsiveContainer height="100%" width="30%">
            <RadialBarChart
                data={data}
                cx="50%"
                cy="30%"
                outerRadius={55}
                innerRadius={50}
            >
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    height={60}
                    iconSize={0}
                    content={renderLegend}
                    wrapperStyle={{
                        width: "100%",
                        left: "0%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                />
                <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                />

                <RadialBar background dataKey="value">
                    {data?.map((d, index) => {
                        return (
                            <Cell
                                fill={
                                    d.value <= 45
                                        ? "#E28B4A"
                                        : d.value >= 80
                                        ? "#CFD779"
                                        : "#DFB6D2"
                                }
                                key={uuid()}
                            />
                        );
                    })}
                    <LabelList
                        dataKey="value"
                        position="center"
                        formatter={(props: string) => renderLabel(props)}
                        style={{
                            fontSize: "1.8rem",
                            fontWeight: 600,
                            fill: "#000",
                        }}
                    />
                </RadialBar>
            </RadialBarChart>
        </ResponsiveContainer>
    );
};

export { RadialChart };

const renderLabel = (props: string) => `${props} %`;

const renderLegend = (props) => {
    const { payload } = props;

    return (
        <>
            {payload?.map((entry) => (
                <span
                    key={uuid()}
                    style={{
                        textTransform: "uppercase",
                        fontSize: "1.3rem",
                        letterSpacing: "0.15rem",
                        fontWeight: 600,
                        maxWidth: "9rem",
                        lineBreak: "auto",
                        textAlign: "center",
                    }}
                >
                    {entry.value}
                </span>
            ))}
        </>
    );
};
