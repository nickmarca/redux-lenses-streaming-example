import React, { useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

function Chart({ data }) {
    const [lineKey, setLineKey] = useState('');
    const [xAxisKey, setXAxis] = useState('');

    if (!data.length) {
        return <div />;
    }

    return (
        <div className="panel">
            <div className="panel-block">
                <div
                    style={{
                        marginRight: 15,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <label
                        className="label"
                        style={{ marginBottom: 0, marginRight: 7 }}
                    >
                        Select 'Y' Axis
                    </label>
                    <div className="select">
                        <select
                            onChange={({ target }) => setLineKey(target.value)}
                        >
                            {Object.keys(data[0]).map(key => (
                                <option value={key} key={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div
                    style={{
                        marginRight: 15,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <label
                        className="label"
                        style={{ marginBottom: 0, marginRight: 7 }}
                    >
                        Select 'X' Axis
                    </label>
                    <div className="select">
                        <select
                            onChange={({ target }) => setXAxis(target.value)}
                        >
                            {Object.keys(data[0]).map(key => (
                                <option value={key} key={key}>
                                    {key}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {lineKey && xAxisKey ? (
                <LineChart width={600} height={300} data={data}>
                    <Line type="monotone" dataKey={lineKey} stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" />
                    <XAxis dataKey={xAxisKey} />
                    <YAxis />
                </LineChart>
            ) : null}
        </div>
    );
}

export default Chart;
