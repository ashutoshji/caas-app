import React, { useState } from "react";
import Select from "react-select";
import Row from 'react-bootstrap/Row';

export default function Dropdown(props) {
  const [input, setInput] = useState("");
  const [value, setValue] = useState();
  const { onChange, title, options } = props;

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
        onBlur={onBlurValue}
        onChange={onSelect}
      />
    </div>
  );
}
