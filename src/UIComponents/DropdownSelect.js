import Select from "react-select";
import { Controller } from "react-hook-form";

const DropdownSelect = ({
  options,
  placeholder,
  name,
  control,
  isMulti,
  msg,
  onBlur,
  isLoading,
  isDisabled,
  className,
  value
}) => {
  const customStyles = {
    option: (base, state) => ({
      ':hover': {
        color: "#0AB39C",
      },
      color: state.isSelected ? "#153d58" : '#7E7E7E',
      cursor: "pointer",
      padding: ".5rem 3rem .5rem .5rem",
      fontSize: '14px',
      fontWeight: '500'
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";
      return { ...provided, opacity, transition };
    },
    control: (base, state) => ({
      border: state.isFocused ? '1px solid #153D58' : '1px solid #e4e6ef',
      display:'flex',
      borderRadius:'6.5px'
    })
  };
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: msg,
      }}
      render={({
        field,
        field: { onChange, value },
        fieldState: { error },
        formState,
      }) => (
        <div className={`input-wrapper ${field.value ? "has-value" : ""}`}>
          <Select
            styles={customStyles}
            {...field}
            onBlur={(e) => onBlur && onBlur(e)}
            placeholder={value ? field.value : placeholder}
            options={options}
            isLoading={isLoading}
            theme={(theme) => ({
              ...theme,
              borderWidth: 1,
              padding: ".5rem 3rem .5rem .5rem",
              // colors: {
              //   ...theme.colors,
              //   primary25: color.tangerine,
              //   primary: color.redSand,
              //   primary75: color.peach,
              //   primary50: color.redSand
              // }
            })}
            isMulti={isMulti}
            isClearable
            isDisabled={isDisabled || false}
            className={`${className}`}
            onChange={(selectedOption) => {
              field.onChange(selectedOption ? selectedOption.value : null);
            }}
            value={value || ''}
          />
        </div>
      )}
    />
  );
};

export default DropdownSelect;