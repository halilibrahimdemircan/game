import React, { Dispatch, SetStateAction } from "react";

type Props = {
  baseUrl: string;
  itemId: number;
  itemName: string;
  requiredItems: string;
  characterInfo: () => {};
  setMessage: Dispatch<SetStateAction<null>>;
};

const CraftableElement = (props: Props) => {
  const handleClickItem = async (id: number) => {
    const craft = await fetch(`${props.baseUrl}/api/craft/start_craft/`, {
      method: "POST",
      //   mode: "cors",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

        userInfo: JSON.stringify({
          token: "12345",
          character_id: "12",
        }),
      },
      body: JSON.stringify({
        craft_item_id: id,
      }),
    }).then((res) => res.json());
    if (craft.success) {
      if (craft?.error_list?.length) {
        props.setMessage(craft?.error_list);
      } else {
        props.setMessage(craft?.response?.desc);
        props.characterInfo();
      }
    } else {
      props.setMessage(craft?.error_message);
    }
  };
  return (
    <div
      onClick={() => handleClickItem(props.itemId)}
      className="border border-gray-800 px-3 py-1.5 cursor-pointer bg-black text-white h-16 w-fit rounded-lg hover:bg-gray-700 hover:text-white"
    >
      <span>{props.itemName}</span>
      <div className="text-xs text-gray-300">
        {props.requiredItems.split("-")[2] +
          " " +
          props.requiredItems.split("-")[1]}
      </div>
    </div>
  );
};

export default CraftableElement;
