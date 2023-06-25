import React from "react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";

const data = [
    {
        name: "Black",
        quantity: 4000,
    },
    {
        name: "White",
        quantity: 3000,
    },
    {
        name: "Brown",
        quantity: 2000,
    },
    {
        name: "Gray",
        quantity: 2780,
    },
    {
        name: "Orange",
        quantity: 1890,
    },
    {
        name: "Blue",
        quantity: 2390,
    },
    {
        name: "Purple",
        quantity: 3490,
    },
    {
        name: "Green",
        quantity: 3490,
    },
    {
        name: "Yellow",
        quantity: 3490,
    },
];

const Colors = () => {
    return (
        <ResponsiveContainer height="80%" width="95%">
            <BarChart width={150} height={40} data={data} layout="vertical">
                <YAxis
                    yAxisId={0}
                    dataKey="name"
                    type="category"
                    fontSize="1.4rem"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                />
                <YAxis
                    yAxisId={1}
                    dataKey="quantity"
                    type="category"
                    orientation="right"
                    fontSize="1.4rem"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    mirror
                    tickFormatter={(value) => value.toLocaleString()}
                />
                <XAxis
                    dataKey="quantity"
                    type="number"
                    tickMargin={20}
                    tickLine={false}
                    axisLine={false}
                    hide
                    domain={[0, "dataMax + 800"]}
                />
                <Bar dataKey="quantity" fill="#D9D9D9" barSize={10}></Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export { Colors };
