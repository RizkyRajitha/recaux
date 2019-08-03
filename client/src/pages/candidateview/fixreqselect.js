import React from "react";
import PropTypes from "prop-types";

const noop = () => {
  // no operation (do nothing real quick)
};

class FixRequiredSelect extends React.Component {
  state = {
    value: this.props.value || ""
  };

  selectRef = null;
  setSelectRef = ref => {
    this.selectRef = ref;
  };

  onChange = (value, actionMeta) => {
    this.props.onChange(value, actionMeta);
    this.setState({ value });
  };

  getValue = () => {
    if (this.props.value != undefined) return this.props.value;
    return this.state.value || "";
  };

  render() {
    const { SelectComponent, required, ...props } = this.props;
    const { isDisabled } = this.props;
    const enableRequired = !isDisabled;

    return (
      <div>
        <SelectComponent
          {...props}
          ref={this.setSelectRef}
          onChange={this.onChange}
        />
        {enableRequired && (
          <input
            tabIndex={-1}
            autoComplete="off"
            style={{
              opacity: 0,
              width: "100%",
              height: 0,
              position: "absolute"
            }}
            value={this.getValue()}
            onChange={noop}
            onFocus={() => this.selectRef.focus()}
            required={required}
          />
        )}
      </div>
    );
  }
}

FixRequiredSelect.defaultProps = {
  onChange: noop
};

FixRequiredSelect.protoTypes = {
  // react-select component class (e.g. Select, Creatable, Async)
  selectComponent: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  required: PropTypes.bool
};

export default FixRequiredSelect;
