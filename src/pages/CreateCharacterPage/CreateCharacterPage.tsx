import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
// @ts-ignore

const CreateCharacterPage = () => {
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
    id?: any
  ) => {
    if (type === "character_name") {
      setCharacterState((prevCharacterState) => ({
        ...prevCharacterState,
        character_name: value,
      }));
    } else if (type === "style") {
      const updatedCharacterState = { ...characterState };
      let optionValue: string | undefined;

      const options = updatedCharacterState.style;

      if (id === null) {
        //
      } else {
        optionValue = value?.includes(":") ? value.split(":")[1] : value;
      }
      if (options[sequence]) {
        options[sequence] = {
          ...options[sequence],
          id: id,
          value: optionValue!,
        };
      }
      updatedCharacterState.style = options;
      setCharacterState(updatedCharacterState);
    } else if (type === "attribute") {
      const updatedCharacterState = { ...characterState };
      const options = updatedCharacterState.skills;

      const nonSkillValues = options
        .filter((skill) => !skill.is_skill)
        .map((skill) => skill.value);

      const oldValue = options[sequence].value;
      const currentTotal = nonSkillValues.reduce(
        (sum, value) => sum + value,
        0
      );

      if (currentTotal + parseInt(value) - oldValue <= 85) {
        options[sequence] = { ...options[sequence], value: parseInt(value) };
        updatedCharacterState.skills = options;
        setCharacterState(updatedCharacterState);
      } else {
        // Eğer kullanıcının girdiği değer 85'i aşıyorsa, maximum değere getiriyoruz
        if (85 - currentTotal + oldValue > 0) {
          const newValue = 85 - currentTotal + oldValue;
          options[sequence] = { ...options[sequence], value: newValue };
          updatedCharacterState.skills = options;
          setCharacterState(updatedCharacterState);
        } else {
          // toast.error("Toplam değer 85'i geçemez!");
          console.log("Toplam değer 85'i geçemez!");
        }
      }
    } else if (type === "skill") {
      console.log("value,type,sequence,id :>> ", value, type, sequence, id);
      const updatedCharacterState = { ...characterState };
      const options = updatedCharacterState.skills;

      const skillValues = options
        .filter((skill) => skill.is_skill)
        .map((skill) => skill.value);
      console.log("skillValues :>> ", skillValues);
      const oldValue = options[sequence].value;
      console.log("oldValue :>> ", oldValue);
      const currentTotal = skillValues.reduce((sum, value) => sum + value, 0);
      console.log("currentTotal :>> ", currentTotal);

      if (currentTotal + parseInt(value) - oldValue <= 100) {
        options[sequence] = { ...options[sequence], value: parseInt(value) };
        updatedCharacterState.skills = options;
        setCharacterState(updatedCharacterState);
      } else {
        // Eğer kullanıcının girdiği değer 85'i aşıyorsa, maximum değere getiriyoruz
        if (100 - currentTotal + oldValue > 0) {
          const newValue = 100 - currentTotal + oldValue;
          options[sequence] = { ...options[sequence], value: newValue };
          updatedCharacterState.skills = options;
          setCharacterState(updatedCharacterState);
        } else {
          // toast.error("Toplam değer 85'i geçemez!");
          console.log("Toplam değer 100'ü geçemez!");
        }
      }
    }
  };

  console.log("characterState :>> ", characterState);
  const handleChangeSkill = (id: any, sequence: any) => {
    const updatedCharacterState = { ...characterState };
    const options = updatedCharacterState.skills;
    options[sequence] = { ...options[sequence], id: id };
    setCharacterState(updatedCharacterState);
  };
  const saveCharacter = async () => {
    const saveData = await fetch(
      "https://gapi.nftinit.io/api/create_character/",
      {
        method: "POST",
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
          userInfo: JSON.stringify({
            token: "12345",
            character_id: "12",
          }),
        },
        body: JSON.stringify({
          ...characterState,
        }),
      }
    ).then((res) => res.json());
    console.log("saveData :>> ", saveData);
    if (saveData.success) {
      toast.success("Character added successfully");
    }
  };

  return (
    <div className="w-screen h-screen flex items-center">
      {
        // style kısmı
      }
      <div className=" w-full flex flex-col gap-4 ">
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
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 h-full w-full flex flex-col gap-12 items-center justify-center">
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
            <div className="flex flex-col  w-2/3">
              {
                // @ts-ignore
                characterInfo?.data?.attributes?.map(
                  (attribute: any, index: number) => {
                    return (
                      <div className="flex flex-col w-full" key={index}>
                        <label htmlFor={attribute.id}>{attribute.name}</label>
                        <div className="flex w-full">
                          <input
                            className="w-full"
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
                                "attribute",
                                attribute.id - 1,
                                attribute.id
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
          </div>
          <div className="col-span-4 h-full w-full flex items-center justify-center">
            Character Image
          </div>
          <div className="col-span-4 h-full w-full flex flex-col gap-6 items-center justify-center">
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
            <div className="flex flex-col  w-2/3 ">
              {
                // @ts-ignore
                characterState?.skills
                  ?.filter((el) => el.is_skill == true)
                  .map((skil: any, index: number) => {
                    return (
                      <div className="flex flex-col w-full" key={index}>
                        <div className="flex">
                          <label htmlFor={skil.id}>{skil.name}</label>
                          <select
                            className="rounded text-black"
                            name=""
                            id=""
                            // onChange={(e) =>
                            //   handleCharacterSelection(
                            //     e.target.value,
                            //     "skill",
                            //     index + 3,
                            //     parseInt(e.target.value.split(":")[0])
                            //   )
                            // }
                            onChange={(e) =>
                              handleChangeSkill(
                                parseInt(e.target.value),
                                index + 3
                              )
                            }
                            value={characterState.skills[index + 3].id}
                          >
                            {
                              // @ts-ignore

                              characterInfo?.data?.skills?.map(
                                (skill: any, index: number) => {
                                  return (
                                    <option
                                      disabled={
                                        characterState.skills
                                          .filter((el) => el.is_skill == true)
                                          .filter((el) => el.id == skill.id)
                                          .length > 0
                                      }
                                      key={index}
                                      value={skill.id}
                                    >
                                      {skill.name}
                                    </option>
                                  );
                                }
                              )
                            }
                          </select>
                        </div>
                        <div className="flex w-full">
                          <input
                            className="w-full"
                            type="range"
                            min={skil.min}
                            max={skil.max}
                            name={skil.name}
                            id={skil.id}
                            value={
                              characterState.skills.find(
                                (skill) => skill.id === skil.id
                              )?.value
                            }
                            onChange={(e) =>
                              handleCharacterSelection(
                                parseInt(e.target.value),
                                "skill",
                                index + 3,
                                skil.id
                              )
                            }
                          ></input>
                          <span>
                            {
                              characterState.skills.find(
                                (skill) => skill.id === skil.id
                              )?.value
                            }
                          </span>
                        </div>
                      </div>
                    );
                  })
              }
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center">
          <button
            className="border py-2 px-4 rounded"
            onClick={() => saveCharacter()}
          >
            Save
          </button>
        </div>
      </div>
      {
        // skill kısmı
      }
    </div>
  );
};

export default CreateCharacterPage;
