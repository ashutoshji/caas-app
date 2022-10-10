import React, { useState } from "react";
import Select from "react-select";
import Row from 'react-bootstrap/Row';

export default function Dropdown(props) {
  const [input, setInput] = useState("");
  const [value, setValue] = useState();
  const { onChange, title } = props;
  const options = [
    {
      label: "Default",
      value: 1
    },
    {
      label: "Kite Flying / Parasail",
      value: 2
    },
    {
      label: "Release of balloons",
      value: 3
    }
  ];

  const onSelect = (target) => {
    const value = target.value;
    setValue(target);
    onChange(value)

  };

  const onBlurValue = () => {
    console.log(value);
  };

  return (
            <div className="col-md-5 mLeft-30 mRight-30">
            <Row >
            {title}
            </Row>
            <Select
                value={value}
                options={options}
                // onChange={onSelect}
                onBlur={onBlurValue}
                onChange={onSelect}
            />
            </div>
  );
}
