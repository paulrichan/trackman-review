import React from 'react'
import { Label } from './ui/label'
import SelectCombobox from './select-combobox'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'
import { useDataStore } from '@/lib/store'
import { useTrackmanData } from '@/hooks/useTrackmanData'

function Controls() {
  const [setPitchType, setPitcher, pitcher, pitchType, screen, setScreen] = useDataStore((state) => [
    state.setPitchType,
    state.setPitcher,
    state.pitcher,
    state.pitchType,
    state.screen,
    state.setScreen
  ])
  const { uniquePitchers, uniquePitchTypes } = useTrackmanData(pitcher)

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <Label className="block mb-2">Current Pitcher</Label>
          <SelectCombobox selected={pitcher} setSelected={setPitcher} values={uniquePitchers} />
        </div>

        <Tabs defaultValue={screen} value={screen} onValueChange={setScreen}>
          <TabsList>
            <TabsTrigger value="visuals">Visuals</TabsTrigger>
            <TabsTrigger value="raw">Raw</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {screen === 'visuals' && (
        <Tabs
          defaultValue={pitchType}
          value={pitchType}
          onValueChange={(val) => setPitchType(val)}
          className="w-fit mt-3"
        >
          <TabsList className={`grid grid-flow-col auto-cols-max`}>
            {uniquePitchTypes.map((pitch) => {
              return (
                <TabsTrigger key={pitch} value={pitch}>
                  {pitch}
                </TabsTrigger>
              )
            })}
          </TabsList>
        </Tabs>
      )}
    </div>
  )
}

export default Controls
