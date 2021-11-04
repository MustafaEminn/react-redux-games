import { useState } from "react";
import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import InputList from "../../list/InputList";
import s from "./InputSelectPrimary.module.scss";

interface IInputSelectPrimary {
  placeholder?: string | undefined;
  prefixIcon?: React.ReactNode;
  multipleSelect?: boolean;
  list: string[];
}

const InputSelectPrimary = ({
  placeholder,
  prefixIcon,
  multipleSelect = false,
  list,
}: IInputSelectPrimary) => {
  const [visible, setVisible] = useState<boolean>(false);

  const onInputFocus = (): void => {
    setVisible(true);
  };

  const onInputBlur = (): void => {
    setVisible(false);
  };

  return (
    <div className={s.container}>
      <div className={s.inputContainer}>
        <input
          onFocus={() => onInputFocus()}
          onBlur={() => onInputBlur()}
          className={s.input}
          placeholder={placeholder}
          type="text"
        />
        {prefixIcon ? (
          <div className={s.inputPrefixIcon}>{prefixIcon}</div>
        ) : (
          <></>
        )}
        <div className={s.inputSuffixIcon}>
          <ArrowDownIcon />
        </div>
      </div>

      <InputList
        multipleSelect={multipleSelect}
        list={list}
        visible={visible}
      />
    </div>
  );
};

export default InputSelectPrimary;
