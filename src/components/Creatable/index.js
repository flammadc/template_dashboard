import React from "react";
import Creatable from "react-select/creatable";

const CustomCreatable = () => {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const creatableStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      // none of react-select's styles are passed to <Control />
      ...provided,
      fontSize: "14px",
      borderRadius: "6px",
      textColor: "red",
    }),
  };
  return (
    <Creatable
      className="style"
      options={options}
      styles={creatableStyles}
    ></Creatable>
  );
};

export default CustomCreatable;
