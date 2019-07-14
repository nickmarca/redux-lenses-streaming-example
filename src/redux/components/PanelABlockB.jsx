import React, { useState } from 'react'

function PanelABlockB({ isSearchDisabled, onSearch }) {
    const [value, setValue] = useState('')

    const onChange = ({ target }) => setValue(target.value);
    const onSearch_ = () => onSearch(value);

    return (
        <div className="panel-block">
            <div className="field has-addons">
                <div className="control">
                    <input
                        value={value}
                        onChange={onChange}
                        className="input is-small"
                        type="text"
                        placeholder="Find a message"
                    />
                </div>
                <div className="control">
                    <button
                        className="button is-info is-small"
                        disabled={isSearchDisabled}
                        onClick={onSearch_}
                    >
                        Search
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PanelABlockB
