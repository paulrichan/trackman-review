import { PITCHCOLORS, domainFormatter } from '@/lib/utils'
import { Cell, ReferenceLine, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from 'recharts'
import { useState } from 'react'
import { Toggle } from './ui/toggle'
import { useDataStore } from '@/lib/store'

function ReusableScatter({
  data,
  pitchType,
  dataKeys
}: {
  data: TrackmanData[]
  pitchType: string
  dataKeys: { key: keyof TrackmanData; label: string }[]
}) {
  const [lockToPitch, setLockToPitch] = useState(false)
  const { decidedPitchType } = useDataStore((state) => state)
  const movementData = data
    .filter((pitch) => (!lockToPitch ? pitch[decidedPitchType] === pitchType : true))
    .map((pitch) => {
      return {
        [dataKeys[0].label]: Number(pitch[dataKeys[0].key]),
        [dataKeys[1].label]: Number(pitch[dataKeys[1].key]),
        pitchType: pitch[decidedPitchType]
      }
    })

  return (
    <>
      <div className="absolute top-2 right-2 flex flex-col items-center">
        <Toggle
          size="sm"
          pressed={lockToPitch}
          onPressedChange={setLockToPitch}
          className="z-10 text-xs text-muted-foreground"
        >
          Show All
        </Toggle>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={400}
          height={400}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: -30
          }}
        >
          <XAxis
            padding={{ left: 20 }}
            type="number"
            dataKey={dataKeys[0].label}
            allowDecimals={false}
            domain={[
              (dataMin: number) => domainFormatter(dataMin, { threshold: -1 }),
              (dataMax: number) => domainFormatter(dataMax, { threshold: 1 })
            ]}
          />
          <YAxis
            padding={{ bottom: 20 }}
            type="number"
            dataKey={dataKeys[1].label}
            domain={[
              (dataMin: number) => domainFormatter(dataMin, { threshold: -1 }),
              (dataMax: number) => domainFormatter(dataMax, { threshold: 1 })
            ]}
          />
          <ReferenceLine x={0} stroke="rgba(255,0,0,0.2)" ifOverflow="extendDomain" />
          <ReferenceLine y={0} stroke="rgba(255,0,0,0.2)" ifOverflow="extendDomain" />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            formatter={(value) => `${Number(value).toFixed(2)}`}
            labelFormatter={(_, payload) => {
              const pitchName = payload[0]?.payload.pitchType
              return <span className="font-bold">{`${pitchName}`}</span>
            }}
          />
          <Scatter data={movementData} fill="#8884d8">
            {movementData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={PITCHCOLORS[entry.pitchType]} />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </>
  )
}

export default ReusableScatter
