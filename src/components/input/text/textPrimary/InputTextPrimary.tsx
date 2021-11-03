import s from "./InputTestPrimary.module.scss";

interface IInputTextPrimary {
  placeholder?: string | undefined;
  prefixIcon?: React.ReactNode;
}

const InputTextPrimary = ({ placeholder, prefixIcon }: IInputTextPrimary) => {
  return (
    <input className={s.input} placeholder={placeholder}>
      {prefixIcon ? (
        <div className={s.inputPrefixIcon}>{prefixIcon}</div>
      ) : (
        <></>
      )}
    </input>
  );
};

export default InputTextPrimary;
