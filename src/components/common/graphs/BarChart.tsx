import React, { FC } from "react";
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell,
    XAxis,
    YAxis,
    LabelList,
    Tooltip,
} from "recharts";
import { LayoutType } from "recharts/types/util/types";

import { SkuType } from "@/types";

import styles from "./Graphs.module.css";

type BarChartProps = {
    data: SkuType[];
    layout?: LayoutType;
};

const BarChartGraph: FC<BarChartProps> = ({ data, layout = "horizontal" }) => {
    return (
        <ResponsiveContainer height="80%" width="90%">
            <BarChart
                data={data}
                layout={layout}
                margin={{
                    left: layout === "vertical" ? 100 : 0,
                    top: layout === "vertical" ? 30 : 40,
                    right: layout === "vertical" ? 150 : 0,
                }}
            >
                {layout === "vertical" ? (
                    <>
                        <YAxis
                            dataKey="CategoryName"
                            type="category"
                            fontSize="1.5rem"
                            tickLine={false}
                            axisLine={false}
                            tick={{ width: 500 }}
                            tickMargin={10}
                        />
                        <XAxis
                            dataKey="SkuQuantity"
                            type="number"
                            tickMargin={20}
                            tickLine={false}
                            axisLine={false}
                            hide
                            domain={[0, "dataMax + 5"]}
                        />
                    </>
                ) : (
                    <>
                        <XAxis
                            dataKey={"CategoryName"}
                            tickLine={false}
                            axisLine={false}
                            style={{
                                fontSize: "1.2rem",
                                textTransform: "capitalize",
                            }}
                            tickMargin={10}
                        />
                        <Tooltip
                            wrapperStyle={{ outline: "none" }}
                            itemStyle={{ color: "#233906" }}
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-ignore
                            content={(props) => renderTooltip(props)}
                        />
                    </>
                )}
                <Bar
                    dataKey={
                        layout === "vertical" ? "SkuQuantity" : "TotalPieces"
                    }
                    barSize={layout === "vertical" ? 22 : 50}
                    stackId="bar"
                >
                    {data.map((d, index) => {
                        return (
                            <Cell
                                fill={
                                    layout === "horizontal"
                                        ? d.TotalPieces < d.TargetPCS * 0.2
                                            ? "#BB855E"
                                            : d.TotalPieces <= d.TargetPCS * 0.7
                                            ? "#CEB471"
                                            : "#839270"
                                        : d.SkuQuantity < d.TargetSKU * 0.2
                                        ? "#BB855E"
                                        : d.SkuQuantity <= d.TargetSKU * 0.7
                                        ? "#CEB471"
                                        : "#839270"
                                }
                                key={Symbol(index).toString()}
                                style={{ paddingLeft: 100 }}
                            />
                        );
                    })}
                </Bar>

                <Bar
                    dataKey={layout === "vertical" ? "GapSku" : "GapPcs"}
                    stackId="bar"
                    fill="#DDDDDD"
                >
                    {layout === "vertical" ? (
                        <>
                            <LabelList
                                dataKey="SkuQuantity"
                                position="right"
                                offset={10}
                                formatter={(props: string) =>
                                    renderLabel(props, "SKU")
                                }
                                style={{ fontSize: "1.4rem", fill: "#233906" }}
                            />
                            <LabelList
                                dataKey="TargetSKU"
                                position="right"
                                offset={60}
                                formatter={(props: string) =>
                                    renderTarget(props)
                                }
                                style={{ fontSize: "1.4rem", fill: "#233906" }}
                            />
                        </>
                    ) : (
                        <>
                            <LabelList
                                dataKey="TotalPieces"
                                position="top"
                                offset={10}
                                formatter={(props: string) =>
                                    renderLabel(props, "pcs")
                                }
                                style={{ fontSize: "1.2rem", fill: "#233906" }}
                            />
                        </>
                    )}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};
export { BarChartGraph };

const renderLabel = (props: string, name: string) => {
    return `${props} ${name}`;
};

const renderTarget = (props: string) => {
    return `(Meta: ${props})`;
};

const renderTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                <p className="label">{label}</p>
                <p className="data">{`Cantidad: ${payload[0].value} pcs`}</p>
                {payload[0]?.payload?.TargetPCS !== undefined ? (
                    <p className="data">{`Meta: ${payload[0]?.payload?.TargetPCS} pcs`}</p>
                ) : (
                    <p className="data">{`Meta: Sin definir`}</p>
                )}
            </div>
        );
    }

    return null;
};
