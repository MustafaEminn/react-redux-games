import React, { useEffect, useState } from "react";
import s from "./InputList.module.scss";

interface IInputList {
  list: string[];
  visible: boolean;
  multipleSelect: boolean;
}

const InputList = ({
  list,
  visible = false,
  multipleSelect = false,
}: IInputList) => {
  // sList mean is state list
  const [sList, setSList] = useState<
    Array<{ name: string; selected: boolean }>
  >([]);

  useEffect(() => {
    let addSelectedValueInSList = () => {
      let newList = list.map((item) => {
        return { name: item, selected: false };
      });

      setSList(newList);
    };
    console.log("mksafmkas");
    addSelectedValueInSList();
  }, [list]);

  const onToggleUsingMultipleSelect = (index: number) => {
    let instanceList = sList;
    let isSelectedTheListItem = instanceList[index].selected;

    if (isSelectedTheListItem) {
      instanceList[index].selected = false;
      setSList(instanceList);
      return;
    }
    instanceList[index].selected = true;

    setSList(instanceList);
  };

  const onToggleUsingSelect = (index: number) => {
    let newList = sList.map((item, indexOfNewList) => {
      return indexOfNewList === index
        ? { ...item, selected: true }
        : { ...item, selected: false };
    });
    setSList(newList);
  };

  const onClickListItem = (index: number) => {
    if (multipleSelect) {
      onToggleUsingMultipleSelect(index);
      return;
    }

    onToggleUsingSelect(index);
  };

  return (
    <div visible={true ? "true" : "false"} className={s.container}>
      {sList.map((item, index) => (
        <button
          key={index}
          isSelected={item.selected ? "true" : "false"}
          className={s.listContainer}
          onClick={() => {
            onClickListItem(index);
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export default InputList;
