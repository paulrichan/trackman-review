import { PITCHCOLORS } from '@/lib/utils'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Usages({ data }: { data: TrackmanData[] }) {
  const pitchUsage = data?.reduce((acc, cur) => {
    if (!acc.find((ele) => ele.name === cur.TaggedPitchType)) {
      acc.push({ name: cur.TaggedPitchType, count: 1, fill: PITCHCOLORS[cur.TaggedPitchType] })
    } else {
      const pitch = acc.find((ele) => ele.name === cur.TaggedPitchType)
      if (pitch) pitch.count++
    }
    return acc
  }, [] as { name: string; count: number; fill: string }[])
  const totalPitches = pitchUsage?.reduce((acc, cur) => acc + cur.count, 0)

  return (
    <div className="flex flex-col w-full h-full">
      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={pitchUsage} margin={{ top: 20, right: 20, bottom: 10 }}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 'dataMax']} />
          <Tooltip
            label="test"
            formatter={(value) => [`${((Number(value) / totalPitches) * 100).toFixed(1)}%`, `Percentage`]}
            labelClassName="text-"
            labelFormatter={(_, payload) => {
              const pitchName = payload[0]?.payload.name
              return <span>{`${pitchName}`}</span>
            }}
          />
          <Bar dataKey="count" background />
        </BarChart>
      </ResponsiveContainer>
      <div className="flex justify-evenly gap-7">
        {pitchUsage.map((pitch, idx) => {
          const percentage = ((pitch.count / totalPitches) * 100).toFixed(1) + '%'
          const color = pitch.fill ?? '#5ebfef'
          return (
            <div key={idx} className={`bg-muted w-full border-l-8 border-l-[${color}] shadow rounded text-center`}>
              {percentage}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Usages
