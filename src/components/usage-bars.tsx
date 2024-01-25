import { useDataStore } from '@/lib/store'
import { PITCHCOLORS } from '@/lib/utils'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Usages({ data }: { data: TrackmanData[] }) {
  const { decidedPitchType } = useDataStore((state) => state)
  const pitchUsage = data?.reduce((acc, cur) => {
    if (!acc.find((ele) => ele.name === cur[decidedPitchType])) {
      acc.push({ name: cur[decidedPitchType], count: 1, fill: PITCHCOLORS[cur[decidedPitchType]] })
    } else {
      const pitch = acc.find((ele) => ele.name === cur[decidedPitchType])
      if (pitch) pitch.count++
    }
    return acc
  }, [] as { name: string; count: number; fill: string }[])
  const totalPitches = pitchUsage?.reduce((acc, cur) => acc + cur.count, 0)

  return (
    <div className="flex flex-col w-full h-full">
      <div className="h-3/4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={pitchUsage} margin={{ top: 20, right: 20, bottom: 10, left: -20 }}>
            <XAxis dataKey="name" fontSize={12} />
            <YAxis domain={[0, 'dataMax']} />
            <Tooltip
              label="test"
              formatter={(value) => [`${((Number(value) / totalPitches) * 100).toFixed(1)}%`, `Percentage`]}
              labelFormatter={(_, payload) => {
                const pitchName = payload[0]?.payload.name
                return <span>{`${pitchName}`}</span>
              }}
            />
            <Bar dataKey="count" background />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex space-x-5 space-y-1 justify-evenly items-center flex-wrap">
        {pitchUsage.map((pitch, idx) => {
          const percentage = ((pitch.count / totalPitches) * 100).toFixed(1) + '%'
          const color = pitch.fill ?? '#5ebfef'
          return (
            <div key={idx} className={`bg-muted px-1 border-l-8 border-l-[${color}] shadow rounded text-center`}>
              {percentage}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Usages
