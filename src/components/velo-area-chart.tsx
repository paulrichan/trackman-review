import { PITCHCOLORS } from '@/lib/utils'
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function VeloAreaChart({ pitcherData, pitchType }: { pitcherData: TrackmanData[]; pitchType: string }) {
  // Filter the data to only the selected pitch type
  const chartData = pitcherData
    .filter((pitch) => pitch.TaggedPitchType === pitchType)
    .map((pitch, idx) => {
      return {
        pitchNo: idx + 1,
        [pitch.TaggedPitchType]: pitch.RelSpeed
      }
    })

  // Calculate the average velocity for the selected pitch type
  const avgVelocity = (chartData.reduce((acc, cur) => acc + Number(cur[pitchType]), 0) / chartData.length).toFixed(1)
  // Peak Velocity
  const peakVelocity = Math.max(...chartData.map((ele) => Number(ele[pitchType]))).toFixed(1)

  // Set the color of the graph based on the pitch type
  const graphColor = PITCHCOLORS[pitchType] ?? '#5ebfef'

  return (
    <div className="bg-muted/50 rounded-lg shadow-md py-5">
      <div className="mb-3 flex items-center justify-between px-8">
        <h2 className="font-bold text-xl">Velocity</h2>

        <div className="flex flex-col text-muted-foreground">
          <span>
            Peak: <span className="font-bold">{peakVelocity}</span>
            <span className="text-xs">mph</span>
          </span>

          <span>
            Average: <span className="font-bold">{avgVelocity}</span>
            <span className="text-xs">mph</span>
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart width={730} height={250} data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 15 }}>
          <defs>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={graphColor} stopOpacity={0.3} />
              <stop offset="95%" stopColor={graphColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="pitchNo" label={{ value: 'Pitch No.', dy: 20 }} />
          <YAxis
            domain={[(dataMin: number) => (dataMin - 2).toFixed(0), (dataMax: number) => (dataMax + 2).toFixed(0)]}
          />
          <CartesianGrid strokeDasharray="5 5" />
          <Tooltip
            formatter={(value) => `${Number(value).toFixed(1)} mph`}
            labelFormatter={(label) => `Pitch #${label}`}
          />
          <Area type="monotone" dataKey={pitchType} stroke={graphColor} fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default VeloAreaChart
