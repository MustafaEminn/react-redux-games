import ArrowDownIcon from "../../../icons/ArrowDownIcon";
import s from "./InputSelectPrimary.module.scss";

interface IInputSelectPrimary {
  placeholder?: string | undefined;
  prefixIcon?: React.ReactNode;
  multipleSelect?: boolean;
}

const InputSelectPrimary = ({
  placeholder,
  prefixIcon,
  multipleSelect = false,
}: IInputSelectPrimary) => {
  return (
    <div className={s.inputContainer}>
      <input className={s.input} placeholder={placeholder} />
      {prefixIcon ? (
        <div className={s.inputPrefixIcon}>{prefixIcon}</div>
      ) : (
        <></>
      )}
      <div className={s.inputSuffixIcon}>
        <ArrowDownIcon />
      </div>
    </div>
  );
};

export default InputSelectPrimary;
