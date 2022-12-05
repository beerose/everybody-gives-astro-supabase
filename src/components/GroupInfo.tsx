import { useState } from "react"
import { useReward } from "react-rewards"

import { Button, Card } from "@everybody-gives/ui"
import { supabase } from "../supabase"

type GroupInfoProps = {
  group: {name: string, createdBy: string, id: string}
  members: {name: string}[]
  userName: string
}

export const GroupInfo = ({group, members, userName}: GroupInfoProps) => {
  const [result, setResult] = useState<string | undefined>(undefined)
  const { reward, isAnimating } = useReward("rewardId", "confetti", {
    elementCount: 200,
    lifetime: 500,
    elementSize: 10,
    startVelocity: 20,
    angle: 70,
    spread: 150,
  });
  
  const drawPerson = async () => {
    const {data} = await supabase.rpc("draw_name", {groupid: group.id, username: userName}).single()
    if (!data) {
      console.error("No data returned")
      return
    }
    setResult(data)
    reward()
  }

  return (
    <div>
      <h1 className="mt-1 text-5xl font-black tracking-tight text-gray-700">
        Welcome to {group.name}, {userName}!
      </h1>
      <div className="flex justify-start my-6 items-center" id={"rewardId"}>
        <Button width={215} onClick={() => {
          void drawPerson()
        }}>DRAW A NAME</Button>
      </div>
      <dl>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
          <dt className="font-bold text-gray-500">Group url</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0 flex items-center">
            https://everybody.gives/{group.id}
          </dd>
        </div>
        <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-3">
          <dt className="font-bold text-gray-500">Created by</dt>
          <dd className="mt-1 text-gray-900 sm:col-span-2 sm:mt-0">
            {group.createdBy}
          </dd>
        </div>
      </dl>
      <ul className="grid grid-cols-2 gap-6 sm:grid-cols-3 pt-6">
        {members.map((member) => {
          let className = " bg-background";
          if (result === member.name) {
            className = isAnimating
              ? " animate-[wiggle_1s_ease-in-out_infinite] bg-action"
              : " bg-action scale-120";
          }
          if (result !== member.name && result) {
            className = " bg-background opacity-50";
          }
          return <Card key={member.name} title={member.name} className={className} />;
        })}
      </ul>
    </div>
  )
}