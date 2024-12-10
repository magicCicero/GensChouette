import * as React from 'react';
import {
  Unstable_NumberInput as BaseNumberInput
} from '@mui/base/Unstable_NumberInput';
import { styled } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const NumberInput = React.forwardRef(function CustomNumberInput(
  props,
  ref
) {
  return (
    <BaseNumberInput
      slots={{
        root: StyledInputRoot,
        input: StyledInput,
        incrementButton: StyledButton,
        decrementButton: StyledButton,
      }}
      slotProps={{
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: 'increment',
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
        },
      }}
      {...props}
      ref={ref}
    />
  );
});

export default function QuantityInput() {
  return <NumberInput aria-label="Quantity Input" min={1} max={99} defaultValue={1}/>;
}

const StyledInputRoot = styled('div')`
  font-family: 'Arial', sans-serif;
  display: flex;
  flex-flow: row nowrap;
  justify-content: start;
  align-items: center;
`;

const StyledInput = styled('input')`
  font-size: 1rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.375;
  color: #333;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 8px;
  padding: 8px 12px;
  outline: 0;
  min-width: 0;
  width: 4rem;
  text-align: center;

  &:hover {
    border-color: #999;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  &:focus-visible {
    outline: 0;
  }
`;

const StyledButton = styled('button')`
  font-family: 'Arial', sans-serif;
  font-size: 1rem;
  box-sizing: border-box;
  line-height: 1.5;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #fff;
  color: #333;
  width: 32px;
  height: 32px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &:hover {
    cursor: pointer;
    background: #007bff;
    border-color: #007bff;
    color: #fff;
  }

  &:focus-visible {
    outline: 0;
  }

  &.increment {
    order: 1;
  }
`;
