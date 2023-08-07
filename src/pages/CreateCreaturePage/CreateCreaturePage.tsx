import React, { useEffect, useState } from "react";
// @ts-ignore

const CreateCreaturePage = () => {
  const [characterInfo, setCharacterInfo] = useState({
    status: "idle",
    error: "",
    data: {},
    loading: false,
  });
  const [characterState, setCharacterState] = useState({
    character_name: "",
    style: [
      { id: 10, value: "Short" },
      { id: 20, value: "Goatee" },
      { id: 25, value: "#ffaadd" },
      { id: 26, value: "#ff0000" },
      { id: 27, value: "#ff0000" },
      { id: 28, value: "#aa1122" },
      { id: 29, value: "#aa1122" },
      { id: 31, value: "Male" },
    ],
    skills: [
      { id: 1, value: 40, is_skill: false },
      { id: 2, value: 25, is_skill: false },
      { id: 3, value: 15, is_skill: false },
      { id: 4, value: 45, is_skill: true },
      { id: 6, value: 35, is_skill: true },
      { id: 9, value: 20, is_skill: true },
    ],
  });

  const getCharacterInfo = async () => {
    const characterInfo = await fetch(
      "https://gapi.nftinit.io/api/get_character_attributes/",
      {
        method: "POST",
        //   mode: "cors",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",

          userInfo: JSON.stringify({
            token: "12345",
            //   character_id: "12",
          }),
        },
        //   body: JSON.stringify({
        //     creature_id: gameState.creature.id,
        //   }),
      }
    ).then((res) => res.json());
    console.log("characterInfo :>> ", characterInfo);
    if (characterInfo.success) {
      const characterData = characterInfo?.data;
      //   setCharacterInfo(characterInfo.data);
      setCharacterInfo((prevCharacterInfo: any) => ({
        ...prevCharacterInfo,
        status: "success",
        data: {
          ...characterData,
        },
      }));
    }
    // setCharacterInfo((prevGameState) => ({
    //   ...prevGameState,
    //   battle: {
    //     ...prevGameState.battle,
    //     id: battle.battle_id,
    //   },
    // }));

    // burada battle idyi setleyeceğiz
  };
  useEffect(() => {
    getCharacterInfo();
  }, []);

  const handleCharacterSelection = (
    value: any,
    type: string,
    sequence: number,
    id?: number | null
  ) => {
    console.log("id,value,type,sequence :>> ", id, value, type, sequence);

    // Değişiklikleri yapmak için karakter durumunu kopyalayın
    if (type === "character_name") {
      setCharacterState((prevCharacterState) => ({
        ...prevCharacterState,
        character_name: value,
      }));
    } else if (type === "style") {
      const updatedCharacterState: any = { ...characterState };
      let optionValue;

      // `type` (style veya skill) ile ilgili seçenekleri alın
      const options = updatedCharacterState.style;
      // Seçeneklerin değerlerini ayrıştırın
      if (id === null) {
        //
      } else {
        optionValue = value?.includes(":") ? value.split(":")[1] : value;
      }

      console.log("id,optionValue :>> ", id, optionValue);
      // `sequence` ile belirtilen indekse sahip olan seçeneği güncelleyin
      if (options[sequence]) {
        options[sequence] = {
          ...options[sequence],
          id: id,
          value: optionValue,
        };
      }

      // `type` (style veya skill) ile güncellenmiş seçenekleri karakter durumuna atayın

      updatedCharacterState.style = options;

      // Karakter durumunu güncelleyin
      setCharacterState(updatedCharacterState);
    } else if (type === "skills") {
      const updatedCharacterState: any = { ...characterState };
      const options = updatedCharacterState.style;
      updatedCharacterState.skills = options;
      // is_skill propu false olanların toplam değerini hesaplayın
      const isSkillFalseOptions = options.filter(
        (option: any) => !option.is_skill
      );
      const totalValue = isSkillFalseOptions.reduce(
        (sum: number, option: any) => sum + option.value,
        0
      );

      // Eğer toplam değer 85'i geçiyorsa, güncellemeyi iptal edin ve uyarı verin
      if (totalValue > 85) {
        console.log("Toplam değer 85'i geçemez!");
        return;
      }
    }
  };
  useEffect(() => {
    if (characterInfo?.status == "success") {
      // @ts-ignore
      let result1 =
        // @ts-ignore
        characterInfo?.data?.styles["Hair Style"]?.data[1].id +
        ":" +
        // @ts-ignore
        characterInfo?.data?.styles["Hair Style"]?.data[1].value;
      let result2 =
        characterState.style[0].id + ":" + characterState.style[0].value;
      let result = result1 === result2;
      console.log("result1 :>> ", result1);
      console.log("result2 :>> ", result2);
    }
  });

  console.log("characterState :>> ", characterState);

  return (
    <div className="">
      {
        // style kısmı
      }
      <div>
        <div className="flex w-full justify-center">
          <input
            className="w-96 text-black"
            type="text"
            placeholder="Character name..."
            onChange={(e) =>
              handleCharacterSelection(e.target.value, "character_name", 1)
            }
          />
        </div>
        <div className="grid grid-cols-12">
          <div className="col-span-4 border h-full w-full flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col w-60">
                <label htmlFor="">Hair Style</label>
                <select
                  className="rounded text-black"
                  name=""
                  id=""
                  onChange={(e) =>
                    handleCharacterSelection(
                      e.target.value,
                      "style",
                      0,
                      parseInt(e.target.value.split(":")[0])
                    )
                  }
                  value={
                    characterState.style[0].id +
                    ":" +
                    characterState.style[0].value
                  }
                >
                  {
                    // @ts-ignore

                    characterInfo?.status == "success" &&
                      // @ts-ignore
                      characterInfo?.data?.styles["Hair Style"]?.data?.map(
                        (style: any, index: number) => {
                          return (
                            <option
                              key={index}
                              value={style.id + ":" + style.value}
                            >
                              {style.value}
                            </option>
                          );
                        }
                      )
                  }
                </select>
              </div>
              <div className="flex flex-col w-60">
                <label htmlFor="">Facial Hair Style</label>
                <select
                  className="rounded text-black"
                  name=""
                  id=""
                  onChange={(e) =>
                    handleCharacterSelection(
                      e.target.value,
                      "style",
                      1,
                      parseInt(e.target.value.split(":")[0])
                    )
                  }
                  value={
                    characterState.style[1].id +
                    ":" +
                    characterState.style[1].value
                  }
                >
                  {
                    // @ts-ignore

                    characterInfo?.status == "success" &&
                      // @ts-ignore
                      characterInfo?.data?.styles[
                        "Facial Hair Style"
                      ]?.data?.map((style: any, index: number) => {
                        return (
                          <option
                            key={index}
                            value={style.id + ":" + style.value}
                          >
                            {style.value}
                          </option>
                        );
                      })
                    // <option value="">yeni</option>
                  }
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center">
              {characterInfo?.status == "success" &&
                // @ts-ignore
                characterInfo?.data?.styles["Gender"]?.data?.map(
                  (gender: any, index: number) => {
                    return (
                      <button
                        type="button"
                        value="Male"
                        className="border rounded p-2 w-24 text-white"
                        onClick={(e) =>
                          handleCharacterSelection(
                            gender.value,
                            "style",
                            7,
                            gender.id
                          )
                        }
                      >
                        {gender.value}
                      </button>
                    );
                  }
                )}
              {/* <button
                type="button"
                value="Male"
                className="border rounded p-2 w-24 text-white"
                onClick={(e) => handleCharacterSelection("Male", "style", 7)}
              >
                Male
              </button> */}

              {/* <button
                type="button"
                value="Female"
                className="border rounded p-2 w-24 text-white"
                onClick={(e) => handleCharacterSelection("Female", "style", 7)}
              >
                Female
              </button> */}
            </div>
          </div>
          <div className="col-span-4 border h-full w-full flex items-center justify-center">
            Character Image
          </div>
          <div className="col-span-4 border h-full w-full flex flex-col gap-2 items-center justify-center">
            <div className="flex flex-col">
              <label htmlFor="">Skin Tone</label>
              <input
                className="w-60"
                type="color"
                onChange={(e) =>
                  handleCharacterSelection(e.target.value, "style", 2, 25)
                }
                value={characterState.style[2].value}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Shirt Color</label>
              <input
                className="w-60"
                type="color"
                onChange={(e) =>
                  handleCharacterSelection(e.target.value, "style", 3, 26)
                }
                value={characterState.style[3].value}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Pants Color</label>
              <input
                className="w-60"
                type="color"
                onChange={(e) =>
                  handleCharacterSelection(e.target.value, "style", 4, 27)
                }
                value={characterState.style[4].value}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Hair Color</label>
              <input
                className="w-60"
                type="color"
                onChange={(e) =>
                  handleCharacterSelection(e.target.value, "style", 5, 28)
                }
                value={characterState.style[5].value}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="">Facial Hair Color</label>
              <input
                className="w-60"
                type="color"
                onChange={(e) =>
                  handleCharacterSelection(e.target.value, "style", 6, 29)
                }
                value={characterState.style[6].value}
              />
            </div>
          </div>
        </div>
      </div>
      {
        // skill kısmı
      }
      <div className="grid grid-cols-12">
        <div className="flex flex-col col-span-6 ">
          {
            // @ts-ignore
            characterInfo?.data?.attributes?.map(
              (attribute: any, index: number) => {
                return (
                  <div className="flex flex-col" key={index}>
                    <label htmlFor={attribute.id}>{attribute.name}</label>
                    <div className="flex">
                      <input
                        type="range"
                        min={attribute.min}
                        max={attribute.max}
                        name={attribute.name}
                        id={attribute.id}
                        value={
                          characterState.skills.find(
                            (skill) => skill.id === attribute.id
                          )?.value
                        }
                        onChange={(e) =>
                          handleCharacterSelection(
                            parseInt(e.target.value),
                            "skill",
                            attribute.id - 1
                          )
                        }
                      ></input>
                      <span>
                        {
                          characterState.skills.find(
                            (skill) => skill.id === attribute.id
                          )?.value
                        }
                      </span>
                    </div>
                  </div>
                );
              }
            )
          }
        </div>
        <div className="flex flex-col col-span-6"></div>
      </div>
    </div>
  );
};

export default CreateCreaturePage;
