import React from 'react'

function PanelAHeading({ value, onChange }) {
    return (
        <div className="panel-heading">
            <div className="field has-addons">
                <p className="control is-expanded">
                    <textarea
                        rows="3"
                        className="textarea is-small is-info"
                        placeholder="SQLS"
                        value={value}
                        onChange={onChange}
                    />
                </p>
            </div>
        </div>
    )
}

export default PanelAHeading
