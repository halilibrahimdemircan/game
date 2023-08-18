import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import CraftableElement from "./CraftableElement";

type Props = {};

const CraftingPage = (props: Props) => {
  const [craftingElements, setCraftingElements] = useState([]);
  const [message, setMessage] = useState(null);
  const [gameState, setGameState] = useState({
    character: {
      info: {},
    },
    craftableElements: [],
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
      },
    }));
  };
  const getCraftingElements = async () => {
    const craftingElements: any = await fetch(
      `${baseUrl}/api/craft/get_crafts/`,
      {
        method: "POST",
        //   mode: "cors",
        headers: {
          // "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          "Content-Type": "application/json",
          userInfo: JSON.stringify({
            token: "12345",
            character_id: "12",
            skill_id: "18",
          }),
        },
        // body: JSON.stringify({
        //   token: "12345",
        // }),
      }
    ).then((res) => res.json());
    console.log("craftingElements :>> ", craftingElements);
    setCraftingElements(craftingElements.craft_items);

    // burada gelen creatureları setleyeceğiz
  };

  useEffect(() => {
    getCraftingElements();
    characterInfo();
  }, []);

  useEffect(() => {
    console.log("gameState :>> ", gameState);
  }, [gameState]);

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
        className="grid grid-cols-12 gap-10 w-full justify-between "
      >
        <div className="col-span-2 bg-gray-800  h-full overflow-auto relative">
          <div className="flex flex-col ">
            <span className="text-green-500 text-base font-medium sticky top-0 bg-gray-800 p-4">
              Inventory
            </span>
            <div className="flex flex-col gap-2 px-4">
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

        <div className="  col-span-8  p-4   ">
          <div className="flex flex-wrap gap-4 h-1/2 border border-gray-800 p-4 overflow-auto w-full">
            {craftingElements?.map((el: any, index) => {
              return (
                <CraftableElement
                  baseUrl={baseUrl}
                  itemId={el.item_id}
                  itemName={el.item_name}
                  requiredItems={el.required_items}
                  characterInfo={characterInfo}
                  setMessage={setMessage}
                />
              );
            })}
          </div>
          <div className="w-full flex flex-col gap-4 items-center justify-center p-4">
            <span>LOGS</span>
            {message != null ? (
              Array.isArray(message) ? (
                //@ts-ignore
                message?.map((el: any) => {
                  return <div>{el}</div>;
                })
              ) : (
                <div>{message}</div>
              )
            ) : (
              ""
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

export default CraftingPage;
