import React, { useEffect, useState } from 'react'
import Select from 'react-select'

function ReactSelect(props) {
  const { options, handleChangeReactSelect, value, isMulti, isDisabled, isClearable, placeholder, isSearchable, id, flatdrop } = props
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
    <Select
      styles={customStyles}
      value={value || ''}
      placeholder={placeholder}
      onChange={(e) => handleChangeReactSelect(e)}
      options={options}
      className= {flatdrop === "flatdropdown" ? 'flat-border-none ml-2' : flatdrop === "apartmentSelect" ? 'apartmentSelect'  : 'autocomplete-select line-span'}
      isMulti={isMulti}
      isClearable={isClearable}
      isDisabled={isDisabled || false}
      inputId={id}
      isSearchable={isSearchable}
    />
  )
}

export default ReactSelect
