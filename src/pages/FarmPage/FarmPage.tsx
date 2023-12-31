import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const FarmPage = (props: Props) => {
  const [craftingElements, setCraftingElements] = useState([]);
  const [gameState, setGameState] = useState({
    character: {
      info: {},
      selectedSkillId: null,
    },
    craftingElement: {
      id: undefined,
    },

    crafting: {
      id: undefined,
      craftInfo: {},
      lootLogs: [],
      logs: [],
    },
  });

  //   const baseUrl = "http://127.0.0.1:8000";
  const baseUrl = "https://gapi.nftinit.io";
  const characterInfo = async () => {
    const characterInfo = await fetch(`${baseUrl}/api/get_character_info/`, {
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
      // body: JSON.stringify({
      //   creature_id: gameState.creature.id,
      // }),
    }).then((res) => res.json());
    console.log("characterInfo :>> ", characterInfo);
    setGameState((prevGameState: any) => ({
      ...prevGameState,
      character: {
        ...prevGameState.character,
        info: characterInfo.character_info,
        selectedSkillId:
          characterInfo?.character_info?.character_skill_and_spell[0]?.spell_id,
      },
    }));
  };
  const getCraftingElements = async () => {
    const craftingElements = await fetch(
      `${baseUrl}/api/get_crafting_elements/`,
      {
        method: "POST",
        //   mode: "cors",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          // userInfo: JSON.stringify({
          //   //   token: "12345",
          //   //   character_id: "12",
          // }),
        },
        body: JSON.stringify({
          token: "12345",
        }),
      }
    ).then((res) => res.json());
    console.log("craftingElements :>> ", craftingElements);
    setCraftingElements(craftingElements.element_list);

    setGameState((prevGameState) => ({
      ...prevGameState,
      craftingElement: {
        ...prevGameState.craftingElement,
        id: craftingElements.element_list[0].creature_id,
      },
    }));

    // burada gelen creatureları setleyeceğiz
  };
  const startCrafting = async () => {
    const crafting = await fetch(`${baseUrl}/api/farm_start/`, {
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
        creature_id: gameState.craftingElement.id,
      }),
    }).then((res) => res.json());
    setGameState((prevGameState) => ({
      ...prevGameState,
      crafting: {
        ...prevGameState.crafting,
        id: crafting.farm_id,
      },
    }));

    // burada battle idyi setleyeceğiz
  };
  const attackCrafting = async () => {
    const attack = await fetch(`${baseUrl}/api/farm_attack/`, {
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
        farm_id: gameState.crafting.id,
        skill_id:
          gameState.craftingElement.id == 999999
            ? 15
            : gameState.craftingElement.id == 999998
            ? 17
            : "",
        // spell_id: gameState.character.selectedSkillId,
        spell_id:
          gameState.craftingElement.id == 999999
            ? 11
            : gameState.craftingElement.id == 999998
            ? 1
            : 11,
      }),
    })
      .then((res) => res.json())
      .catch((error) => toast.error(error.message));
    console.log("attack :>> ", attack);
    if (attack.success) {
      setGameState((prevGameState: any) => ({
        ...prevGameState,
        crafting: {
          ...prevGameState.crafting,
          // logs: [...prevGameState.battle.logs, ...attack.battle_logs],
          craftInfo: { ...attack?.farm_info },
          lootLogs: [...attack?.loot_logs],
          logs: [...attack?.farm_logs],
        },
      }));
    } else {
      toast.error(attack?.error_message);
    }

    // burada logları setleyeceğiz
  };

  const handleChangeSelection = (craftingId: any) => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      craftingElement: {
        ...prevGameState.craftingElement,
        id: craftingId,
      },
    }));
  };
  const handleChangeSkillSelection = (skillId: any) => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      character: {
        ...prevGameState.character,
        selectedSkillId: skillId,
      },
    }));
  };

  useEffect(() => {
    getCraftingElements();
    characterInfo();
  }, []);

  useEffect(() => {
    console.log("gameState :>> ", gameState);
  }, [gameState]);

  function getAllStatsDescriptionList(logs: any) {
    const allStatsDescriptionList: any = [];
    logs.forEach((log: any) => {
      if (log.stats_description_list && log.stats_description_list.length > 0) {
        allStatsDescriptionList.push(...log.stats_description_list);
      }
    });
    return allStatsDescriptionList;
  }
  function getAllSDescriptionList(logs: any) {
    const allDescriptionList: any = [];
    logs.forEach((log: any) => {
      if (log.desciription_list && log.desciription_list.length > 0) {
        allDescriptionList.push(...log.desciription_list);
      }
    });
    return allDescriptionList;
  }
  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="flex w-full min-h-20 p-4 bg-gray-800 justify-center ">
        {/* <h3>Character Stats</h3> */}
        {
          // @ts-ignore
          gameState?.character.info.character_hp && (
            <div className=" grid grid-cols-12 gap-4 ">
              <div className="col-span-1"></div>
              <div className="col-span-10  flex gap-4">
                <div className="flex flex-col">
                  <span className="text-green-500 text-base font-medium ">
                    Health
                  </span>
                  <span>
                    {
                      // @ts-ignore
                      gameState?.character.info.character_hp
                        .health_points_available +
                        "/" +
                        // @ts-ignore
                        gameState?.character.info.character_hp.health_points_max
                    }
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-green-500 text-base font-medium ">
                    Gold
                  </span>
                  <span>
                    {
                      // @ts-ignore
                      gameState?.character.info.gold_amount
                    }
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-green-500 text-base font-medium ">
                    Attributes
                  </span>
                  <div className="flex gap-4">
                    {
                      // @ts-ignore
                      gameState?.character?.info?.skill_and_stat
                        ?.filter((el: any) => !el.is_skill)
                        ?.map((skill: any) => {
                          return (
                            <span className="whitespace-nowrap  text-">
                              {skill.skill_name + ": " + skill.point}
                            </span>
                          );
                        })
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
      <div
        style={{ height: "calc(100vh - 80px)" }}
        className="grid grid-cols-12 gap-10 w-full justify-between"
      >
        <div className="col-span-2 bg-gray-800    relative">
          <div className="flex flex-col">
            <span className="text-green-500 text-base font-medium sticky top-0 bg-gray-800 p-4">
              Inventory
            </span>
            <div className="flex flex-col gap-2 px-4 h-full overflow-auto ">
              {
                // @ts-ignore
                gameState?.character?.info?.inventory?.map((item) => {
                  return (
                    <span>
                      {item.item_name +
                        `${
                          item.count == null ? " (1)" : " (" + item.count + ")"
                        } `}
                    </span>
                  );
                })
              }
            </div>
          </div>
        </div>

        <div className="  col-span-8 flex flex-col gap-4 p-4 h-full overflow-auto">
          <div className=" grid grid-cols-8 gap-4">
            <div className="col-span-2"></div>
            {gameState?.crafting?.craftInfo && (
              <div className="border border-gray-500 rounded min-w-165 min-h-20 flex flex-col p-2 items-center">
                <span>Battle Stats</span>
                <div className="flex gap-4 items-start">
                  <div className="flex flex-col ">
                    <span>Character HP</span>
                    <span>
                      {" "}
                      {
                        // @ts-ignore
                        gameState?.crafting?.craftInfo?.character_hp
                      }
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <span>Creature HP</span>
                    <span>
                      {" "}
                      {
                        // @ts-ignore
                        gameState?.crafting?.craftInfo?.creature_hp
                      }
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-8 gap-4 ">
            <div className=" col-span-2 p-4 flex flex-col gap-8">
              <select
                className="text-black"
                name=""
                id="selectCreature"
                value={gameState.craftingElement.id}
                onChange={(e) => handleChangeSelection(e.target.value)}
              >
                {craftingElements?.map((option: any) => {
                  return (
                    <option
                      className="text-black"
                      key={option.creature_id}
                      value={option.creature_id}
                    >
                      {option.name}
                    </option>
                  );
                })}
                {/* <option key={2} value={3}>
            {"aslan"}
          </option> */}
              </select>

              <button
                onClick={() => {
                  startCrafting();
                  characterInfo();
                }}
                className="border p-2 rounded border-gray-600 hover:bg-green-700"
              >
                Start
              </button>
              {gameState?.crafting?.id && (
                <div className="flex flex-col gap-6">
                  {/* <label htmlFor="selectSkill">Select Skill</label> */}
                  <select
                    onChange={(e) => handleChangeSkillSelection(e.target.value)}
                    className="text-black"
                    name=""
                    id="selectSkill"
                  >
                    {
                      // @ts-ignore
                      gameState?.character?.info?.character_skill_and_spell
                        ?.filter((spell: any) =>
                          gameState.craftingElement.id == 999999
                            ? spell.skill_id == 15
                            : gameState.craftingElement.id == 999998
                            ? spell.skill_id == 17
                            : ""
                        )
                        .map((spell: any) => {
                          return (
                            <option
                              className="text-black"
                              value={spell.spell_id}
                            >
                              {spell.spell_name + " - " + spell.skill_name}
                            </option>
                          );
                        })
                    }
                  </select>
                  <button
                    // @ts-ignore
                    onClick={async () => {
                      await attackCrafting();
                      characterInfo();
                    }}
                    className="border p-2 rounded border-gray-600 hover:bg-green-700 "
                  >
                    Attack
                  </button>
                </div>
              )}
            </div>
            <div className="border border-gray-500 rounded min-w-165 h-72 flex flex-col p-2 overflow-auto">
              <div className="col-span-6 w-full flex justify-center">Logs</div>
              <ul>
                {
                  // @ts-ignore
                  gameState?.crafting?.logs?.length &&
                    getAllSDescriptionList(gameState?.crafting?.logs)?.map(
                      (log: any) => {
                        return <li>{`${log}`}</li>;
                      }
                    )
                }
              </ul>
            </div>
          </div>
          <div className=" grid grid-cols-8 gap-4">
            <div className="col-span-2"></div>

            <div className="border border-gray-500 rounded min-w-165 min-h-20 flex flex-col p-2 items-center">
              <span>Skill Stats</span>
              <div className="flex flex-col items-start">
                {
                  // @ts-ignore
                  gameState.crafting.logs.length &&
                    getAllStatsDescriptionList(gameState.crafting.logs).map(
                      (log: any) => {
                        return <span>{log}</span>;
                      }
                    )
                }
              </div>
            </div>
          </div>
          <div className=" grid grid-cols-8 gap-4">
            <div className="col-span-2"></div>
            {gameState?.crafting?.lootLogs?.length > 0 && (
              <div className="border border-gray-500 rounded min-w-165 min-h-20 flex flex-col p-2 items-center">
                <span>Loots</span>
                <div className="flex flex-col items-start">
                  {gameState?.crafting?.lootLogs?.map((log: any) => {
                    return <span>{log}</span>;
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 bg-gray-800  h-full overflow-auto relative">
          <div className="flex flex-col gap-2 ">
            <span className="text-green-500 text-base font-medium sticky top-0 p-4">
              Skills
            </span>
            <div className="flex flex-col gap-2 px-4">
              {
                // @ts-ignore
                gameState?.character?.info?.skill_and_stat
                  ?.filter((el: any) => el.is_skill)
                  ?.map((skill: any) => {
                    return (
                      <span className="flex gap-2">
                        <span className="whitespace-nowrap">
                          {skill.skill_name + " : "}
                        </span>
                        <span>{skill.point}</span>
                      </span>
                    );
                  })
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmPage;
